//----------------------------------------------------------------------------------------------------
// HP Color Controller
// Developed by AceOfAces
//----------------------------------------------------------------------------------------------------

var FirehawkADK = FirehawkADK || {};

/*:
* @plugindesc R1.03A || Allows developers to customise the HP bar and text Color depending on the remaining HP.
* @author AceOfAces
* 
* @param Compatibility Mode
* @type boolean
* @on Activate
* @off Deactivate
* @desc Turn this on (set to true) if you customise the normal HP bar and text color on a different plugin.
* @default false
* 
*
* @param Limits
* 
* @param Low HP
* @desc Set the point where the HP is considered low. The number must be float!
* @type number
* @max 1
* @min 0.01
* @decimals 2
* @default 0.25
* @parent Limits
*
* @param Critical HP
* @desc Set the point where the HP is considered critical. The number must be float!
* @type number
* @max 1
* @min 0.01
* @decimals 2
* @default 0.15
* @parent Limits
* 
* @param Colors 
*
* @param Normal HP Color 1
* @desc Changes the color when the HP is considered normal (it's ignored if the compatibility mode is set). Interger variable.
* @default 11
* @parent Colors
* 
* @param Normal HP Color 2
* @desc Same with the previous parameter.
* @type number
* @max 31
* @min 0
* @default 3
* @parent Colors
* 
* @param Low HP Text Color
* @desc Set the color of the text on low HP. Interger variable.
* @type number
* @max 31
* @min 0
* @default 2
* @parent Colors
*
* @param Low HP Bar Color 1
* @desc Sets the color for the HP bar on low HP. Interger variable.
* @type number
* @max 31
* @min 0
* @default 20
* @parent Colors
*
* @param Low HP Bar Color 2
* @desc Same with the previous parameter.
* @type number
* @max 31
* @min 0
* @default 21
* @parent Colors
*
* @param Critical HP Text
* @desc Set the color of the text when the HP is in critical. Interger variable.
* @type number
* @max 31
* @min 0
* @default 18
* @parent Colors
*
* @param Critical HP Bar Color 1
* @desc Set the color of the HP Bar when the HP is in critical. Interger variable.
* @type number
* @max 31
* @min 0
* @default 18
* @parent Colors
* 
* @param Critical HP Bar Color 2
* @desc Same with the previous parameter.
* @type number
* @max 31
* @min 0
* @default 2
* @parent Colors
*
* @help
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* HP Color Controller (MV Port) - Version R1.02
* Developed by AceOfAces
* Licensed under GPLv3 license. Can be used for both Non-commercial and
* commercial games.
* Please credit me as AceOfAces when you use this plugin.
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* This script provides additional hp gauge and text colors similar to the
* Pokemon series.
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Installation and setup:
* 1. Place this plugin below any plugin that changes HP Bars as well
* (such as Yanfly's Core Engine). If you don't have any of these on your project,
* you can place it anywhere.
* 2. After turning it on, save and playtest. If the game didn't crash after
* opening the menu and you can see the bars green, the plugin is installed
* properly.
* If you wish to use the HP bar colors set by the other script, turn on the
* compatibility mode by setting it's value to true. Compatibility mode
* will simply ignore Normal HP Color 1 and Normal HP Color 2 and will use
* the preset color (or the other plugin's color, if it rerouted the selection).
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Set up the colors:
* This plugin uses the colors found on the Window.png file (which you can find
* on img/System ). To use the color you want, enter a number of 0 to 31. Here's
* a quick reference guide:
*  0  1  2  3  4  5  6  7 
*  8  9 10 11 12 13 14 15
* 16 17 18 19 20 21 22 23
* 24 25 26 27 28 29 30 31
* The HP bar consists of two colors making a gradient. HP Color 1 is the color
* on the leftmost side of the HP bar and HP Color 2 is the color on the
* rightmost side of the bar.
* The HP Text is simply the color you specify.
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* 
*/
// Reference the Plugin Manager's parameters.
var paramdeck = PluginManager.parameters('FSDK_HPColor');
//Create the global Parameter Deck.
FirehawkADK.ParamDeck = FirehawkADK.ParamDeck || {};
//Load variables set in the Plugin Manager.
FirehawkADK.ParamDeck.CompatMode = String(paramdeck['Compatibility Mode']).trim().toLowerCase() === 'true';
FirehawkADK.ParamDeck.LowHPLimit = parseFloat(paramdeck['Low HP']);
FirehawkADK.ParamDeck.CriticalHPLimit = parseFloat(paramdeck['Critical HP']);
FirehawkADK.ParamDeck.HPNormalBar1 =  parseInt(paramdeck['Normal HP Color 1']);
FirehawkADK.ParamDeck.HPNormalBar2 = parseInt(paramdeck['Normal HP Color 2']);
FirehawkADK.ParamDeck.HPLowText = parseInt(paramdeck['Low HP Text Color']);
FirehawkADK.ParamDeck.HPBarLow1 = parseInt(paramdeck['Low HP Bar Color 1']);
FirehawkADK.ParamDeck.HPBarLow2 = parseInt (paramdeck['Low HP Bar Color 2']);
FirehawkADK.ParamDeck.CriticalHPText = parseInt(paramdeck['Critical HP Text']);
FirehawkADK.ParamDeck.CriticalHPBar1 = parseInt(paramdeck['Critical HP Bar Color 1']);
FirehawkADK.ParamDeck.CriticalHPBar2 = parseInt(paramdeck['Critical HP Bar Color 2']);

Window_Base.prototype.hpTextColorPicker = function(actor) {
 if (actor.hp < actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit) return this.textColor(FirehawkADK.ParamDeck.CriticalHPText);
 else if (actor.hp > actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit && actor.hp < actor.mhp * FirehawkADK.ParamDeck.LowHPLimit) return this.textColor(FirehawkADK.ParamDeck.HPLowText);
 else return this.systemColor();
};

// Pick the HP Color 1 for the HP Gauge.
Window_Base.prototype.hpbarColorPicker1 = function(actor) {
    if (actor.hp < actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit) return this.textColor(FirehawkADK.ParamDeck.CriticalHPBar1);
    else if (actor.hp > actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit && actor.hp < actor.mhp * FirehawkADK.ParamDeck.LowHPLimit) return this.textColor(FirehawkADK.ParamDeck.HPBarLow1);
    else if (FirehawkADK.ParamDeck.CompatMode == true) this.hpGaugeColor1();
    else return this.textColor(FirehawkADK.ParamDeck.HPNormalBar1);
};

//Pick the HP Color 2 for the HP Gauge.
Window_Base.prototype.hpbarColorPicker2 = function(actor) {
    if (actor.hp < actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit) return this.textColor(FirehawkADK.ParamDeck.CriticalHPBar2);
    else if (actor.hp > actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit && actor.hp < actor.mhp * FirehawkADK.ParamDeck.LowHPLimit) return this.textColor(FirehawkADK.ParamDeck.HPBarLow2);
    else if (FirehawkADK.ParamDeck.CompatMode == true) this.hpGaugeColor2();
    else return this.textColor(FirehawkADK.ParamDeck.HPNormalBar2);
};

//Re-write the drawActorHp function.
this.Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.hpbarColorPicker1(actor);
    var color2 = this.hpbarColorPicker2(actor);
    this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
    this.changeTextColor(this.hpTextColorPicker(actor));
    this.drawText(TextManager.hpA, x, y, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
                           this.hpColor(actor), this.normalColor());
};

//Re-write the hpColor function so it can change the text color.
Window_Base.prototype.hpColor = function(actor) {
    if (actor.isDead()) {
        return this.deathColor();
    } else if (actor.hp < actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit)
    return this.textColor(FirehawkADK.ParamDeck.CriticalHPText);
     else if (actor.hp > actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit && actor.hp < actor.mhp * FirehawkADK.ParamDeck.LowHPLimit)
     return this.textColor(FirehawkADK.ParamDeck.HPLowText);   
 else {
        return this.normalColor();
    }
};