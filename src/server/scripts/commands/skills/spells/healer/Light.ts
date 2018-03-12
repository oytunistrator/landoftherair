
import { Skill } from '../../../../../base/Skill';
import { Character } from '../../../../../../shared/models/character';
import { Light as CastEffect } from '../../../../../effects/misc/Light';

export class Light extends Skill {

  static macroMetadata = {
    name: 'Light',
    macro: 'cast light',
    icon: 'candle-light',
    color: '#aa0',
    mode: 'clickToTarget',
    tooltipDesc: 'Clear darkness near the target (3x3). Cost: 25 MP'
  };

  public name = ['light', 'cast light'];

  mpCost() { return 25; }
  range(attacker: Character) { return 5; }

  execute(user: Character, { args, effect }) {

    const target = this.getTarget(user, args, true);
    if(!target) return;

    if(!this.tryToConsumeMP(user, effect)) return;

    this.use(user, target);
  }

  use(user: Character, target: Character, baseEffect = {}) {
    const effect = new CastEffect(baseEffect);
    effect.cast(user, target, this);
  }

}
