import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-minijuego',
  templateUrl: './minijuego.component.html',
  styleUrls: ['./minijuego.component.scss']
})
export class MinijuegoComponent implements OnInit {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [ MainScene ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 }
        }
      }
    };
    this.phaserGame = new Phaser.Game(this.config);
  }

  ngOnInit() {
   
  }
}


class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  create() {
    console.log('create method');
  }
  preload() {
    console.log('preload method');
  }
  override update() {
    console.log('update method');
  }
}