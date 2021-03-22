const { exec } = require('child_process');

const { describeInstances } = require('./services/describeInstance');

const { getInstanceIps } = require('./services/fileServices');

const scp = async (ip) => {
    console.log('Uploading app to ec2-user@' + ip);
    return new Promise((resolve, reject) => {
        exec('scp -o StrictHostKeyChecking=no -i ~/.aws/TestKey.pem -r app ec2-user@' + ip + ':~', (err) => {
            if (err) reject(err);
            resolve('Upload success');
        });
    });
};

const upload = async () => {
    try {
        const response = await describeInstances();
        console.log(response);
        const instanceIps = getInstanceIps();
        for (const ip of instanceIps) {
            const response = await scp(ip);
            console.log(response);
        }
    } catch (err) {
        console.log(err);
        console.log('Upload failed');
    }
};

upload();
