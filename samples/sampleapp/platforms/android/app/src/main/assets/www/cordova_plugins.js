cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-blinkup.BlinkUp",
      "file": "plugins/cordova-plugin-blinkup/www/blinkup.js",
      "pluginId": "cordova-plugin-blinkup",
      "clobbers": [
        "blinkup"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-blinkup": "1.0.0"
  };
});