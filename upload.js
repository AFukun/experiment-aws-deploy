const { exec } = require('child_process');

const { describeInstances } = require('./services/describeInstance');

const {
    getInstanceIps, getInstanceParams
} = require('./services/fileServices');

const scp = async (ip) => {
    console.log('Uploading app to ec2-user@' + ip);
    const instanceParams = getInstanceParams();
    return new Promise((resolve, reject) => {
        exec(
            `scp -o StrictHostKeyChecking=no -i ~/.aws/${instanceParams[0].KeyName}.pem -r app ec2-user@${ip}:~`,
            (err) => {
                if (err) reject(err);
                resolve('Upload success');
            }
        );
    });
};

const upload = async () => {
    try {
        await describeInstances();
        const instanceIps = getInstanceIps();
        for (const ip of instanceIps) {
            await scp(ip).then((response) => {
                console.log(response);
            });
        }
    } catch (err) {
        if (err) console.log(err.message);
        console.log('Upload failed');
    }
};

upload();
