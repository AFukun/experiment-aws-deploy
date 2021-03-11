const { EC2 } = require('@aws-sdk/client-ec2');

const REGION = 'ap-southeast-1';

const ec2 = new EC2({ region: REGION });

const fileService = require('./fileServices');

const describeInstances = async () => {
    const params = {
        InstanceIds: fileService.getInstanceIds()
    };
    return new Promise((resolve, reject) => {
        ec2.describeInstances(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                let instancesIp = [];
                for (const instance of data.Reservations[0].Instances) {
                    if (instance.PublicIpAddress) {
                        instancesIp.push({
                            id: instance.InstanceId,
                            publicIp: instance.PublicIpAddress
                        });
                    } else {
                        reject(
                            new Error(
                                'Instance ' + instance.InstanceId + ' initializing, wait until it is full initialized'
                            )
                        );
                    }
                }
                fileService.writeInstanceIdAndPublicIP(instancesIp);
                resolve(instancesIp.length + ' instances IP obtained');
            }
        });
    });
};

module.exports = {
    describeInstances
};
