
import { Command } from '../../../base/Command';
import { Player } from '../../../../shared/models/player';
import { MessageHelper } from '../../../helpers/world/message-helper';

export class Sing extends Command {

  public name = 'sing';
  public format = 'Target?';

  async execute(player: Player, { args }) {
    const possTargets = MessageHelper.getPossibleMessageTargets(player, args);

    if(possTargets && possTargets[0]) {
      const target = possTargets[0];

      player.sendClientMessage(`You sing with ${target.name}!`);
      target.sendClientMessage(`${player.name} sings with you!`);
      player.sendClientMessageToRadius(`${player.name} sings with ${target.name}!`, 4, [player.uuid, target.uuid]);
      player.removeAgro(target);
      return;
    }

    player.sendClientMessage('You sing!');
    player.sendClientMessageToRadius(`${player.name} sings!`, 4, [player.uuid]);

  }
}
