const {SSM, SendCommand} = require('@aws-sdk/client-ssm')

const REGION = "ap-southeast-1";

const ssm = new SSM({region: REGION});

const params = {
    DocumentName: "AWS-RunShellScript",
    InstanceIds: [
        "i-00ffb59de88aa9d95"
    ],
    Parameters: {
        commands: [
            "runuser -l ec2-user -c 'echo hello >> text.txt'",
            "runuser -l ec2-user -c 'mkdir badass'"
        ]
    }
};

const run = async () => {
    ssm.sendCommand(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
}

run();
