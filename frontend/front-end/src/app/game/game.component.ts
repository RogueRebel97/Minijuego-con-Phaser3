import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { MainMenu } from './scenes/MainMenu';
import { Scene1 } from './scenes/Scene1';
import { LoadingScreen } from './scenes/LoadingScreen';
import { UserService } from '../user/user.service';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})


export class GameComponent implements OnInit {
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  private score:number=0;

  constructor() {
   
    this.config = {
   type:Phaser.AUTO,
   backgroundColor: "#125555",
   scene:[Scene0, MainMenu, Scene1],
  
   parent:'gameScreen',
   scale: {
    width:800,
    height:600,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
    };
  }

  
   

  ngOnInit(): void {
      this.phaserGame = new Phaser.Game(this.config); 
    
  }
  
}




export class Scene0 extends Phaser.Scene{
 

}