
import * as vscode from 'vscode';
import { parseDisassembly } from './parse-rom';
import { parseRamMap } from './parse-ram';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.parseRamMap', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const text = document.getText();
      const parsedData = parseRamMap(text);
      vscode.workspace.openTextDocument({ content: parsedData, language: 'json' }).then(doc => {
        vscode.window.showTextDocument(doc);
      });
    }
  });

  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand('extension.parseRomMap', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const text = document.getText();
      const parsedData = parseDisassembly(text);
      vscode.workspace.openTextDocument({ content: parsedData, language: 'json' }).then(doc => {
        vscode.window.showTextDocument(doc);
      });
    }
  });

  context.subscriptions.push(disposable);
}
