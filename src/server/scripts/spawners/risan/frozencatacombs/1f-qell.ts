
import { Spawner } from '../../../../base/Spawner';

const npcIds = [
  'Catacombs Qell 1F'
];

export class CatacombsQell1FSpawner extends Spawner {

  constructor(room, opts) {
    super(room, opts, {
      respawnRate: 15,
      initialSpawn: 2,
      maxCreatures: 5,
      spawnRadius: 1,
      randomWalkRadius: 15,
      leashRadius: 25,
      npcIds
    });
  }

}