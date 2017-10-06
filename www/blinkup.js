var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var Blinkup = function() {
  this.name = "Blinkup";
};

/**
 * startBlinkUp - starts the blinkup process
 * @param {module:blinkup.onSuccess} successCallback
 * @param {module:blinkup.onError} errorCallback
 * @param {module:blinkup.BlinkupOptions} options Blinkup Options
 */
Blinkup.prototype.startBlinkUp = function (successCallback, errorCallback, options) {
  argscheck.checkArgs('fFO', 'Blinkup.startBlinkUp', arguments);
  options = options || {};
  var getValue = argscheck.getValue;

  var apiKey = getValue(options.apiKey, "");
  var developerPlanId = getValue(options.developerPlanId, "");
  var isInDevelopment = !!options.isInDevelopment;
  var timeoutMs = getValue(options.timeoutMs, 30000);
  exec(successCallback, errorCallback, "Blinkup", "startBlinkUp", [apiKey, developerPlanId, isInDevelopment, timeoutMs]);
};

/**
 * flashWifiBlinkup - invoke flash controller for wifi
 * @param {module:blinkup.onSuccess} successCallback
 * @param {module:blinkup.onError} errorCallback
 * @param {module:blinkup.BlinkupOptions} options Blinkup Options
 */
Blinkup.prototype.flashWifiBlinkup = function (successCallback, errorCallback, options) {
  argscheck.checkArgs('fFO', 'Blinkup.flashWifiBlinkup', arguments);
  options = options || {};
  var getValue = argscheck.getValue;

  var apiKey = getValue(options.apiKey, '');
  var timeoutMs = getValue(options.timeoutMs, 30000);
  var ssid = getValue(options.ssid, '');
  var password = getValue(options.password, '');
  exec(successCallback, errorCallback, "Blinkup", "flashWifiBlinkup", [apiKey, timeoutMs, ssid, password]);
};

/**
 * flashWifiBlinkup - invoke flash controller for wps
 * @param {module:blinkup.onSuccess} successCallback
 * @param {module:blinkup.onError} errorCallback
 * @param {module:blinkup.BlinkupOptions} options Blinkup Options
 */
Blinkup.prototype.flashWPSBlinkup = function (successCallback, errorCallback, options) {
  argscheck.checkArgs('fFO', 'Blinkup.flashWPSBlinkup', arguments);
  options = options || {};
  var getValue = argscheck.getValue;

  var apiKey = getValue(options.apiKey, '');
  var timeoutMs = getValue(options.timeoutMs, 30000);
  var wpsPin = getValue(options.wpsPin, '');
  exec(successCallback, errorCallback, "Blinkup", "flashWPSBlinkup", [apiKey, timeoutMs, wpsPin]);
};

Blinkup.prototype.abortBlinkUp = function (successCallback, errorCallback) {
  argscheck.checkArgs('fF', 'Blinkup.abortBlinkUp', arguments);
  exec(successCallback, errorCallback, "Blinkup", "abortBlinkUp", []);
};

Blinkup.prototype.clearBlinkUpData = function (successCallback, errorCallback) {
  argscheck.checkArgs('fF', 'Blinkup.clearBlinkUpData', arguments);
  exec(successCallback, errorCallback, "Blinkup", "clearBlinkUpData", []);
};

module.exports = new Blinkup();
