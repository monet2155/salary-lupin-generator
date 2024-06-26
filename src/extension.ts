// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import LittlePrinceText from "./resources/little_prince.json";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "salary-lupin-generator" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "salary-lupin-generator.generateLittlePrince",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const content = LittlePrinceText.content;
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const position = editor.selection.active;
        editor.edit((editBuilder) => {
          editBuilder.insert(position, content);
        });
      } else {
        // open a new editor
        vscode.workspace
          .openTextDocument({
            language: "javascript",
            content: content,
          })
          .then((doc) => {
            vscode.window.showTextDocument(doc);
          });
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
