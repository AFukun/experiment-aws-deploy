const { EC2 } = require('@aws-sdk/client-ec2');

const { getInstanceParams, writeInstanceIds } = require('./services/fileServices');

const fs = require('fs');

const REGION = 'ap-southeast-1'; //e.g. "us-east-1"

const ec2 = new EC2({ region: REGION });

const instanceParams = getInstanceParams();

const deploy = async () => {
    let Ids = [];
    try {
        for (const param of instanceParams) {
            const response = await ec2.runInstances(param);
            response.Instances.forEach((instance) => {
                Ids.push(instance.InstanceId);
                console.log(instance.InstanceType + ' ' + instance.InstanceId + ' created');
            });
        }
    } catch (err) {
        console.log(err);
    }
    if (!fs.existsSync('data')) {
        fs.mkdirSync('data');
    }
    writeInstanceIds({ InstanceIds: Ids });
    console.log('Total ' + Ids.length + ' instances launched');
};

deploy();
