import Phaser from "phaser";
import { GameComponent } from "./game.component";
import { LoadingScreen } from "./scenes/LoadingScreen";
import { MainMenu } from "./scenes/MainMenu";
import { Scene1 } from "./scenes/Scene1";
import { ScoreBoard } from "./scenes/ScoreBoard";
import UIScene from "./scenes/UIScene";
import GameOver from "./scenes/GameOver";

import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';


const Config = {
  type: Phaser.AUTO,
  backgroundColor: '#ef9324',
  scene: [LoadingScreen, UIScene, MainMenu, ScoreBoard, Scene1, GameOver],

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
      // debug: true,
    },
  },
  plugins: {
    global: [NineSlicePlugin.DefaultCfg],
  },
};



export default Config;
