const { EC2 } = require('@aws-sdk/client-ec2');

const { getInstanceParams, writeInstanceIds } = require('./services/fileServices');

const REGION = 'ap-southeast-1'; //e.g. "us-east-1"

const ec2 = new EC2({ region: REGION });

const instanceParams = getInstanceParams();

const deploy = async () => {
    let total = 0;
    let Ids = [];
    try {
        for (const param of instanceParams) {
            const response = await ec2.runInstances(param);
            response.Instances.forEach((instance) => {
                Ids.push(instance.InstanceId)
                console.log(instance.InstanceType + ' ' + instance.InstanceId + ' created');
            });
            total += response.Instances.length;
        }
        writeInstanceIds({ "InstanceIds": Ids });
    } catch (err) {
        console.log(err);
    }
    console.log('Total ' + total + ' instances launched');
};

deploy();
