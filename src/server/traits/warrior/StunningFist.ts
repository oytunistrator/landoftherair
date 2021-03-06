
import { Trait } from '../../../shared/models/trait';
import { Player } from '../../../shared/models/player';

export class StunningFist extends Trait {

  static baseClass = 'Warrior';
  static traitName = 'StunningFist';
  static description = 'Increase your chance of stunning an opponent with a martial attack.';
  static icon = 'thor-fist';

  static upgrades = [
    { }, { }, { capstone: true }
  ];

  static currentlyInEffect(player: Player): boolean {
    return super.currentlyInEffect(player) && !player.rightHand;
  }

  static usageModifier(level: number): number {
    return level * 2;
  }

}
