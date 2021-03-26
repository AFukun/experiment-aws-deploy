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
    console.log('Commands Excuting...');
    ssm.sendCommand(params, (err) => {
        if (err) console.log(err.message);
        else console.log('Commands Excuted');
    });
};

run();
