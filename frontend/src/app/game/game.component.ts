import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import Config from './config';

import { GameService } from './game.service';

import GameOver from './scenes/GameOver';
import { LoadingScreen } from './scenes/LoadingScreen';
import { MainMenu } from './scenes/MainMenu';
import { Level1 } from './scenes/Scene1';
import { ScoreBoardScene } from './scenes/ScoreBoard';
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
  arrayRecord!: any
  id!: any


  constructor(private gameService: GameService) {
    this.config = {
      type: Phaser.AUTO,
      backgroundColor: '#ef9324',
      scene: [LoadingScreen, UIScene, MainMenu, ScoreBoardScene(this), Level1(this), GameOver],

      parent: 'gameScreen',
      scale: {
        width: 800,
        height: 600,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 600 },
          debug: true
        },
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
    //"recolectar" Array de usuarios e ID 
    this.getScoreboard() // Al inicial el componente asigna a la variable arrayRecord el array recibido de la BD
    this.getID()
    this.phaserGame = new Phaser.Game(this.config);

  }

  // BUG:
  // Crear el archivo de configuracion aparte produce un error ya que el archivo 
  //llama a GameComponent antes de que este se cree


  sendScore(score: number) {


    this.gameService.sendScore(score).subscribe((data) => {


    })

  }

  getScoreboard() {
    this.gameService.getScoreboard().subscribe((data) => {
      this.arrayRecord = data // asignar datos recibidos a Variable

      //console.log('array de BD:');
      //console.log(this.arrayRecord);


    })
  }

  getID() {

    //console.log(`ID del Usuario en el Componente:
    // ${this.id}`);
    let id = this.gameService.getId()
    return id
  }
}
