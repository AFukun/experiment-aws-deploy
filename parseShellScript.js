const fs = require("fs");

const readline = require("readline");

function parseShellScript(file) {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(file),
  });

  return new Promise((resolve) => {
    let commands = [];
    lineReader
      .on("line", (line) => {
        if (line.charAt(0) !== "#") {
          commands.push(line);
        }
      })
      .on("close", () => {
        resolve(commands);
      });
  });
}

module.exports = {
  parseShellScript,
};
