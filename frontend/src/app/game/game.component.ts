import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import Config from './config';
import { playerScore } from './scenes/Scene1';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})

export class GameComponent implements OnInit, OnDestroy {
  phaserGame!: Phaser.Game;
  private score: number = 0;

  constructor() {
  }

  ngOnDestroy(): void {
    this.phaserGame.destroy(true);
  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(Config);

    // this.score = parseInt(localStorage.getItem('score')!) || 0;
    // console.log('puntuacion del localStorage:' + this.score);
  }
}
