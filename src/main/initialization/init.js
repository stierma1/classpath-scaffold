

module.exports = new Promise((res, rej) => {
  var {Configuration} = require("./config-reader");

  var configuration = new Configuration();
  configuration.load();
  res();
})
