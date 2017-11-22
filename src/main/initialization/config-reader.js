
var SearchableClass = require("classpath").SearchableClass;
var fs = require("fs");
var path = require("path");

class Configuration extends SearchableClass{
  constructor(){
    super();
    this.nodeEnv = (process && process && process.env.NODE_ENV) || "BROWSER";
    this.defaultJson = null;
    this.envJson = null;
    this.combinedJson = {};
  }

  load(){
    var defaultJsonPath = path.join(__dirname, "../../resource/default.json");
    var envJsonPath = path.join(__dirname, "../../resource/" + this.nodeEnv +".json");
    try{
      this.defaultJson = fs.readFileSync(defaultJsonPath, "utf8")
    } catch(e){

    }
    try{
      this.envJson = fs.readFileSync(envJsonPath, "utf8")
    } catch(e){

    }

    for(var i in this.defaultJson){
      this.combinedJson[i] = this.defaultJson[i];
    }
    for(var i in this.envJson){
      this.combinedJson[i] = this.envJson[i];
    }

    for(var i in this.combinedJson){
      new ConfigItem(i, this.combinedJson[i]);
    }
  }


}

class ConfigItem extends SearchableClass{
  constructor(name, value){
    super("config:" + name);
    this.name = name;
    this.value = value;
  }
}

module.exports = {Configuration, ConfigItem};
