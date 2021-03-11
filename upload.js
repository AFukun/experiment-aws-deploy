/*
 * Todos
 * [*] check IP before upload
 * [*] get IP of all instances
 * [*] upload use exec
 * [*] handle errors
 */

const { exec } = require('child_process');

const { describeInstances } = require('./services/describeInstance');

const { getInstanceIps } = require('./services/fileServices');

const upload = async () => {
    try {
        const response = await describeInstances();
        console.log(response);
        const instanceIps = getInstanceIps();
        for (const ip of instanceIps) {
            console.log('Uploading app to server...');
            exec('scp -i ~/.aws/TestKey.pem -r app ec2-user@' + ip + ':~', (err) => {
                if (err) throw err;
                console.log('Upload success');
            });
        }
    } catch (err) {
        console.log(err);
        console.log('Upload failed');
    }
};

upload();
