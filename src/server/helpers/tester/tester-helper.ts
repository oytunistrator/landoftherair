
import { Player } from '../../../shared/models/player';
import { StatName } from '../../../shared/interfaces/character';
import { SkillHelper } from '../character/skill-helper';
import { Loadouts } from './loadout-listing';

import { get } from 'lodash';
import { Currency } from '../../../shared/interfaces/holiday';
import { SkillClassNames } from '../../../shared/interfaces/character';

export class TesterHelper {

  static sendMessage(player: Player, message: string) {
    player.sendClientMessage(`[tester] ${message}`);
  }

  static owtsAllGear(player: Player, boost: number): void {
    ['rightHand', 'leftHand', 'gear.Ear', 'gear.Head', 'gear.Neck',
      'gear.Wrists', 'gear.Waist', 'gear.Ring1', 'gear.Ring2',
      'gear.Hands', 'gear.Feet', 'gear.Armor', 'gear.Robe1', 'gear.Robe2'
    ].forEach(slot => {
      const item = get(player, slot);
      if(!item) return;

      item.stats = item.stats || {};
      item.stats.defense = item.stats.defense || 0;
      item.stats.offense = item.stats.offense || 0;
      item.tier = item.tier || 0;

      item.stats.defense += boost;
      item.stats.offense += boost;
      item.tier += boost;
    });

    this.sendMessage(player, `Adjusted Owts enchants on all gear by ${boost}.`);
  }

  static generateLoadout(player: Player, level: number) {
    let curCheckLevel = level;

    let curGear = Loadouts[player.baseClass][curCheckLevel];
    while(!curGear) {
      curCheckLevel -= 1;
      curGear = Loadouts[player.baseClass][curCheckLevel];
    }

    ['Ear', 'Head', 'Neck',
     'Wrists', 'Waist', 'Ring1', 'Ring2',
      'Hands', 'Feet', 'Armor', 'Robe1', 'Robe2'
    ].forEach(async slot => {
      if(!curGear[slot]) return;

      const item = await player.$$room.itemCreator.getItemByName(curGear[slot]);
      if(!item.effect) item.effect = { name: 'Secondwind', autocast: true, potency: 1 };
      player._equip(item);
    });

    if(curGear.Belt && curGear.Belt.length > 0) {
      player.belt.takeItemFromSlots([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      curGear.Belt.forEach(async itemName => {
        const item = await player.$$room.itemCreator.getItemByName(itemName);
        player.belt.addItem(item);
      });
    }

    this.sendMessage(player, `Generated ${player.baseClass} loadout for level ${level}`);
  }

  static setLevel(player: Player, level: number) {
    player.level = level;
    player.recalculateStats();
    this.sendMessage(player, `Set level to: ${level}`);
  }

  static setHP(player: Player, hp: number) {
    player.setBaseStat('hp', hp);
    player.recalculateStats();
    this.sendMessage(player, `Set HP to: ${hp}`);
  }

  static setMP(player: Player, mp: number) {
    player.setBaseStat('mp', mp);
    player.recalculateStats();
    this.sendMessage(player, `Set MP to: ${mp}`);
  }

  static setRegen(player: Player, regen: number) {
    player.setBaseStat('hpregen', regen);
    player.setBaseStat('mpregen', regen);
    player.recalculateStats();
    this.sendMessage(player, `Set HP/MP regen to: ${regen}`);
  }

  static gainGold(player: Player, gold: number) {
    player.earnCurrency(Currency.Gold, gold);
    this.sendMessage(player, `Gained ${gold} gold`);
  }

  static setSkills(player: Player, level: number) {
    const curSkill = player.allSkills;
    const skillGain = SkillHelper.calcSkillXP(level - 1);

    Object.keys(SkillClassNames).forEach(skill => {

      try {
        player._gainSkill(skill, -curSkill[skill.toLowerCase()]);
        player.gainSkill(skill, skillGain);
      } catch(e) {}

    });

    this.sendMessage(player, `Set all skill levels to: ${level}`);
  }

  static setStats(player: Player, level: number) {
    ['str', 'dex', 'agi', 'int', 'wis', 'wil', 'cha', 'luk', 'con'].forEach(stat => {
      player.setBaseStat(<StatName>stat, level);
    });

    player.recalculateStats();

    this.sendMessage(player, `Set all stats to: ${level}`);
  }

  static resetTraits(player: Player) {
    player.skillTree.loseTraitPoints(9999);
    player.skillTree.gainTraitPoints(1000);
    player.skillTree.loseResetPoints(9999);
    player.skillTree.gainResetPoints(1000);
    player.skillTree.losePartyPoints(9999);
    player.skillTree.gainPartyPoints(1000);
    player.skillTree.loseAncientPoints(9999);
    player.skillTree.gainAncientPoints(1000);

    const allTraits = player.allTraitLevels || {};
    Object.keys(allTraits).forEach(key => {
      player.decreaseTraitLevel(key, 50);
    });

    this.sendMessage(player, `Reset all traits and gained 1000 TP/PP`);
  }

}
