const {SSM, SendCommand} = require('@aws-sdk/client-ssm')

const REGION = "ap-southeast-1";

const ssm = new SSM({region: REGION});

const fileService = require("./services/fileServices")

const run = async () => {

    const params = {
        DocumentName: "AWS-RunShellScript",
        InstanceIds: await fileService.getInstanceIds(),
        Parameters: {
            commands: [
                "runuser -l ec2-user -c 'echo hello'",
                "runuser -l ec2-user -c 'mkdir test2'"
            ]
        }
    };
    ssm.sendCommand(params, async (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data.Command.InstanceIds);           // successful response
    });
}

run();
