const {EC2} = require('@aws-sdk/client-ec2')

const REGION = 'ap-southeast-1';

const ec2 = new EC2({region: REGION});

const params = {
  InstanceIds: [
    "i-00ffb59de88aa9d95"
  ]
};

const run = async () => {
  ec2.describeInstances(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data.Reservations[0].Instances[0]);
        }
    }); 
}

run();
