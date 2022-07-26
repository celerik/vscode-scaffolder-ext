import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as Mustache from 'mustache';
import {
  Message, CommonMessage, StateMessage, FilesMessage
} from './messages/messageTypes';

export class ViewLoader {
  public static currentPanel?: vscode.WebviewPanel;

  private panel: vscode.WebviewPanel;

  private context: vscode.ExtensionContext;

  private disposables: vscode.Disposable[];

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.disposables = [];

    this.panel = vscode.window.createWebviewPanel(
      'celerikScaffolder',
      'Celerik Scaffolder',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, 'out', 'app'))]
      }
    );
    const templateUrl = 'global.state';
    const state = context.globalState.get(templateUrl);
    if (!state) {
      // Add a initial url value
      const data = JSON.stringify({
        templateUrl: 'https://github.com/celerik/celerik-scaffolder-templates.git'
      });
      context.globalState.update(templateUrl, data);
    }

    // render webview
    this.renderWebview();

    // listen messages from webview
    this.panel.webview.onDidReceiveMessage(
      (message: Message) => {
        switch (message.type) {
          case 'RELOAD':
            vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction');
            break;
          case 'STATE': {
            const text = (message as StateMessage).payload;
            context.globalState.update(templateUrl, JSON.stringify(text));
            break;
          }
          case 'COMMON': {
            const text = (message as CommonMessage).payload;
            vscode.window.showInformationMessage(`${text}`);
            break;
          }
          case 'ERROR': {
            const text = (message as CommonMessage).payload;
            vscode.window.showErrorMessage(`${text}`);
            break;
          }
          case 'SCAFFOLDING': {
            const data = (message as FilesMessage).payload;
            if (data.isLocal) {
              this.onCreateDir(data, data.fields);
            } else {
              data.data.forEach((el) => {
                const [, pathFolder] = el.path.split(data.folder);
                if (!vscode.workspace.workspaceFolders) throw new Error();
                const newPath = `${vscode.workspace.workspaceFolders[0].uri.fsPath}${Mustache.render(pathFolder, data.fields)}`;
                this.validateFolder(newPath);
                fs.writeFileSync(newPath, Mustache.render(el.content, data.fields));
              });
            }
            break;
          }
          case 'SCAFFOLDING-GET-FILE': {
            const data = (message as CommonMessage).payload;
            this.getFile(data);
            break;
          }
          default:
            vscode.window.showErrorMessage('Something went wrong');
        }
      },
      null,
      this.disposables
    );

    this.panel.onDidDispose(
      () => {
        this.dispose();
      },
      null,
      this.disposables
    );
  }

  walk(dir: string) {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const newFile = `${dir}\\${file}`;
      const stat = fs.statSync(newFile);
      if (stat && stat.isDirectory()) {
        /* Recurse into a subdirectory */
        results = results.concat(this.walk(newFile));
      } else {
        /* Is a file */
        results.push(newFile);
      }
    });
    return results;
  }

  ensureDirectoryExistence(filePath: string) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    this.ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
    return false;
  }

  validateFolder(newPath: string) {
    if (fs.existsSync(newPath)) {
      vscode.window.showErrorMessage(`Currently there is a file with the path ${newPath}; that is why the operation has been cancelled.`);
      throw new Error();
    }
    this.ensureDirectoryExistence(newPath);
  }

  onCreateDir(data: any, values: Record<string, string>) {
    try {
      if (!vscode.workspace.workspaceFolders) throw new Error();
      const localPath = `${vscode.workspace.workspaceFolders[0].uri.fsPath}\\Scaffolding\\${data.folder}`;
      const contentPaths = this.walk(localPath).map((innerPath: string) => {
        const [route, endRoute] = innerPath.split(`\\Scaffolding\\${data.folder}`);
        return {
          path: `${route}${endRoute}`,
          relativePath: innerPath
        };
      });
      contentPaths
        .filter((element) => element.relativePath !== `${localPath}\\config.json`)
        .forEach((el) => {
          const newPath = Mustache.render(el.path, values);
          this.validateFolder(newPath);
          const contentFile = fs.readFileSync(el.relativePath, 'utf8');
          fs.writeFileSync(newPath, Mustache.render(contentFile, values));
        });
    } catch (error) {
      console.log(error, 'error');
    }
  }

  getFile(data: any) {
    try {
      if (!vscode.workspace.workspaceFolders) throw new Error('The workspace that is not opened');
      const localPath = `${vscode.workspace.workspaceFolders[0].uri.fsPath}\\Scaffolding\\${data.folder}\\${data.file}`;
      if (fs.existsSync(localPath)) {
        const contentFile = fs.readFileSync(localPath, 'utf8');
        ViewLoader.postMessageToWebview({ type: 'SCAFFOLDING-GET-FILE', payload: contentFile });
      } else {
        throw new Error('The configuration file does not exist in the selected folder.');
      }
    } catch (error:any) {
      vscode.window.showErrorMessage(error.message);
    }
  }

  private renderWebview() {
    const html = this.render();
    this.panel.webview.html = html;
  }

  static showWebview(context: vscode.ExtensionContext) {
    const Cls = this;
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;
    if (Cls.currentPanel) {
      Cls.currentPanel.reveal(column);
    } else {
      Cls.currentPanel = new Cls(context).panel;
    }
  }

  static postMessageToWebview<T extends Message = Message>(message: T) {
    // post message from extension to webview
    const cls = this;
    cls.currentPanel?.webview.postMessage(message);
  }

  public dispose() {
    ViewLoader.currentPanel = undefined;

    // Clean up our resources
    this.panel.dispose();

    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  render() {
    const bundleScriptPath = this.panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(this.context.extensionPath, 'out', 'app', 'bundle.js'))
    );

    // The global status of vs code is loaded and passed as a string to the webview.
    let prevState = this.context.globalState.get('global.state') || '';
    let localTemplates: Record<string, any>[];
    prevState = JSON.stringify(prevState).replace(/\\"/g, '\'');

    try {
      if (!vscode.workspace.workspaceFolders) throw new Error();
      localTemplates = fs.readdirSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}\\Scaffolding`, { withFileTypes: true });
      localTemplates = localTemplates
        .filter((dirent: any) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    } catch (error) {
      localTemplates = [];
    }

    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Celerik Scaffolder</title>
        </head>

        <body style="margin: 0; padding: 0">
          <div id="root"></div>
          <script>
            const vscode = acquireVsCodeApi();
            const prevState = ${prevState};
            const localTemplates = "${localTemplates}"
          </script>
          <script src="${bundleScriptPath}"></script>
        </body>
      </html>
    `;
  }
}
