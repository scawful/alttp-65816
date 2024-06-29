
import * as path from 'path';
import * as vscode from 'vscode';
import {LanguageClient, LanguageClientOptions, ServerOptions, TransportKind} from 'vscode-languageclient/node';

let client: LanguageClient;
import {parseDisassembly} from './parse-rom';
import {parseRamMap} from './parse-ram';

export function activate(context: vscode.ExtensionContext) {
  let disposable =
      vscode.commands.registerCommand('extension.parseRamMap', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          const document = editor.document;
          const text = document.getText();
          const parsedData = parseRamMap(text);
          vscode.workspace
              .openTextDocument({content: parsedData, language: 'json'})
              .then(doc => {
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
      vscode.workspace.openTextDocument({content: parsedData, language: 'json'})
          .then(doc => {
            vscode.window.showTextDocument(doc);
          });
    }
  });

  context.subscriptions.push(disposable);

  // The server is implemented in node
  let serverModule =
      context.asAbsolutePath(path.join('server', 'out', 'server.js'));
  // The debug options for the server
  let debugOptions = {execArgv: ['--nolazy', '--inspect=6009']};

  // If the extension is launched in debug mode then the debug server options
  // are used Otherwise the run options are used
  let serverOptions: ServerOptions = {
    run: {module: serverModule, transport: TransportKind.ipc},
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for asm documents
    documentSelector: [{scheme: 'file', language: 'asm'}],
    synchronize: {
      // Notify the server about file changes to 'alttp-65816.tmLanguage' files
      // contained in the workspace
      fileEvents: vscode.workspace.createFileSystemWatcher('**/*.tmLanguage')
    }
  };

  // Create the language client and start the client.
  client = new LanguageClient(
      'alttp65816', 'ALTTP 65816 Language Server', serverOptions,
      clientOptions);

  // Start the client. This will also launch the server
  client.start();
}


export function deactivate(): Thenable<void>|undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
