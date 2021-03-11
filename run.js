const { SSM } = require('@aws-sdk/client-ssm');

const REGION = 'ap-southeast-1';

const ssm = new SSM({ region: REGION });

const fileService = require('./services/fileServices');

const run = async () => {
    const params = {
        DocumentName: 'AWS-RunShellScript',
        InstanceIds: fileService.getInstanceIds(),
        Parameters: {
            commands: ["runuser -l ec2-user -c 'echo hello'", "runuser -l ec2-user -c 'mkdir test2'"]
        }
    };
    ssm.sendCommand(params, async (err, response) => {
        if (err) console.log(err, err.stack);
        else console.log(response); 
    });
};

run();
