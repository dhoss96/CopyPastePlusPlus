import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let highlightedBlocks: string[] = [];
	let selectedRanges: vscode.Range[]= [];

	let copyFirstDisposable = vscode.commands.registerCommand('CopyPastePlusPlus.copyFirst', () => {
		var editor = vscode.window.activeTextEditor;
		var selection = editor!.selection;
		selectedRanges[0]= new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
		highlightedBlocks[0]=editor!.document.getText(selectedRanges[0]);
		vscode.window.showInformationMessage('First block copied');
		});
	let copySecondDisposable = vscode.commands.registerCommand('CopyPastePlusPlus.copySecond', () => {
		var editor = vscode.window.activeTextEditor;
		var selection = editor!.selection;
		selectedRanges[1]= new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
		highlightedBlocks[1]=editor!.document.getText(selectedRanges[1]);
		vscode.window.showInformationMessage('Second block copied');
		});
	let posteGroupDisposable = vscode.commands.registerCommand('CopyPastePlusPlus.pasteGroup', () => {
		var editor = vscode.window.activeTextEditor;
		var selection = editor!.selection;
		var selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
		const newText = `${highlightedBlocks[0]}\n${editor!.document.getText(selectionRange)}\n${highlightedBlocks[1]}`;
		editor!.edit(editBuilder => {
			editBuilder.replace(selectionRange, newText);
		});
		vscode.commands.executeCommand('editor.action.formatDocument');
	});
	context.subscriptions.push(copyFirstDisposable,copySecondDisposable,posteGroupDisposable);
}