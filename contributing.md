# How to Contribute

Contribute to this project by forking the repository and creating pull requests. You can also contribute by logging issues in this repository.

1. When you have a fork, start working on a topic branch based on your own private fork.
    a. Ensure you follow the process as referred in https://help.github.com/articles/syncing-a-fork/
2. Make your changes on that branch.
    a. To test your branch, we recommend using the `UpdatePluginLocally.sh` script and test the patch in the Sample Application.
    b. Note that for IOS you may be forced to re-add the plugin files to the Build Phase `Compiling Sources`
3. When you are ready, commit your changes on your topic branch, and push the changes to your private fork. Be very descriptive in your commit message.
4. Submit a pull request against the `master` branch of the `https://github.com/Macadamian/Cordova-BlinkUpSample` and `https://github.com/Macadamian/Cordova-BlinkUpPlugin` repositories.
5. Someone will look at the Pull Request, ask questions, and address any feedback.
6. When we are comfortable with your patch, we will merge it in the repository!

## Requirements

BlinkUp requires use of the BlinkUp SDK and a BlinkUp API Key. The SDK can be downloaded from https://developer.electricimp.com/blinkup/sdk
When you become an Electric Imp Customer, you will receive your BlinkUp API Key.

## Missing Features

The API currently does not offer a mechanism to do custom-branded BlinkUp screens.
