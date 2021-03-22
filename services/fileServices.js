const fs = require('fs');

const path = require('../config/path');

/**
 * get the luanch parameters of instances
 * @returns {JSON} instanceParams
 */
function getInstanceParams() {
    let instanceParams = JSON.parse(fs.readFileSync(`${process.cwd()}/config/instanceParams.json`, 'utf-8'));
    instanceParams.forEach((param) => {
        // install SSM to allow the instances execute the specific commands
        param.UserData = "sudo yum install -y https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/linux_amd64/amazon-ssm-agent.rpm"
    });
    return instanceParams;
}

/**
 * get the Ids of luanched instances
 * @returns {string[]} InstancesIds
 */
function getInstanceIds() {
    const instanceIds = JSON.parse(fs.readFileSync(`${process.cwd()}/data/instanceIds.json`, 'utf-8'));
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
    fs.writeFileSync(`${process.cwd()}/data/instancePublicIp.json`, JSON.stringify(data));
}

/**
 * @param {JSON} data
 * @property {string[]} InstanceIds
 */
function writeInstanceIds(data) {
    fs.writeFileSync(`${process.cwd()}/data/instanceIds.json`, JSON.stringify(data));
}

module.exports = {
    getInstanceParams,
    getInstanceIds,
    getInstanceIps,
    writeInstanceIdAndPublicIP,
    writeInstanceIds
};
