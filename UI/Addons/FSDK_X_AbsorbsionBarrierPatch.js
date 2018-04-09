/*:
* @plugindesc R1.00 || Modifies Yanfly's Absorbion Barrier to support the HP Color Controller.
* @author AceOfAces
* 
* @help
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Extension for HP Color Controller: Yanfly's Absorbion Barrier
* Version R1.00
* Developed by AceOfAces
* Licensed under GPLv3 license. Can be used for both Non-commercial and
* commercial games.
* Please credit me as AceOfAces when you use this plugin.
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* In order for the absorbion barrier to work, Yanfly rewrites how the
* HP bars are drawn. This extension adds back the HP Color controller.
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Installation and setup:
* 1. Place this plugin underneath both the HP Color Controller and Yanfly's
* Absorbion Barrier.
* 2. After turning it on, save and playtest. If the game didn't crash after
* opening the menu and you can see the bars green, the plugin is installed
* properly.
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* 
*/

Window_Base.prototype.drawActorHp = function(actor, wx, wy, ww) {
    ww = ww || 186;
    var color1 = this.hpbarColorPicker1(actor);
    var color2 = this.hpbarColorPicker2(actor);
    if (actor.barrierPoints() > 0) {
      ww = this.drawBarrierGauge(actor, wx, wy, ww);
    } else {
      this.drawGauge(wx, wy, ww, actor.hpRate(), color1, color2);
    }
    this.changeTextColor(this.hpTextColorPicker(actor));
    this.drawText(TextManager.hpA, wx, wy, 44);
    var c1 = this.hpColor(actor);
    var c2 = this.normalColor();
    this.drawCurrentAndMax(actor.hp, actor.mhp, wx, wy, ww, c1, c2);
};

Window_Base.prototype.drawBarrierGauge = function(actor, wx, wy, ww) {
    if (actor.hp + actor.barrierPoints() > actor.mhp) {
      var max = actor.mhp + actor.barrierPoints();
      var rate1 = actor.hp / max;
    } else {
      var max = actor.mhp;
      var rate1 = actor.hpRate();
    }
    var rate2 = (actor.barrierPoints() + actor.hp) / max;
    var color1 = this.barrierColor1();
    var color2 = this.barrierColor2();
    this.drawGauge(wx, wy, ww, rate2, color1, color2);
    var color1 = this.hpbarColorPicker1(actor);
    var color2 = this.hpbarColorPicker2(actor);
    var ww2 = ww * rate1;
    this.drawGauge(wx, wy, ww2, 1, color1, color2);
    return ww;
};