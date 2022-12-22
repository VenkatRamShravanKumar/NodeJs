const _ = require("lodash");

const fn = _.spread(_.union);

const parseData = (data, parseKeys) => {
  var tempStorage = [];
  var versions = [];
  var mergeArr = [];
  //const parseKeys = ['bootstrap', 'fliplet-core', 'moment', 'jquery'];

  for (let item in parseKeys) {
    if (data[parseKeys[item]]) {
      tempStorage.push(data[parseKeys[item]]);
    }
  }
  for (let version in tempStorage) {
    if (tempStorage[version].hasOwnProperty('versions')) {
      versions.push(tempStorage[version].versions);
    }
  }
  let captureRes = _.filter(versions, function (item) {
    var matchingIndustries = _.filter(item, function (obj) {
      return obj.length > 0;
    });
    return matchingIndustries.length > 0;
  });

  for (let obj in captureRes) {
    Object.keys(captureRes[obj]).forEach(item => {
      mergeArr.push(captureRes[obj][item])
    });
  }
  let groupResult = fn(mergeArr);
  return groupResult;
}

module.exports = {
  parseData
}