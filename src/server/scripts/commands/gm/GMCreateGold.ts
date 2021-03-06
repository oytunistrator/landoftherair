
import { Command } from '../../../base/Command';
import { Player } from '../../../../shared/models/player';

export class GMCreateGold extends Command {

  public name = '@gold';
  public format = 'Value';

  async execute(player: Player, { room, args }) {
    if(!player.$$room.subscriptionHelper.isGM(player)) return;

    const value = +args;
    if(!value) return false;

    const item = await player.$$room.itemCreator.getGold(value);

    room.addItemToGround(player, item);
  }
}
