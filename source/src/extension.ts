import * as vscode from 'vscode';
import { ViewLoader } from './view/ViewLoader';

let myStatusBarItem: vscode.StatusBarItem;
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('celerik-scaffolder.open', (fileUri) => {
      ViewLoader.showWebview(context, fileUri);
    })
  );
  myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  myStatusBarItem.command = 'celerik-scaffolder.open';
  myStatusBarItem.text = '$(status-bar-icon)';
  myStatusBarItem.tooltip = 'Click to open Celerik Scaffolder';
  context.subscriptions.push(myStatusBarItem);
  myStatusBarItem.show();
}

export function deactivate() { }
