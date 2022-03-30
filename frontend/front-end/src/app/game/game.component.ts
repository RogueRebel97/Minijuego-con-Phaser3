import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { MainMenu } from './scenes/MainMenu';
import { Scene1 } from './scenes/Scene1';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})


export class GameComponent implements OnInit {
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
   type:Phaser.AUTO,
   backgroundColor: "#125555",
   scene:[MainMenu, Scene1],
  
   parent:'gameScreen',
   scale: {
    width:800,
    height:600,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600
  },
  max: {
    width: 1600,
    height: 1200
},

  }
    };
  }

  
   

  ngOnInit(): void {
  
      
      this.phaserGame = new Phaser.Game(this.config); 
    
   
    
  }
    
}
