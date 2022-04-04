import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { Scene1 } from './scenes/Scene1';
import { LoadingScreen } from './scenes/LoadingScreen';
import { startMenu } from './scenes/MainMenu';
import { UserService } from '../user/user.service';
import { UIScene } from './scenes/UIScene';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  private score: number = 0;

  constructor(private userservice: UserService) {
    this.config = {
      type: Phaser.AUTO,
      backgroundColor: '#ef9324',
      scene: [LoadingScreen, startMenu(this), Scene1, UIScene],

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

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
    this.score = parseInt(localStorage.getItem('score')!) || 0;
    console.log('puntuacion del localStorage:' + this.score);
  }
}
