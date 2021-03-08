// Import required AWS SDK clients and commands for Node.js
const {
  EC2Client,
  CreateTagsCommand,
  RunInstancesCommand
} = require("@aws-sdk/client-ec2");

// Set the AWS region
const REGION = "ap-east-1"; //e.g. "us-east-1"

// Set the parameters
const instanceParams = {
  ImageId: "ami-0a3a9dd4bc68bae02", //AMI_ID
  InstanceType: "t3.micro",
  KeyName: "TestKey", //KEY_PAIR_NAME
  MinCount: 1,
  MaxCount: 1,
};

// Create EC2 service object
const ec2client = new EC2Client({ region: REGION });

const run = async () => {
  try {
    const data = await ec2client.send(new RunInstancesCommand(instanceParams));
    console.log(data.Instances[0].InstanceId);
    const instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);
    // Add tags to the instance
    const tagParams = {
      Resources: [instanceId],
      Tags: [
        {
          Key: "Name",
          Value: "Node0",
        },
      ],
    };
    try {
      const data = await ec2client.send(new CreateTagsCommand(tagParams));
      console.log("Instance tagged");
    } catch (err) {
      console.log("Error", err);
    }
  } catch (err) {
    console.log("Error", err);
  }
};
run();
