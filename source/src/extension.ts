import * as vscode from 'vscode';
import { ViewLoader } from './view/ViewLoader';

let myStatusBarItem: vscode.StatusBarItem;
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('celerik-scaffolder.open', () => {
      ViewLoader.showWebview(context);
    })
  );
  myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  myStatusBarItem.command = 'celerik-scaffolder.open';
  context.subscriptions.push(myStatusBarItem);
  myStatusBarItem.text = '$(status-bar-icon)';
  myStatusBarItem.show();
}

export function deactivate() { }
