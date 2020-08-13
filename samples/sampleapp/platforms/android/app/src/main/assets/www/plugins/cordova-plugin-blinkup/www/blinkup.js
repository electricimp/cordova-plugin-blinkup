cordova.define("cordova-plugin-blinkup.BlinkUp", function(require, exports, module) {
var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var BlinkUp = function() {
  this.name = "BlinkUp";
};

/**
 * startBlinkUp - starts the blink up process
 * @param {module:blinkup.onSuccess} successCallback
 * @param {module:blinkup.onError} errorCallback
 * @param {module:blinkup.BlinkUpOptions} options BlinkUp Options
 */
BlinkUp.prototype.startBlinkUp = function (successCallback, errorCallback, options) {
  argscheck.checkArgs('fFO', 'BlinkUp.startBlinkUp', arguments);
  options = options || {};
  var getValue = argscheck.getValue;

  var apiKey = getValue(options.apiKey, "");
  var developerPlanId = getValue(options.developerPlanId, "");
  var isInDevelopment = !!options.isInDevelopment;
  var timeoutMs = getValue(options.timeoutMs, 30000);
  exec(successCallback, errorCallback, "BlinkUp", "startBlinkUp", [apiKey, developerPlanId, isInDevelopment, timeoutMs]);
};

/**
 * flashWifiBlinkUp - invoke flash controller for wifi
 * @param {module:blinup.onSuccess} successCallback
 * @param {module:blinkup.onError} errorCallback
 * @param {module:blinkup.BlinkUpWifiOptions} options BlinkUp Wifi Options
 */
BlinkUp.prototype.flashWifiBlinkUp = function (successCallback, errorCallback, options) {
  argscheck.checkArgs('fFO', 'BlinkUp.flashWifiBlinkUp', arguments);
  options = options || {};
  var getValue = argscheck.getValue;

  var apiKey = getValue(options.apiKey, '');
  var timeoutMs = getValue(options.timeoutMs, 30000);
  var ssid = getValue(options.ssid, '');
  var password = getValue(options.password, '');
  exec(successCallback, errorCallback, "BlinkUp", "flashWifiBlinkUp", [apiKey, timeoutMs, ssid, password]);
};

/**
 * flashWPSBlinkUp - invoke flash controller for wps
 * @param {module:blinkup.onSuccess} successCallback
 * @param {module:blinkup.onError} errorCallback
 * @param {module:blinkup.BlinkUpWPSOptions} options Blinkup WPS Options
 */
BlinkUp.prototype.flashWPSBlinkUp = function (successCallback, errorCallback, options) {
  argscheck.checkArgs('fFO', 'BlinkUp.flashWPSBlinkUp', arguments);
  options = options || {};
  var getValue = argscheck.getValue;

  var apiKey = getValue(options.apiKey, '');
  var timeoutMs = getValue(options.timeoutMs, 30000);
  var wpsPin = getValue(options.wpsPin, '');
  exec(successCallback, errorCallback, "BlinkUp", "flashWPSBlinkUp", [apiKey, timeoutMs, wpsPin]);
};

BlinkUp.prototype.abortBlinkUp = function (successCallback, errorCallback) {
  argscheck.checkArgs('fF', 'BlinkUp.abortBlinkUp', arguments);
  exec(successCallback, errorCallback, "BlinkUp", "abortBlinkUp", []);
};

BlinkUp.prototype.clearBlinkUpData = function (successCallback, errorCallback) {
  argscheck.checkArgs('fF', 'BlinkUp.clearBlinkUpData', arguments);
  exec(successCallback, errorCallback, "BlinkUp", "clearBlinkUpData", []);
};

module.exports = new BlinkUp();

});
