import { NPC } from '../../../../../shared/models/npc';

export const setup = async (npc: NPC) => {
  npc.hostility = 'Never';
  npc.affiliation = 'Frosty Friends';

  npc.gear.Armor = await npc.$$room.npcLoader.loadItem('Risan Tunic');

  npc.recalculateStats();
};

export const responses = (npc: NPC) => {

  npc.parser.addCommand('hello')
    .set('syntax', ['hello'])
    .set('logic', (args, { player }) => {
      return 'Help us protect our hard-working present elves from the evil snowmen, and they will reward you!';
    });
};
