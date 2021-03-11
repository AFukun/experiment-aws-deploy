const fs = require('fs');

const path = require('../config/path');

/**
 * get the luanch parameters of instances
 * @returns {JSON} instanceParams
 */
function getInstanceParams() {
    console.log(`${__filename}: getInstanceParams`);
    let instanceParams = JSON.parse(fs.readFileSync(path.instanceParams, 'utf-8'));
    instanceParams.forEach((param) => {
        if (param.UserData) {
            param.UserData = Buffer.from(param.UserData).toString('base64');
        }
    });
    return instanceParams;
}

/**
 * get the Ids of luanched instances
 * @returns {string[]} InstancesIds
 */
function getInstanceIds() {
    const instanceIds = JSON.parse(fs.readFileSync(path.instanceIds, 'utf-8'));
    console.log(`The number of loaded instances id: ${instanceIds.InstanceIds.length}`);
    return instanceIds.InstanceIds;
}

/** 
    @param {JSON[]} data
    @property {string} id
    @property {string} publicIp
*/
async function writeInstanceIdAndPublicIP(data) {
    fs.stat(`${process.cwd()}/data/`, (err, stat) => {
        if (err) {
            fs.mkdirSync(`${process.cwd()}/data/`, { recursive: true })
        }
        fs.writeFileSync(path.instancePublicIp, JSON.stringify(data));
    })
}

/**
 * @param {JSON} data
 * @property {string[]} InstanceIds
 */
async function writeInstanceIds(data) {
    fs.stat(`${process.cwd()}/data/`, (err, stat) => {
        if (err) {
            fs.mkdirSync(`${process.cwd()}/data/`, { recursive: true })
        }
        fs.writeFileSync(path.instanceIds, JSON.stringify(data));
    })
}

module.exports = {
    getInstanceParams,
    getInstanceIds,
    writeInstanceIdAndPublicIP,
    writeInstanceIds
};
