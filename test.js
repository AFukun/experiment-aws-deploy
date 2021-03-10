const { parseShellScript } = require("./parseShellScript");

const test = async() => {
    const commands = await parseShellScript('./scripts/initInstance.sh');

    console.log(commands);
}

test();

