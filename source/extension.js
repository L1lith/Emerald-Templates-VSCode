// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { inspect } = require("util");
let emeraldTemplates;
try {
  emeraldTemplates = require("./emeraldTemplates");
} catch (e) {
  if (!(e instanceof Error)) {
    e = new Error(e);
  }
  e.message =
    "The following error ocurred while trying to load Emerald Templates (make sure it's installed globally):" +
    e.message;
  throw e;
}
const { Options, listProjects } = emeraldTemplates;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // vscode.window.showInformationMessage(
  //   typeof emeraldTemplates +
  //     " " +
  //     Object.entries(emeraldTemplates)
  //       .map(([key]) => `"${key}"`)
  //       .join(", ")
  // );
  console.log(
    'Congratulations, your extension "emerald-templates-vscode" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "emerald-templates-vscode.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from Emerald-Templates-VSCode!"
      );
    }
  );
  let disposable2 = vscode.commands.registerCommand(
    "emerald-templates-vscode.listProjects",
    async function () {
      // The code you place here will be executed every time your command is executed
      const projects = await listProjects(/*new Options({ mode: "vscode" })*/);
      vscode.window.showInformationMessage(
        "Available Projects: " +
          Object.values(projects)
            .map((project) => project.name)
            .sort()
            .join(", ")
      );
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
