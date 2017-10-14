import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { ClientGameState } from '../clientgamestate';

import { Game } from './phasergame';
import { Player } from '../../../shared/models/player';
import { ColyseusService } from '../colyseus.service';

import { HPBox, XPBox } from './floating-box';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  @ViewChild('mapElement')
  public mapContainer;

  @Input()
  public currentPlayer: Player = new Player({});

  @Input()
  public clientGameState: ClientGameState = new ClientGameState({});

  private phaser: any;
  private game: Game;

  start$: any;

  create$: any;
  update$: any;
  remove$: any;
  boxes$:  any;

  started: boolean;

  constructor(public colyseus: ColyseusService) {}

  private cleanCanvases() {
    const elements = document.getElementsByTagName('canvas');
    while(elements[0]) elements[0].parentNode.removeChild(elements[0]);
  }

  ngOnInit() {
    this.start$ = this.clientGameState.setMap$.subscribe((map: any) => {

      if(this.started && this.phaser) {
        this.game.reset();
        this.game.initPromises();
        this.phaser.state.start(this.phaser.state.current);
      }

      if(!map || !map.layers || this.started) return;

      this.started = true;
      this.cleanCanvases();

      // 9x9, tiles are 64x64
      const boxSize = 9 * 64;

      this.game = new Game(this.clientGameState, this.colyseus, this.currentPlayer);

      const config = {
        width: boxSize, height: boxSize,
        multiTexture: true, renderer: (<any>window).Phaser.AUTO,
        state: this.game, parent: 'map',
        enableDebug: false
      };

      this.phaser = new (<any>window).Phaser.Game(config);

      this.create$ = this.clientGameState.createPlayer$.subscribe(async (addPlayer) => {
        await this.game.canCreate;

        if(!this.game.isLoaded) {
          this.clientGameState.players.forEach(player => {
            this.game.createPlayer(player);
          });
        } else {
          this.game.createPlayer(addPlayer);
        }

      });

      this.update$ = this.clientGameState.updatePlayer$.subscribe(async (player) => {
        await this.game.canUpdate;

        this.game.updatePlayer(player);
      });

      this.remove$ = this.clientGameState.removePlayer$.subscribe((player) => {
        this.game.removePlayer(player);
      });

      this.boxes$ = this.clientGameState.playerBoxes$.subscribe(player => {
        if(player.username !== this.currentPlayer.username || player.name !== this.currentPlayer.name) return;
        const hpDifference = player.hp.__current - this.currentPlayer.hp.__current;
        const xpDifference = player.exp - this.currentPlayer.exp;

        if(hpDifference !== 0) {
          const box = new HPBox(hpDifference);
          box.init(this.mapContainer.nativeElement);
        }

        if(xpDifference !== 0) {
          const box = new XPBox(xpDifference);
          box.init(this.mapContainer.nativeElement);
        }

        this.currentPlayer = player;
      });
    });
  }

  ngOnDestroy() {
    this.start$.unsubscribe();

    if(this.create$) this.create$.unsubscribe();
    if(this.update$) this.update$.unsubscribe();
    if(this.remove$) this.remove$.unsubscribe();
    if(this.boxes$)  this.boxes$.unsubscribe();

    this.game.destroy();
    this.phaser.destroy();

    this.cleanCanvases();
  }

}
