"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewLoader = void 0;
const vscode = require("vscode");
const path = require("path");
class ViewLoader {
    constructor(context) {
        this.context = context;
        this.disposables = [];
        this.panel = vscode.window.createWebviewPanel('reactApp', 'React App', vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, 'out', 'app'))],
        });
        // render webview
        this.renderWebview();
        // listen messages from webview
        this.panel.webview.onDidReceiveMessage((message) => {
            if (message.type === 'RELOAD') {
                vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction');
            }
            else if (message.type === 'COMMON') {
                const text = message.payload;
                vscode.window.showInformationMessage(`Received message from Webview: ${text}`);
            }
        }, null, this.disposables);
        this.panel.onDidDispose(() => {
            this.dispose();
        }, null, this.disposables);
    }
    renderWebview() {
        const html = this.render();
        this.panel.webview.html = html;
    }
    static showWebview(context) {
        const cls = this;
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        if (cls.currentPanel) {
            cls.currentPanel.reveal(column);
        }
        else {
            cls.currentPanel = new cls(context).panel;
        }
    }
    static postMessageToWebview(message) {
        // post message from extension to webview
        const cls = this;
        cls.currentPanel?.webview.postMessage(message);
    }
    dispose() {
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
        const bundleScriptPath = this.panel.webview.asWebviewUri(vscode.Uri.file(path.join(this.context.extensionPath, 'out', 'app', 'bundle.js')));
        return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>React App</title>
        </head>
    
        <body>
          <div id="root"></div>
          <script>
            const vscode = acquireVsCodeApi();
          </script>
          <script src="${bundleScriptPath}"></script>
        </body>
      </html>
    `;
    }
}
exports.ViewLoader = ViewLoader;
//# sourceMappingURL=ViewLoader.js.map