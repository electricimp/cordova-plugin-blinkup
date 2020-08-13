## Introduction

This Cordova/Phonegap plug-in allows you to easily integrate the native BlinkUp™ process to connect an Electric Imp device to the Internet in your app. Note that because the BlinkUp SDK is private, you will need to add it to your project after installing the plug-in.

Integrate your application with this plug-in directly from the command line using `cordova plugin add cordova-plugin-blinkup`.

## Contents

* [Installation](#installation)
    * [iOS](#ios)<br>
    * [Android](#android)<br>
* [Using the Plugin](#using-the-plugin)
    * [API Calls](#api-calls)
    * [Callbacks](#callbacks)
    * [Testing the Plugin](#testing-the-plugin)
* [JSON Format](#json-format)
    * [Status Codes](#status-codes)
    * [Error Codes](#error-codes)
* [Troubleshooting](#troubleshooting)

## Installation

Navigate to your project directory and install the plug-in with `cordova plugin add cordova-plugin-blinkup`. Add both platforms if you haven’t already with `cordova platform add ios` and `cordova platform add android`.

### iOS

#### Requirements ####

* XCode 8+
* Electric Imp iOS SDK 20+

#### STEP 1 ####

Open `/path/to/project/platforms/ios/<ProjectName>.xcworkspace` in Xcode, select the **Frameworks** group and choose **File > Add Files to \<ProjectName\>**. Select the `BlinkUp.embeddedframework` file given to you by Electric Imp, and ensure that both "*Copy items if needed*" and "*Add to targets: \<ProjectName\>*" are selected.

Expand the `BlinkUp.embeddedframework` you just added to Frameworks, and drag the `BlinkUp.framework` file  to `Link Binary with Libraries`, and `BlinkUp.bundle` (in `BlinkUp.embeddedframework/Resources`) to the `Copy Bundle Resources` in the project's `Build Phases`.

#### STEP 2 ####

Go to the project’s Build Setting in Xcode, and in the `Apple Clang - Preprocessing` section expand the "Preprocessor Macros" setting. Add the following to **Debug** (and only Debug!):

```
DEBUG=1
```

### Android

#### Requirements ####

* Electric Imp Android SDK 6.4.3+

#### STEP 1

Copy the `blinkup.aar` file from the SDK package given to you by Electric Imp to `/path/to/project/platforms/android/libs`.

**Note** The files `MainActivity.java` and `AndroidManifest.xml` will be injected with BlinkUp-specific code when the Android platform is added via a cordova hooks.

## Using the Plug-in

When you are adding calls to the plug-in in your javascript note that you must update `platforms/ios/www/js/index.js`, and `platforms/android/assets/www/js/index.js`. If you are making frequent changes, you may want to include a build step that copies the root `www` files to the platform-specific folders.

## API Calls

There are four calls from the plug-in exposed to the javascript through the `blinkup` interface. For example, to perform BlinkUp you would call `blinkup.startBlinkUp(...);`.

All calls take success and failure callbacks as arguments. See the [**Callbacks**](#callbacks) section below for more information.

#### startBlinkUp(success, failure, options) ####

Presents the native BlinkUp interface, where user can input WiFi info and connect to the imp. The *options* object has the following properties:

| Property | Type | Description |
| --- | --- | --- |
| *apiKey* | String | You must enter your API key or the plug-in won't function |
| *developmentPlanId* | String | **IMPORTANT** You must read [**Testing the Plug-in**](#testing-the-plug-in) before setting this value. Failure to do so can prevent users from connecting to WiFi. Default: "" |
| *isInDevelopment* | Boolean | Set to `true` if you are connecting to development devices. when you are moving to production devices, this must be set to `false`. Default: `false` |
| *timeoutMs* | Integer | How long to wait for device info from servers in ms. Default: 30000 |

#### flashWifiBlinkUp(success, failure, options)

Presents the native BlinkUp flashing interface pre-set for SSID/password usage. The *options* object has the following properties:

| Property | Type | Description |
| --- | --- | --- |
| *apiKey* | String | You must enter your API key or the plug-in won't function |
| *timeoutMs* | Integer | How long to wait for device info from servers in ms. Default: 30000 |
| *ssid* | String | The WiFi SSID. Must not be empty |
| *password* | String | The WiFi password. May be empty. Default: `""` |

#### flashWPSBlinkUp(success, failure, options)

Presents the native BlinkUp flashing interface pre-set for WPS usage. The *options* object has the following properties:

| Property | Type | Description |
| --- | --- | --- |
| *apiKey* | String | You must enter your API key or the plug-in won't function |
| *timeoutMs* | Integer | How long to wait for device info from servers in ms. Default: 30000 |
| *wpsPin* | String | The WiFi WPS PIN. Must not be empty |

#### abortBlinkUp(success, failure)

Cancels server polling for device info if it is in progress.

#### clearBlinkUpData(success, failure)

Immediately initiates the BlinkUp flashing sequence that will clear the imp’s stored WiFi credentials and cached plan ID if there is one.

## Callbacks

It is recommended that you use the same function as both the success callback and the failure callback, as the JSON parsing will be common to both. See the [**JSON format**](#json-format) section for information regarding the JSON sent back to the JavaScript.

### Example ###

In the following callback example, *errorForCode()* and *statusForCode()* are functions you must define to map [error codes](#error-codes) and [status codes](#status-codes) to their respective messages.

```javascript
var callback = function (message) {
    try {
        var jsonData = JSON.parse("(" + message + ")");

        if (jsonData.state == "error") {
            if (jsonData.error.errorType == "blinkup") {
                var statusMsg = jsonData.error.errorMsg;
            } else {
                var statusMsg = errorForCode(jsonData.error.errorCode);
            }
        } else if (jsonData.state == "completed") {
            var statusMsg = statusForCode(jsonData.statusCode);
            if (jsonData.statusCode == "0") {
                var planId = jsonData.deviceInfo.planId;
                var deviceId = jsonData.deviceInfo.deviceId;
                var agentURL = jsonData.deviceInfo.agentURL;
                var verificationDate = jsonData.deviceInfo.verificationDate;
            }
        }

        // update ui here

        if (jsonData.state == "started") {
            // show progress indicator and abort button
        } else {
            // hide progress indicator and abort button
        }
    } catch (exception) {
        console.log("Error parsing json. " + exception);
    }
};
```

## Testing the Plug-in

If you are testing during development, you can input your own development plan ID to add the device to your development account and see the Electric Imp IDE. Just set it in the `index.js` files when making a call to `startBlinkUp` and ensure you pass *true* for `isInDevelopment`.

When you pass in a development plan ID, the plug-in will not cache it across BlinkUp operations. Caching only occurs with production plan IDs. It is used to ensure that if a given end-user reconfigures their device, user settings (stored on a per-agent ID basis) are not lost (because the device will get a new agent ID).

**IMPORTANT NOTE** If a development plan ID makes it into production, the end-user’s device will not configure, and will be unable to connect to WiFi. There is a check in the native code on each platform which will ignore a development plan ID if the build configuration is set to release, but it is best to remove all references to the plan ID and pass an empty string from the Javascript when you’re done debugging. Please read https://developer.electricimp.com/manufacturing/publiccloudplanids for more info.

## JSON Format ##

The plug-in will return a JSON string in the following format. Footnotes in square brackets.

```
{
    "state": "started" | "completed" | "error", [1]
    "statusCode": "",                           [2]
    "error": {                                  [3]
        "errorType": "plugin" | "blinkup",      [4]
        "errorCode": "",                        [5]
        "errorMsg": ""                          [6]
    },
    "deviceInfo": {                             [7]
        "deviceId": "",
        "planId": "",
        "agentURL": "",
        "verificationDate": ""
    }
 }
```

[1] - *started*: the flashing process has finished; waiting for device info from Electric Imp servers<br>
*completed*: Plug-in completed executing.: either WiFi settings have been cleared or device info has been received<br>
[2] - Status of plugin. `null` if *state* is `"error"`. See [**Status Codes**](#status-codes) for details<br>
[3] - Stores error information if *state* is `"error"`. `null` if *state* is `"started"` or `"completed"`<br>
[4] - If the error was issued by the SDK, `"blinkup"`. If the error was issued by the plug-in, `"plugin"`<br>
[5] - BlinkUp SDK error code if *errorType* is `"blinkup"`, or a custom error code if `"plugin"`. See [**Error Codes**](#error-codes) for details<br>
[6] - If *errorType* is `"blinkup"`, the error message from the BlinkUp SDK, otherwise `null`<br>
[7] - Stores the device info record from the Electric Imp servers. `null` if *state* is `"started"` or `"error"`

## Status Codes

These codes can be used to debug your application, or to present the users an appropriate message on success.

```
0   - "Device Connected"
200 - "Gathering device info..."
201 - "Wireless configuration cleared."
202 - "Wireless configuration and cached Plan ID cleared."
```

## Error Codes

**IMPORTANT NOTE** The following codes apply only if *errorType* is `"plugin"`. Errors from the BlinkUp SDK will have their own error codes (which may overlap with those below). If *errorType* is `"blinkup"`, you must use the *errorMsg* field instead. The errors in the 300- range are Android only.
```
100 - "Invalid arguments in call to startBlinkUp."
101 - "Could not gather device info. Process timed out."
102 - "Process cancelled by user."
103 - "Invalid API key. You must set your BlinkUp API key in index.js."
301 - "Could not verify API key with Electric Imp servers."
302 - "Error generating JSON string."
```

## Troubleshooting

### iOS

#### BlinkUp/BlinkUp.h cannot be found

- `BlinkUp.embeddedframework` is not in `path/to/project/platforms/ios/`.
- `BlinkUp.framework` is not in the project’s "Link binary with libraries" build phase.
- "Framework Search Paths" in the project’s build settings does not include `$(PROJECT_DIR)/BlinkUp.embeddedframework`.
- If the three conditions above are correct and it still does not work, try removing the BlinkUp.framework from "Link binary with libraries" and re-adding it. This is a bug in Xcode.

### Android

#### Project with path "blinkup_sdk" could not be found

- The `blinkup_sdk` folder is not in `path/to/project/platforms/android/`.
- The `build.js` file was not updated as outlined in [installation](#android).
- `cordova build android` was not run after updating the `build.js` file.

### BlinkUp

#### BlinkUp process times out

- Lighting significantly affects the BlinkUp process. It doesn't need to be pitch black to connect, but try to find somewhere out of the way of any direct light sources, or try to cover the imp with your hands. Setting your phone’s screen brightness to the max might help.
- The network name and/or password are incorrect.
- The imp was moved, or was not held close enough to the phone for the duration of the BlinkUp.

#### imp is not lit up, and won't react to the BlinkUp process

- The USB power cable is not connected to the imp, or to a power source.
- The imp powers down the BlinkUp system 60s after power-up. If the status LED is not flashing, the BlinkUp system is powered down, so just power-cycle the imp.

#### Javascript gives "blinkup not defined"

- There is a typo in the function being called, or it is not one of the exposed functions outlined in [**API Calls**](#api-calls).
- The function being called is not called on a `blinkup` instance, as discussed in [**API Calls**](#api-calls).

## Acknowledgments

This plug-in was based on the Cordova plug-in originally developed by Macadamian (https://github.com/Macadamian/Cordova-BlinkUpPlugin) and subsequently modified by SensorShare (https://github.com/SensorShare/cordova-plugin-blinkup). Modifications were made to allow usage with Ionic Framework and to have WiFi/WPS form pages as pure HTML.