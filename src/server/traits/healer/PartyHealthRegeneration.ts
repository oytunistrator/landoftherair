
import { PartyTrait } from '../../../shared/models/partytrait';

export class PartyHealthRegeneration extends PartyTrait {

  static traitName = 'PartyHealthRegeneration';
  static description = 'Increase the health regeneration of your party by +$2|6$.';
  static icon = 'health-increase';

  static upgrades = [
    { }, { }, { requireCharacterLevel: 15, capstone: true }
  ];

  static usageModifier(level: number): number {
    return level * 2;
  }

}
