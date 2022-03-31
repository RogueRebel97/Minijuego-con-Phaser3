import { Game, Scene } from "phaser";

export class Scene1 extends Phaser.Scene {
  // Propiedades

  constructor() {
    super({ key: 'Scene1' });
  }
 
  // init, preload, create, update
  init() {}

  
  preload() {
    this.load.image('star', 'assets/graphics/star.png');
    
  }

  create() {
   var star = this.add.image(400, 300, 'star').setInteractive();

   star.on('pointerdown',(pointer: any) =>{
     console.log("me estas pulsando");
     
    // this.scene.stop;
    console.log("cambio de escena");
    
    this.scene.start("MainMenu");
   });


  }

  override update() {}


}


