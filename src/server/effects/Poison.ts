
import { SpellEffect } from '../base/Effect';
import { Character, SkillClassNames } from '../../models/character';
import { CombatHelper } from '../helpers/combat-helper';
import { Skill } from '../base/Skill';
import * as dice from 'dice.js';

export class Poison extends SpellEffect {

  iconData = {
    name: 'poison-gas',
    color: '#0a0'
  };

  cast(caster: Character, target: Character, skillRef?: Skill) {

    if(!this.potency) this.potency = caster.calcSkillLevel(SkillClassNames.Restoration);

    let mult = 0.15;
    if(this.potency > 0)  mult = 0.35;
    if(this.potency > 11) mult = 1;
    if(this.potency > 21) mult = 3;

    const skillGained = 7 - this.potency;
    if(skillRef && skillGained > 0) {
      caster.gainSkill(SkillClassNames.Restoration, skillGained);
    }

    const wisCheck = Math.max(1, Math.floor(mult * caster.getTotalStat('wis')));
    const damage = +dice.roll(`${this.potency || 1}d${wisCheck}`);

    this.duration = +dice.roll(`${this.potency}d5`);

    this.effectInfo = { damage, caster: caster.uuid };
    target.applyEffect(this);
    this.effectMessage(caster, `You poisoned ${target.name}!`);
  }

  effectStart(char: Character) {
    this.effectMessage(char, 'You were poisoned!');
  }

  tick(char: Character) {
    const caster = char.$$room.state.findPlayer(this.effectInfo.caster);

    CombatHelper.magicalAttack(caster, char, {
      effect: this,
      defMsg: `You are poisoned!`,
      damage: this.effectInfo.damage,
      damageClass: 'necrotic'
    });
  }

  effectEnd(char: Character) {
    this.effectMessage(char, 'Your body flushed the poison out.');
  }
}
