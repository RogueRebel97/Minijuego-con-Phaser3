//imports
import * as Phaser from 'phaser';
import UIScene from './UIScene';

//Angular context
let contexto: any;

export default class SettingsMenu {
  // Propiedades
  private activeScene!: Phaser.Scene;
  private container!: Phaser.GameObjects.Container;
  private checkmark!: Phaser.GameObjects.Image;
  private panel: any
  // private cross: Phaser.GameObjects.Image;
  private pauseBackground!: Phaser.GameObjects.Rectangle


  private pauseText: Phaser.GameObjects.Text
  private resumeButton: Phaser.GameObjects.Image
  private resumeText: Phaser.GameObjects.Text;
  private optionButton: Phaser.GameObjects.Image;
  private optionText: Phaser.GameObjects.Text
  private backToMenuButton: Phaser.GameObjects.Image;
  private backText: Phaser.GameObjects.Text
  private resetButton: Phaser.GameObjects.Image
  private resetText: Phaser.GameObjects.Text;
  private open = false;

  private width: number;
  private height: number;

  //Funcion booleana para comprobar si el menu esta desplegado o no.
  get isOpen() {
    return this.open;
  }

  constructor(scene: Phaser.Scene) {


    this.activeScene = scene;

    const screenCenterX = this.activeScene.cameras.main.worldView.x + this.activeScene.cameras.main.width / 2;
    const screenCenterY = this.activeScene.cameras.main.worldView.y + this.activeScene.cameras.main.height / 2;
    const { width } = scene.scale;

    this.width = this.activeScene.cameras.main.width;
    this.height = this.activeScene.cameras.main.height;


    this.pauseBackground = this.activeScene.add.rectangle(screenCenterX, screenCenterY, this.width, this.height, 0xff0000, 0)
    this.container = scene.add.container(width + 300, screenCenterY - 250); // Comienza escondido en la Derecha (width+300)
    this.panel = scene.add.nineslice(0, 0, 340, 340, 'setting_panelv2', 24).setOrigin(0.5, 0); // origen en el medio


    this.pauseText = scene.add.text
      ((this.panel.x - (this.panel.width / 2)) + 10, this.panel.y + 10, 'PAUSA',
        { color: 'black', fontFamily: 'pixel', fontSize: '24px' });

    // this.cross = scene.add.image((this.panel.x - (this.panel.width / 2)) + 317, this.panel.y + 20, 'cross')




    this.resumeButton = scene.add.image
      (this.panel.x / 2, this.panel.y + 80, 'menuButton-1')

    this.resumeText = scene.add.text
      (this.resumeButton.x / 2, this.resumeButton.y - 10, 'RESUME', {
        color: 'black', fontFamily: 'pixel', fontSize: '18px'
      }).setOrigin(0.5, 0);


    this.optionButton = scene.add.image
      (this.panel.x / 2, this.resumeButton.y + 69, 'menuButton-1')

    this.optionText = scene.add.text
      (this.optionButton.x / 2, this.optionButton.y - 10, 'OPTIONS', {
        color: 'black', fontFamily: 'pixel', fontSize: '18px'
      }).setOrigin(0.5, 0);



    this.backToMenuButton = scene.add.image
      (this.panel.x / 2, this.optionButton.y + 69, 'menuButton-1')

    this.backText = scene.add.text
      (this.backToMenuButton.x / 2, this.backToMenuButton.y - 10, 'MAIN MENU', {
        color: 'black', fontFamily: 'pixel', fontSize: '18px'
      }).setOrigin(0.5, 0);

    this.resetButton = scene.add.image
      (this.panel.x / 2, this.backToMenuButton.y + 69, 'menuButton-1')
    this.resetText = scene.add.text(this.resetButton.x / 2, this.resetButton.y - 10, 'RESET', {
      color: 'black', fontFamily: 'pixel', fontSize: '18px'
    }).setOrigin(0.5, 0);


    // const toggleButton = scene.add
    //   .image(-panel.width + 10, 250, 'small_button')
    //   .setOrigin(0, 0);

    // this.checkmark = scene.add.image(
    //   toggleButton.x + toggleButton.width * 0.5,
    //   toggleButton.y + toggleButton.height * 0.5,
    //   'checkmark'
    // );

    // const soundText = scene.add.text(
    //   toggleButton.x + toggleButton.width + 10,
    //   toggleButton.y + 14,
    //   'Sonido',
    //   {
    //     color: 'black',
    //     fontFamily: 'pixel',
    //     fontSize: '14px',
    //   }
    // );


    // this.container.add(this.pauseBackground);
    this.container.add(this.panel);
    this.container.add(this.pauseText);
    // this.container.add(this.cross);
    this.container.add(this.resetButton)
    this.container.add(this.resumeButton)
    this.container.add(this.resumeText)
    this.container.add(this.optionButton)
    this.container.add(this.optionText)
    this.container.add(this.backToMenuButton)
    this.container.add(this.backText)
    this.container.add(this.resetButton)
    this.container.add(this.resetText)

    // this.container.add(toggleButton);
    // this.container.add(this.checkmark);
    // this.container.add(soundText);
    // this.container.add(restartButton);

    // toggleButton
    //   .setInteractive()
    //   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
    //     toggleButton.setTint(0xe0e0e0);
    //   })
    //   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
    //     toggleButton.setTint(0xffffff);
    //   })
    //   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
    //     toggleButton.setTint(0xffffff);

    //     this.toggleSound();
    //   });



    this.actionButton(this.resumeButton, 1)
    this.actionButton(this.optionButton, 2)
    this.actionButton(this.backToMenuButton, 3)
    this.actionButton(this.resetButton, 4)

    // this.cross.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
    //   this.resume()
    // })
    // this.resetButton.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {

    //   for (let i = 0; i <= this.activeScene.scene.manager.scenes.length - 1; i++) {

    //     if (this.activeScene.scene.manager.scenes[i].scene.key == 'ui-scene') {

    //     } else if (this.activeScene.scene.manager.scenes[i].scene.isPaused()) {
    //       this.activeScene.scene.stop(this.activeScene.scene.manager.scenes[i].scene.key);
    //       this.activeScene.scene.start(this.activeScene.scene.manager.scenes[i].scene.key);
    //     }
    //   }
    // })

  }

  // Mostrar y Ocultar Menu
  show() {

    const { width, height } = this.activeScene.scale;
    if (this.open) {
      return;
    }
    this.pauseBackground.strokeAlpha = 0.5 //Rectangle 


    //Animacion de desplazamiento para mostrar
    this.activeScene.tweens.add({
      targets: this.container,
      x: (width / 2),
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    }).complete;


    this.open = true;

  }

  hide() {
    if (!this.open) {
      return;
    }
    const { width, height } = this.activeScene.scale;
    this.pauseBackground.strokeAlpha = 0 //rectangle

    //Animacion de desplazamiento para ocultar
    this.activeScene.tweens.add({
      targets: this.container,
      x: width + 300,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    console.log(this.pauseBackground.alpha);
    this.open = false;

  }
  // Fin Mostrar y ocultar Menu

  // Funcion para Sonido
  private toggleSound() {
    let isMute = this.checkmark.visible;

    isMute = !isMute;

    this.activeScene.sound.mute = isMute;

    this.checkmark.visible = isMute;
  }

  resume() {
    if (this.isOpen) {
      this.hide();

      // Resume Scene
      for (let i = 0; i <= this.activeScene.scene.manager.scenes.length - 1; i++) {
        if (this.activeScene.scene.manager.scenes[i].scene.key == 'ui-scene') {
        } else if (this.activeScene.scene.manager.scenes[i].scene.isPaused()) {
          this.activeScene.scene.resume(this.activeScene.scene.manager.scenes[i].scene.key);
        }
      }
    }
  }

  // funcion para pausar
  // pause(key: string) {
  //   this.show();
  // }

  // resume(key: string) {
  //   this.hide();
  // }


  showBackground() {
    this.pauseBackground.setAlpha(1)
  }
  hideBackground() {
    this.pauseBackground.setAlpha(0.1)
  }

  actionButton(button: Phaser.GameObjects.Image, id: number) {

    button.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
      button.setTint(0xe0e0e0);
    })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        button.setTint(0xffffff);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        button.setTint(0xe0e0e0);
        button.setTexture('menuButton-2')


      }).on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        button.setTint(0xffffff);
        button.setTexture('menuButton-1')

        switch (id) {
          case 1:
            console.log(id);
            this.resume()
            break;
          case 2:
            console.log(id)
            break;
          case 3:
            console.log(id)
            this.backToMenu()
            break;
          case 4:
            console.log(id)
            this.reset()
            break;
          default:
            return

        }
      })
  }

  backToMenu() {

    for (let i = 0; i <= this.activeScene.scene.manager.scenes.length - 1; i++) {
      if (this.activeScene.scene.manager.scenes[i].scene.key == 'ui-scene') {
      } else if (this.activeScene.scene.manager.scenes[i].scene.isActive()) {
        this.activeScene.scene.stop(this.activeScene.scene.manager.scenes[i].scene.key);
      }
    }
    this.activeScene.scene.start('MainMenu')
    this.activeScene.scene.bringToTop('MainMenu')
  }



  reset() {
    for (let i = 0; i <= this.activeScene.scene.manager.scenes.length - 1; i++) {

      if (this.activeScene.scene.manager.scenes[i].scene.key == 'ui-scene') {
        console.log("do nothing");

      } else if (this.activeScene.scene.manager.scenes[i].scene.isPaused()) {

        console.log(this.activeScene.scene.manager.scenes[i].scene);
        console.log("reseteando");

        this.activeScene.cameras.main.fadeOut(600, 0, 0, 0)
        this.activeScene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam: any, effect: any) => {

            this.activeScene.scene.stop(this.activeScene.scene.manager.scenes[i].scene.key);
            this.activeScene.scene.start(this.activeScene.scene.manager.scenes[i].scene.key);
          })

      }
    }
  }

}
