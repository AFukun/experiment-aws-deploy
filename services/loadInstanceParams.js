const fs = require("fs");

const { paramsPath } = require('../config/pathConfig')

async function getInstanceParams() {
    console.log(`${__filename}: getInstanceParams`)
    const instanceParams = JSON.parse(fs.readFileSync(paramsPath, 'utf-8', async (err, data) => {
        if (err) {
            console.log(err);
        }
        return data;
    }))
    return instanceParams
}

module.exports = {
    getInstanceParams
}
