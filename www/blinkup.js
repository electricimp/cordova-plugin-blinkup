

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
 * @param {module:blinkup.BlinkupOptions} options CameraOptions
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
 * invokeBlinkUp - invoke flash controller
 * @param {apiKey}: your blinkup api key
 * @param {developerPlanId}: your development plan Id. Will be disregarded when {isInDevelopment} is set to false
 * @param {isInDevelopment}: TRUE if you are connecting to development devices. when you are moving to production devices, this must be set to FALSE.
 * @param {timeoutMS}: Amount of second before the application times out. Default & Maximum value is 60000.
 */
Blinkup.prototype.invokeBlinkUp = function (successCallback, errorCallback, apiKey, developerPlanId, timeoutMs, generateNewPlanId) {
  argscheck.checkArgs('fFO', 'Blinkup.invokeBlinkUp', arguments);
  options = options || {};
  var getValue = argscheck.getValue;

  var apiKey = getValue(options.apiKey, "");
  var developerPlanId = getValue(options.developerPlanId, "");
  var isInDevelopment = !!options.isInDevelopment;
  var timeoutMs = getValue(options.timeoutMs, 30000);
  exec(successCallback, errorCallback, "Blinkup", "invokeBlinkUp", [apiKey, developerPlanId, isInDevelopment, timeoutMs]);
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
