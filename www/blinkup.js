

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var Blinkup = function() {
};

/**
 * startBlinkUp - starts the blinkup process
 * @param {apiKey}: your blinkup api key
 * @param {developerPlanId}: your development plan Id. Will be disregarded when {isInDevelopment} is set to false
 * @param {isInDevelopment}: TRUE if you are connecting to development devices. when you are moving to production devices, this must be set to FALSE.
 * @param {timeoutMS}: Amount of second before the application times out. Default & Maximum value is 60000.
 */
Blinkup.prototype.startBlinkUp = function (apiKey, developerPlanId, isInDevelopment, timeoutMs, successCallback, errorCallback) {
  exec(successCallback, errorCallback, "cordova-plugin-blinkup", "startBlinkUp", [apiKey, developerPlanId, isInDevelopment, timeoutMs]);
};

/**
 * invokeBlinkUp - invoke flash controller
 * @param {apiKey}: your blinkup api key
 * @param {developerPlanId}: your development plan Id. Will be disregarded when {isInDevelopment} is set to false
 * @param {isInDevelopment}: TRUE if you are connecting to development devices. when you are moving to production devices, this must be set to FALSE.
 * @param {timeoutMS}: Amount of second before the application times out. Default & Maximum value is 60000.
 */
Blinkup.prototype.invokeBlinkUp: function (apiKey, developerPlanId, timeoutMs, generateNewPlanId, successCallback, errorCallback) {
  exec(successCallback, errorCallback, "cordova-plugin-blinkup", "invokeBlinkUp", [apiKey, developerPlanId, timeoutMs, generateNewPlanId]);
};

Blinkup.prototype.abortBlinkUp: function (successCallback, errorCallback) {
  exec(successCallback, errorCallback, "cordova-plugin-blinkup", "abortBlinkUp", []);
};

Blinkup.prototype.clearBlinkUpData: function (successCallback, errorCallback) {
  exec(successCallback, errorCallback, "cordova-plugin-blinkup", "clearBlinkUpData", []);
};

module.exports = Blinkup;
