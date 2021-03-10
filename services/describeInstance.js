const { instancePublicIp, instanceIds } = require("../config/path.js")

const {EC2} = require('@aws-sdk/client-ec2');

const REGION = 'ap-southeast-1';

const ec2 = new EC2({region: REGION});

const fileService = require("./fileServices")

const run = async () => {
  const params = {
    InstanceIds: await fileService.getInstanceIds()
  }
  ec2.describeInstances(params, async(err, data) => {
        if (err) {
            console.log(err);
        } else {
          let instancesIp = []
          for(const instance of data.Reservations){
            instancesIp.push({
              "id": instance.Instances[0].InstanceId,
              "publicIp": instance.Instances[0].PublicIpAddress
            })
          }
          fileService.writeInstanceIdAndPublicId(instancesIp)
        }
    }); 
}

run();
