// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export default vscode.commands.registerCommand('celerik-scaffolder.onOpenMenu', () => {
    const panel = vscode.window.createWebviewPanel(
        'celerikScaffolder', // Identifies the type of the webview. Used internally
        'Celerik Scaffolder', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {} // Webview options. More on these later.
    );

    panel.webview.html = getWebviewContent(); // set HTML content
});

function getWebviewContent() {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <style>
            body {
                background-color: #263344;
                font-family: Arial, sans-serif;
                padding: 10px 30px;
            }
            hr.solid {
                border-top: 1px solid #FFFFFF;
            }
            .title {
                color: #FFFFFF;
                font-weight: 200;
            }
        </style>
        <body>
            <h1 class="title">Celerik Scaffolder<h1> 
            <hr class="solid">
        </body>
        </html>`;
  }
