var Service, Characteristic;
const request = require('request');


module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-nuriel-deneme-switch", "NurielDenemeSwitch", nurielDenemeSwitch);
}

function nurielDenemeSwitch(log, config) {
  this.log = log;

  // url info
  this.getStatusUrl = config["getStatusUrl"];
  this.setStatusUrl = config["setStatusUrl"];
  this.name = config["name"];

}

nurielDenemeSwitch.prototype = {

  getOvenState: function (callback) {
    const _this = this;

    this.log('Getting Oven State');
    request.get(this.getStatusUrl, {}, function (error, response, body) {
      if (error) {
        _this.log('HTTP getOvenState() failed: ' + error.message);
        callback(error)
      } else {
        const ovenState = JSON.parse(body).ovenStatus
        _this.log(`getLightState() REQUEST finished with success ${ovenState}`);
        callback(null, ovenState);
      }
    })
  },

  setOvenState: function(ovenState, callback) {
    const _this = this;

    // post body for sending to api
    const body = {
      ovenStatus : ovenState
    }
    //  post method
    // post the body to api
    this.log(`Setting  Oven to ${ovenState}`);
    request.post(this.setStatusUrl, { json: body }, function (error, response, body) {
      if (error) {
        _this.log(`Error while setting Oven: ${error.message}`);
        callback(error)
      } else {
        _this.log(`Setting Oven is finished with success.`);
        callback()
      }
    })
  },

  identify: function (callback) {
    this.log("Identify requested!");
    callback(); // success
  },

  getServices: function () {
    var informationService = new Service.AccessoryInformation();

    informationService
      .setCharacteristic(Characteristic.Manufacturer, "Nuriel")
      .setCharacteristic(Characteristic.Model, "Nuriel AI Model")
      .setCharacteristic(Characteristic.SerialNumber, "123-456-789");

    switchService = new Service.Switch(this.name);
    switchService
      .getCharacteristic(Characteristic.On)
      .on('get', this.getOvenState.bind(this))
      .on('set', this.setOvenState.bind(this));

    return [switchService];
  }
};
