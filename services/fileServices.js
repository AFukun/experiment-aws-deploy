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

function getInstanceIps() {
    const instanceIdAndPublicIp = JSON.parse(fs.readFileSync(path.instancePublicIp, 'utf-8'));
    let instanceIps = [];
    for (let data of instanceIdAndPublicIp) {
        instanceIps.push(data.publicIp);
    }
    return instanceIps;
}

/** 
    @param {JSON[]} data
    @property {string} id
    @property {string} publicIp
*/
function writeInstanceIdAndPublicIP(data) {
    fs.writeFileSync(path.instancePublicIp, JSON.stringify(data));
}

/**
 * @param {JSON} data
 * @property {string[]} InstanceIds
 */
function writeInstanceIds(data) {
    fs.writeFileSync(path.instanceIds, JSON.stringify(data));
}

module.exports = {
    getInstanceParams,
    getInstanceIds,
    getInstanceIps,
    writeInstanceIdAndPublicIP,
    writeInstanceIds
};
