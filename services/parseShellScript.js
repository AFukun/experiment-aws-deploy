const fs = require('fs');

const readline = require('readline');

async function parseShellScript(file) {
    const lineReader = readline.createInterface({
        input: fs.createReadStream(file)
    });

    return new Promise((resolve) => {
        let commands = [];
        lineReader
            .on('line', (line) => {
                if (line.charAt(0) !== '#') {
                    commands.push("runuser -l ec2-user -c '" + line + "'");
                }
            })
            .on('close', () => {
                resolve(commands);
            });
    });
}

module.exports = {
    parseShellScript
};
