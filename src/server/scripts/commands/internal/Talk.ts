
import { startsWith } from 'lodash';

import { Command } from '../../../base/Command';
import { Player } from '../../../../shared/models/player';

export class Talk extends Command {

  public name = '~talk';

  execute(player: Player, { room, gameState, args }) {
    const argArr = args.split(',');

    if(argArr.length < 2) return;

    argArr[1] = argArr[1].trim();
    const [findStrAndName, message] = argArr;

    let findStr = findStrAndName;

    if(startsWith(findStr, '~talk') || startsWith(findStr, '~say')) {
      findStr = findStr.split(' ')[1].trim();
    }

    const possTargets = room.getPossibleMessageTargets(player, findStr);
    const target = possTargets[0];
    if(!target) return player.sendClientMessage('You do not see that person.');

    target.receiveMessage(player, message);
  }

}
