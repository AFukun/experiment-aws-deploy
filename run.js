const { SSM } = require('@aws-sdk/client-ssm');

const REGION = 'ap-southeast-1';

const ssm = new SSM({ region: REGION });

const fileService = require('./services/fileServices');

const { parseShellScript } = require('./services/parseShellScript');

const run = async () => {
    const commands = await parseShellScript('./config/run.sh');
    const params = {
        DocumentName: 'AWS-RunShellScript',
        InstanceIds: fileService.getInstanceIds(),
        Parameters: {
            commands: commands
        }
    };
    ssm.sendCommand(params, async (err) => {
        if (err) console.log(err, err.stack);
        else console.log('Commands Excuted');
    });
};

run();
