
import { find } from 'lodash';

import { Command } from '../../../../base/Command';
import { Player } from '../../../../../shared/models/player';

export class GroundToLocker extends Command {

  public name = '~GtW';
  public format = 'ItemType ItemId LockerID';

  async execute(player: Player, { room, gameState, args }) {
    const splitArgs = args.split(' ');
    if(splitArgs.length < 3) return false;

    const [itemType, itemId, lockerId] = splitArgs;
    const item = this.getItemFromGround(player, itemType, itemId);
    if(!item) return;

    if(!this.checkPlayerEmptyHand(player)) return;

    if(!this.findLocker(player)) return;

    const locker = await room.loadLocker(player, lockerId);
    if(!locker) return;

    if(!this.addItemToContainer(player, locker, item)) return;

    player.setRightHand(null);
    room.updateLocker(player, locker);
    room.removeItemFromGround(item);

  }

}
