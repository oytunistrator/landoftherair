
import { Trait } from '../../../shared/models/trait';

export class SwordTricks extends Trait {

  static baseClass = 'Warrior';
  static traitName = 'SwordTricks';
  static description = 'Learn some new sword tricks, increasing your offense by $1|3$.';
  static icon = 'sword-clash';

  static upgrades = [
    { }, { }, { }, { }, { capstone: true }
  ];

}
