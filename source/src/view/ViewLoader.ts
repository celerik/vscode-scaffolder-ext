// packages
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// scripts
import {
  Message, CommonMessage, StateMessage, FilesMessage, RedirectMessage
} from './messages/messageTypes';
import {
  ensureDirectoryExistence,
  onRenderContent,
  walk
} from '../../utils/filesManagement';

// vars
let currentPath: string;

export class ViewLoader {
  public static currentPanel?: vscode.WebviewPanel;

  private panel: vscode.WebviewPanel;

  private context: vscode.ExtensionContext;

  private disposables: vscode.Disposable[];

  private fileUri: vscode.Uri;

  constructor(context: vscode.ExtensionContext, fileUri: vscode.Uri) {
    this.context = context;
    this.fileUri = fileUri;
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
    const folders = vscode.workspace.workspaceFolders;
    if (folders) {
      const watcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(`${folders[0].uri.fsPath}\\Scaffolding`, '*')
      );
      watcher.onDidCreate(() => this.onUpdateFiles());
      watcher.onDidDelete(() => this.onUpdateFiles());
    }

    // render webview
    this.renderWebview();

    // listen messages from webview
    this.panel.webview.onDidReceiveMessage(
      (message: Message) => {
        switch (message.type) {
          case 'REDIRECT': {
            const url = (message as RedirectMessage).payload;
            vscode.env.openExternal(vscode.Uri.parse(url));
            break;
          }
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
            if (!vscode.workspace.workspaceFolders) throw new Error();
            currentPath = data.isRelative
              ? fileUri.fsPath : vscode.workspace.workspaceFolders[0].uri.fsPath;
            if (data.isLocal) {
              this.onCreateDir(data, data.fields);
            } else {
              data.data.forEach((el) => {
                const [, pathFolder] = el.path.split(data.folder);
                const newPath = `${currentPath}${onRenderContent(pathFolder, data.fields, data.expressions)}`;
                const fileExists = this.thereIsAFile(newPath);
                if (!fileExists) {
                  fs.writeFileSync(
                    newPath,
                    onRenderContent(el.content, data.fields, data.expressions)
                  );
                }
              });
              vscode.window.showInformationMessage('Scaffolding completed successfully.');
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

  thereIsAFile(newPath: string) {
    if (fs.existsSync(newPath)) {
      vscode.window.showErrorMessage(`Currently there is a file with the path ${newPath}; that is why this file was not created.`);
      return true;
    }
    ensureDirectoryExistence(newPath);
    return false;
  }

  onUpdateFiles() {
    console.log('onUpdateFiles');
    ViewLoader.postMessageToWebview({
      type: 'ON-UPDATE-FILES',
      payload: this.onGetLocalFiles()
    });
  }

  onGetLocalFiles() {
    try {
      if (!vscode.workspace.workspaceFolders) throw new Error();
      const localTemplates = fs.readdirSync(`${vscode.workspace.workspaceFolders[0].uri.fsPath}\\Scaffolding`, { withFileTypes: true });
      return localTemplates
        .filter((dirent: any) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    } catch (error) {
      return [];
    }
  }

  onCreateDir(data: any, values: Record<string, string>) {
    try {
      if (!vscode.workspace.workspaceFolders) throw new Error();
      const localPath = `${vscode.workspace.workspaceFolders[0].uri.fsPath}\\Scaffolding\\${data.folder}`;
      const contentPaths = walk(localPath).map((innerPath: string) => {
        const [, endRoute] = innerPath.split(`\\Scaffolding\\${data.folder}`);
        return {
          path: `${currentPath}${endRoute}`,
          relativePath: innerPath
        };
      });
      contentPaths
        .filter((element) => element.relativePath !== `${localPath}\\config.json`
          && element.relativePath !== `${localPath}\\Config.json`)
        .forEach((el) => {
          const newPath = onRenderContent(el.path, values, data.expressions);
          const fileExists = this.thereIsAFile(newPath);
          if (!fileExists) {
            const contentFile = fs.readFileSync(el.relativePath, 'utf8');
            fs.writeFileSync(newPath, onRenderContent(contentFile, values, data.expressions));
          }
        });
      vscode.window.showInformationMessage('Scaffolding completed successfully.');
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

  static showWebview(context: vscode.ExtensionContext, fileUri: vscode.Uri) {
    const Cls = this;
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;
    if (Cls.currentPanel) {
      Cls.currentPanel.reveal(column);
    } else {
      Cls.currentPanel = new Cls(context, fileUri).panel;
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
    prevState = JSON.stringify(prevState).replace(/\\"/g, '\'');

    const localTemplates = this.onGetLocalFiles();

    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">
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
