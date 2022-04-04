import { Game, Scene } from "phaser";

export class Scene1 extends Phaser.Scene {
  // Propiedades

  constructor() {
    super({ key: 'Scene1' });
  }
 
  // init, preload, create, update
  init() {console.log("Scene1 Corriendo");}

  
  preload() {
   
    
  }

  create() {
   var star = this.add.image(400, 300, 'star').setInteractive();

   star.on('pointerdown',(pointer: any) =>{
     console.log("me estas pulsando");
     
    // this.scene.stop;
   
    
    // this.scene.start("MainMenu");
    this.scene.start('MainMenu')
    
    
    
   });


  }

  override update() { }
 

}


