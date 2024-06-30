import {CompletionItem, CompletionParams, createConnection, Hover, IConnection, InitializeResult, TextDocumentPositionParams, TextDocuments} from 'vscode-languageserver';
import {Location, SymbolInformation} from 'vscode-languageserver-types';

import {getCompletionItems, hoverHandler, resolveDefinitions, resolveSymbols} from './overwatch'

const connection: IConnection = createConnection(process.stdin, process.stdout);

var documents: TextDocuments = new TextDocuments();

const completionItems = getCompletionItems();

connection.onInitialize((params): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: documents.syncKind,
      hoverProvider: true,
      documentSymbolProvider: true,
      completionProvider: {resolveProvider: true},
      definitionProvider: true
    }
  };
});


documents.onDidChangeContent((change) => {
  console.log(change);
});

connection.onDidChangeWatchedFiles(change => {
  console.log('didChangeWatchedFiles');
});


connection.onCompletion((params: CompletionParams): CompletionItem[] => {
  return completionItems;
});


connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
  return item;
});

connection.onHover((params: TextDocumentPositionParams): Hover => {
  let doc = documents.get(params.textDocument.uri);
  if (doc == null) {
    return {contents: ''};
  }

  let pos = params.position;
  var contents = hoverHandler(pos, doc);

  return {contents: contents};
});


connection.onDocumentSymbol((params): SymbolInformation[] => {
  var doc = documents.get(params.textDocument.uri);
  if (doc == null) {
    return [];
  }

  var symbols = resolveSymbols(params.textDocument.uri, doc);
  return symbols;
});


connection.onDefinition((params: TextDocumentPositionParams): Location[] => {
  var doc = documents.get(params.textDocument.uri);
  if (doc == null) {
    return [];
  }
  return resolveDefinitions(params.position, doc);
});

documents.listen(connection);

connection.listen();