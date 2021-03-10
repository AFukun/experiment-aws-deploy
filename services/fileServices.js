const fs = require("fs");

const path = require("../config/path");

/**
 * get the luanch parameters of instances
 * @returns {JSON} instanceParams
 */
function getInstanceParams() {
  console.log(`${__filename}: getInstanceParams`);
  const instanceParams = JSON.parse(
    fs.readFileSync(path.instanceParams, "utf-8", async (err, data) => {
      if (err) {
        console.log(err);
      }
      return data;
    })
  );
  return instanceParams;
}

/**
 * get the Ids of luanched instances
 * @returns {string[]} InstancesIds
 */
async function getInstanceIds() {
  console.log(`${__filename}: getInstanceIds`);
  const instanceIds = JSON.parse(
    fs.readFileSync(path.instanceIds, "utf-8", async (err, data) => {
      if (err) {
        console.log(err);
      }
      return data;
    })
  );
  return instanceIds.InstanceIds;
}

/** 
    @param {JSON[]} data
    @property {string} id
    @property {string} publicIp
*/
async function writeInstanceIdAndPublicId(data) {
  console.log(`${__filename}: writeInstanceIdAndPublicId`);
  fs.writeFileSync(path.instancePublicIp, JSON.stringify(data), async (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
  getInstanceParams,
  getInstanceIds,
  writeInstanceIdAndPublicId,
};
