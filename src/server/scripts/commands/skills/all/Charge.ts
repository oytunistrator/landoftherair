
import { startsWith } from 'lodash';

import { Skill } from '../../../../base/Skill';
import { Character } from '../../../../../shared/models/character';
import { CombatHelper } from '../../../../helpers/combat-helper';
import { MoveHelper } from '../../../../helpers/move-helper';
import { MessageHelper } from '../../../../helpers/message-helper';

export class Charge extends Skill {

  static macroMetadata = {
    name: 'Charge',
    macro: 'charge',
    icon: 'running-ninja',
    color: '#530000',
    mode: 'lockActivation',
    tooltipDesc: 'Charge towards an enemy, attacking with the item in your right hand. Requires weapon skill 7 (Warrior) or weapon skill 11 (Other).'
  };

  public name = 'charge';
  public format = 'Target';

  requiresLearn = false;

  canUse(user: Character, target: Character) {
    return this.range(user) + user.getTotalStat('move') >= user.distFrom(target);
  }

  range = (attacker: Character) => {
    const weapon = attacker.rightHand;
    if(!weapon) return 0;

    if(weapon.twoHanded && attacker.leftHand) return -1;

    return weapon.attackRange;
  }

  execute(user: Character, { gameState, args }) {
    if(!args) return false;

    const weapon = user.rightHand;
    if(!weapon) return user.sendClientMessage('You need a weapon in your hand to charge!');

    const userSkill = user.calcSkillLevel(weapon.type);
    const requiredSkill = user.baseClass === 'Warrior' ? 7 : 11;
    if(userSkill < requiredSkill) return user.sendClientMessage('You are not skilled enough to do that!');

    const range = this.range(user);
    if(range === -1) return user.sendClientMessage('You need to have your left hand empty to use that weapon!');

    const possTargets = MessageHelper.getPossibleMessageTargets(user, args);
    const target = possTargets[0];
    if(!target) return user.sendClientMessage('You do not see that person.');

    if(target === user) return;

    this.use(user, target);
  }

  use(user: Character, target: Character) {
    const xDiff = target.x - user.x;
    const yDiff = target.y - user.y;

    if(user.baseClass === 'Warrior') user.gainSkill(user.rightHand ? user.rightHand.itemClass : 'Martial', 1);

    MoveHelper.move(user, { room: user.$$room, gameState: user.$$room.state, x: xDiff, y: yDiff }, true);

    user.$$room.updatePos(user);

    CombatHelper.physicalAttack(user, target, { attackRange: this.range(user) });
  }

}
