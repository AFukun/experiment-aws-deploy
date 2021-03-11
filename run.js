const { SSM } = require('@aws-sdk/client-ssm');

const REGION = 'ap-southeast-1';

const ssm = new SSM({ region: REGION });

const fileService = require('./services/fileServices');

const run = async () => {
    const params = {
        DocumentName: 'AWS-RunShellScript',
        InstanceIds: fileService.getInstanceIds(),
        Parameters: {
            commands: ["runuser -l ec2-user -c 'echo hell'"]
        }
    };
    ssm.sendCommand(params, async (err) => {
        if (err) console.log(err, err.stack);
        else console.log("Commands Excuted");
    });
};

run();
