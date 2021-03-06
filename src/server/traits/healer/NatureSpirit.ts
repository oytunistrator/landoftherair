
import { Trait } from '../../../shared/models/trait';

export class NatureSpirit extends Trait {

  static baseClass = 'Healer';
  static traitName = 'NatureSpirit';
  static description = 'Unlock the ability to critically debuff your enemies, gaining bonus damage and duration.';
  static icon = 'daemon-pull';

  static upgrades = [
    { }, { }, { }, { }, { }
  ];

  static usageModifier(level: number): number {
    return level * 0.05;
  }

}
