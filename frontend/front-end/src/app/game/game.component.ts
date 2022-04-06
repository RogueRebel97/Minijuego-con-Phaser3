import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { Scene1 } from './scenes/Scene1';
import { LoadingScreen } from './scenes/LoadingScreen';
// import { MainMenu, startMenu } from './scenes/MainMenu';
import { UserService } from '../user/user.service';
import { MainMenu } from './scenes/MainMenu';
import Settings from './scenes/Settings';
import UIScene from './scenes/UIScene';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  private score: number = 0;

  constructor(private userservice: UserService) {
    this.config = {
      type: Phaser.AUTO,
      backgroundColor: '#ef9324',
      scene: [LoadingScreen, UIScene, MainMenu, Scene1],

      parent: 'gameScreen',
      scale: {
        width: 800,
        height: 600,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      plugins: {
        global: [NineSlicePlugin.DefaultCfg],
      },
    };
  }

  ngOnDestroy(): void {
    this.phaserGame.destroy(true);
  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);

    this.score = parseInt(localStorage.getItem('score')!) || 0;
    console.log('puntuacion del localStorage:' + this.score);
  }
}
