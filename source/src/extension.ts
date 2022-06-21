import * as vscode from 'vscode';
import { ViewLoader } from './view/ViewLoader';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('celerik-scaffolder.open', () => {
      const versionKey = 'shown.version';
      context.globalState.setKeysForSync([versionKey]);
      ViewLoader.showWebview(context);
    })
  );
}

export function deactivate() { }
