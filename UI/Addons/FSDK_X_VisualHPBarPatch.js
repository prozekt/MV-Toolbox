//----------------------------------------------------------------------------------------------------
// HP Color Controller
// Developed by AceOfAces
//----------------------------------------------------------------------------------------------------

/*:
* @plugindesc R1.00 || Modifies Yanfly's Visual HP Bars to use the HP Color Controller.
* @author AceOfAces
* 
* @param Compatibility Mode
* @type boolean
* @on Activate
* @off Deactivate
* @desc Turn this on if you want to keep the settings from Yanfly's plugin for the HP Gauge when the HP is on normal levels.
* @default false
* 
* @help
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Extension for HP Color Controller: Yanfly's Visual HP Bar
* Version R1.00
* Developed by AceOfAces
* Licensed under GPLv3 license. Can be used for both Non-commercial and
* commercial games.
* Please credit me as AceOfAces when you use this plugin.
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Modifies Yanfly's Visual HP Bars to use the HP Color Controller.
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Installation and setup:
* 1. Place this plugin underneath both the HP Color Controller and Yanfly's
* Visual HP Bars.
* 2. After turning it on, save and playtest. If the game didn't crash after
* opening the menu and you can see the bars green, the plugin is installed
* properly.
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Set up the colors:
* This plugin will use the HP Color Controller's settings. Refer to its help
* file for more info.
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* 
*/

var VHGParamDeck = PluginManager.parameters('FSDK_X_VisualHPBarPatch');
var VHGCompatMode = String(paramdeck['Compatibility Mode']).trim().toLowerCase() === 'true';

// Pick the HP Color 1 for the HP Gauge.
Window_VisualHPGauge.prototype.hpbarColorPicker1 = function(actor) {
    if (actor.hp < actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit) return this.textColor(FirehawkADK.ParamDeck.CriticalHPBar1);
    else if (actor.hp > actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit && actor.hp < actor.mhp * FirehawkADK.ParamDeck.LowHPLimit) return this.textColor(FirehawkADK.ParamDeck.HPBarLow1);
    else if (VHGCompatMode == true) this.textColor(Yanfly.Param.VHGHpColor1);
    else return this.textColor(FirehawkADK.ParamDeck.HPNormalBar1);
};

//Pick the HP Color 2 for the HP Gauge.
Window_VisualHPGauge.prototype.hpbarColorPicker2 = function(actor) {
    if (actor.hp < actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit) return this.textColor(FirehawkADK.ParamDeck.CriticalHPBar2);
    else if (actor.hp > actor.mhp * FirehawkADK.ParamDeck.CriticalHPLimit && actor.hp < actor.mhp * FirehawkADK.ParamDeck.LowHPLimit) return this.textColor(FirehawkADK.ParamDeck.HPBarLow2);
    else if (VHGCompatMode == true) this.textColor(Yanfly.Param.VHGHpColor2);
    else return this.textColor(FirehawkADK.ParamDeck.HPNormalBar2);
};

Window_VisualHPGauge.prototype.drawActorHp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.hpbarColorPicker1(actor);
    var color2 = this.hpbarColorPicker2(actor);
    var rate = this._displayedValue / actor.mhp;
    if (Imported.YEP_AbsorptionBarrier && actor.barrierPoints() > 0) {
      ww = this.drawBarrierGauge(actor, x, y, width);
    } else {
      this.drawGauge(x, y, width, rate, color1, color2);
    }
    if (Yanfly.Param.VHGShowHP) {
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.hpA, x, y, 44);
    }
    if (Yanfly.Param.VHGShowValue) {
      var val = this._displayedValue
      var max = actor.mhp;
      var w = width;
      var color = this.hpColor(actor);
      this.drawCurrentAndMax(val, max, x, y, w, color, this.normalColor());
    }
};