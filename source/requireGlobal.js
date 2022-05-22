var childProcess = require("child_process");
var path = require("path");
var fs = require("fs");

function requireGlobal(packageName) {
  var globalNodeModules = childProcess
    .execSync("npm root -g")
    .toString()
    .trim();
  vscode.window.showInformationMessage(globalNodeModules);
  var packageDir = path.join(globalNodeModules, packageName);
  if (!fs.existsSync(packageDir))
    packageDir = path.join(globalNodeModules, "npm/node_modules", packageName); //find package required by old npm

  if (!fs.existsSync(packageDir))
    throw new Error("Cannot find global module '" + packageName + "'");

  var packageMeta = JSON.parse(
    fs.readFileSync(path.join(packageDir, "package.json")).toString()
  );
  var main = path.join(packageDir, packageMeta.main);

  return require(main);
}

module.exports = requireGlobal;
