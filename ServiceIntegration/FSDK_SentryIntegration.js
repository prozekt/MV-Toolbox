// Sentry Integration for RPG Maker MV
// Version D1.00
// Created by Studio ACE

var FirehawkADK = FirehawkADK || {};
FirehawkADK.SentryIntegration = FirehawkADK.SentryIntegration || {};
/*:
 *
 * @plugindesc R1.00 || Provides automatic crash and error reports to the developer using Sentry.
 * @author AceOfAces
 * 
 * @param Setup
 * 
 * @param DSN
 * @parent Setup
 * @desc The key that is necessary to send data to.
 * @default <autentication_token>[at]sentry.io/<project-id>
 * 
 * @param Release Tag
 * @parent Setup
 * @desc The tag that is used to denote a release.
 * @default my-project-name[at]1.0.0
 * 
 * @param Environment Tag
 * @parent Setup
 * @desc The tag used to split releases. Handy if you have multiple releases (eg. Stable, Beta, Alpha, etc.)
 * @default dev 
 * 
 * @param Default Setting
 * @parent Setup
 * @desc Which will be the default?
 * @type boolean
 * @on Send
 * @off Don't send
 * @default false
 * 
 * @param Options
 * 
 * @param Force Reporting
 * @parent Options
 * @type boolean
 * @on Yes
 * @off No
 * @desc Forces the plugin to always send reports.
 * @default false
 * 
 * @param Option Name
 * @parent Options
 * @desc The name of the setting in the options menu.
 * @default Auto-Upload Error Reports
 * 
 * @help
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Sentry Integration for RPG Maker MV - Version R1.00
 * Developed by AceOfAces
 * Licensed under the MIT license. Can be used for both non-commercial
 * and commercial games.
 * Please credit me as AceOfAces when you use this plugin.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * This plugin allows developers to receive automated crash reports when the
 * game crashes. This can be a life-saver, especially if the players don't
 * bother to report bugs. You can even use this plugin to catch errors in
 * the code as well.
 * This plugin uses Sentry as a base.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Installation and setup:
 * 1. Sign up to Sentry (https://sentry.io). We'll need a DSN for this.
 * 2. Once you've signed up, you'll be asked to create a project.
 * follow the instruction (make sure to select JavaScript as the
 * programming language).
 * 3. Now, you'll need to download the package. Copy the URL in the
 * "<script" part and open the link in the browser. Then, right click
 * and select "Save As...". Save the js file in the game's js/libs folder.
 * For simplicity, name it as sentry.js
 * 3. Now, let's set up your project. Do the following:
 *  - Edit the index.html with a code editor (or notepad). In the
 *  body section, insert this on top of the line that references pixi.js:
 *  <script type="text/javascript" src="js/libs/sentry.js"></script>
 *  - Put the plugin in the top area of the plugin list. This is important,
 *  since we need to initialize the library before the game starts up.
 *  - If you use Yanfly's Core Engine or Olivia's Player Anti-Stress plugin,
 *  we'll need to patch them. Open the plugin(s) with notepad or a code
 *  editor, find the SceneManager.catchException and add the line:
 *  FirehawkADK.SentryIntegration.ReportEvent(e, 'fatal', 'engine', 'code');
 *  Underneath the line:
 *  SceneManager.catchException = function(e){
 *  - Once this is done, you'll need to fill in the data necessary to 
 *  initialize the SDK. Copy the DSN (see the init code in the setup page),
 *  the the version and environment tags you've set up over to this
 *  plugin's parameters. Make sure to replace [at] with the [at]
 *  symbol and switch the 'Force Reporting' to Yes.
 * 4. Once the project's set up, we'll need to test it out. Take any
 * plugin and add a myfunction1(); in another function. The AltMenuScreen
 * plugin is a good candidate. Also, make sure to set the 'Force Reporting'
 * option to Yes.
 * 5. If the game crashes and Sentry has en entry for the error, the
 * plugin's set up correctly. Set the 'Force Reporting' option to
 * No. Make sure to also remove the myfunction1(); as well.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Plugin API
 * The plugin has a pretty simple API that can integrate easilly
 * to the game's code. Most of the work is done by using this method:
 * 
 * FirehawkADK.SentryIntegration.ReportEvent(e,reportLevel,reporttag1,reporttag2);
 * 
 * This tag will send a report, alogside the error stack, breadcrumbs,
 * game information (version and environment tags), Operating System
 * and the tags you've specified. The arguments used are:
 * e: The The object that has the error stack. Look for catchException
 * or something similar. This is required.
 * reportLevel: The severity of the even (info, warning, error, fatal).
 * Look at the Sentry's documentation for more information.
 * This is also required.
 * report_tag: These are used for categorization purposes.
 * The plugin parameters break down like this:
 * DSN: This is the key that the service gives you.
 * Release Tag: For organisational purposes. Let's you attach a custom version.
 * Environment Tag: This denotes the type of the game. This helps in breaking
 * down the game versions a little further. Game version 1.0.0 that has the tag
 * dev is different from game version 1.0.0 and tag release.
 * Default Setting: This sets the default setting that the game will have.
 * For some countries, you may have to set this to 'Don't send', in order to
 * comply with laws regarding privacy.
 * Force Reporting: This forces the game to report crashes, regardless
 * if it's on or when you are playtesting. This is ignored when
 * you aren't debugging the game(Running the game via the editor).
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * What's next?
 * -Make sure that your Sentry account is secured. Use a strong
 * password and 2 Factor Authentication.
 * -Do *not*, under any circumstances, share the DSN key.
 * Encrypt the game properly and compile the game's source code.
 * If you need an easy tool to compile the game's code, take a
 * look at my other project:
 * https://studioace.wordpress.com/projects/rpg-maker-mv-cook-tool/
 * -Make sure that you do not include any personal info without
 * disclosing this. Especially if you decide to edit this plugin.
 * Sentry provides a data scruber, so make sure to set this up.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

// Reference the Plugin Manager's parameters.
var paramdeck = PluginManager.parameters('FSDK_SentryIntegration');
//Create the global Parameter Deck.
FirehawkADK.ParamDeck = FirehawkADK.ParamDeck || {};
//Load variables set in the Plugin Manager.
FirehawkADK.ParamDeck.SentryDSN = String(paramdeck['DSN']);
FirehawkADK.ParamDeck.SentryReleaseTag = String(paramdeck['Release Tag']);
FirehawkADK.ParamDeck.SentryEnvironmentTag = String(paramdeck['Environment Tag']);
FirehawkADK.ParamDeck.SentryActivationFlag = String(paramdeck['Default Setting']).trim().toLowerCase() === 'true';
FirehawkADK.ParamDeck.SentryForceFlag = String(paramdeck['Force Reporting']).trim().toLowerCase() === 'true';
FirehawkADK.ParamDeck.SentryActivationOptionName = String(paramdeck['Option Name']);

//The initialisation code. 
Sentry.init({ dsn: FirehawkADK.ParamDeck.SentryDSN, release: FirehawkADK.ParamDeck.SentryReleaseTag, environment: FirehawkADK.ParamDeck.SentryEnvironmentTag });

//Initialise config.
ConfigManager.SentryUploadReports = FirehawkADK.ParamDeck.SentryActivationFlag;

FirehawkADK.SentryIntegration.PrepConfig = ConfigManager.makeData;
ConfigManager.makeData = function () {
    var config = FirehawkADK.SentryIntegration.PrepConfig.call(this);
    config.SentryUploadReports = this.SentryUploadReports;
    return config;
};

FirehawkADK.SentryIntegration.ApplyConfig = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
    FirehawkADK.SentryIntegration.ApplyConfig.call(this, config);
    this.SentryUploadReports = (config['SentryUploadReports'] != undefined) ? config['SentryUploadReports'] : FirehawkADK.ParamDeck.SentryActivationFlag;
};

//Re-write catchException
SceneManager.catchException = function (e) {
    FirehawkADK.SentryIntegration.ReportEvent(e, 'fatal', 'engine', 'code');
    if (e instanceof Error) {
        Graphics.printError(e.name, e.message);
        console.error(e.stack);
    } else {
        Graphics.printError('UnknownError', e);
    }
    AudioManager.stopAll();
    this.stop();
};

//Implements the error report code. Edit this if you want to adjust how the library will collect information.
FirehawkADK.SentryIntegration.ReportEvent = function (e, reportLevel, report_tag1, report_tag2) {
    Sentry.configureScope(function (scope) {
        scope.setTag(report_tag1, report_tag2);
        scope.setLevel(reportLevel);
    });
    if ((FirehawkADK.ParamDeck.SentryForceFlag && Utils.isOptionValid('test')) || (!Utils.isOptionValid('test') && ConfigManager.SentryUploadReports)) Sentry.captureException(e);
};

//Add the setting to the Options menu.
FirehawkADK.SentryIntegration.RegisterSetting = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function () {
    FirehawkADK.SentryIntegration.RegisterSetting.call(this);
    this.addCommand(FirehawkADK.ParamDeck.SentryActivationOptionName, 'SentryUploadReports');
};