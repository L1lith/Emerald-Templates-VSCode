const { execSync } = require("child_process");
const { join } = require("path");
// get root folder of global node modules
const root = execSync("npm root -g").toString().trim();

module.exports = require(join(root, "emerald-templates", "src", "index.js"));
