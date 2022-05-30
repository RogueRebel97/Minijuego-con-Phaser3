//imports
import * as Phaser from 'phaser';
import { MainMenu } from './MainMenu';
import Settings from './SettingsMenu';
import HUD from './hud';


export default class UIScene extends Phaser.Scene {
  // Propiedades
  private SettingMenu!: Settings;
  private hud!: HUD;
  private ESC!: any




  constructor() {
    super({ key: 'ui-scene' });
  }

  create() {
    //console.log('UI');
    this.SettingMenu = new Settings(this);
    this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


    const { width } = this.scale;
    // Boton de Pausa
    const settingButton = this.add.image(width - 10, 10, 'small_button').setOrigin(1, 0);

    //Icono de boton de pausa
    this.add.image(settingButton.x - settingButton.width * 0.5, settingButton.y + settingButton.height * 0.4, 'option_button').setScale(1);

    settingButton
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => { //Oscurecer al posar el raton
        settingButton.setTint(0xdedede);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => { //Volver a su color al retirar el raton
        settingButton.setTint(0xffffff);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => { // colorear al pulsar
        settingButton.setTint(0xdedede);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {  // reset color
        settingButton.setTint(0xffffff);
        this.pauseResume()
      });




    this.ESC.on('up', () => {
      this.pauseResume()
    })

  }

  override update() {

  }


  pauseResume() {
    if (this.SettingMenu.isOpen) {
      this.SettingMenu.hide(); //Callback for hide
      // Resume Scene
      for (let i = 0; i <= this.scene.manager.scenes.length - 1; i++) {
        if (this.scene.manager.scenes[i].scene.key == 'ui-scene') {
        } else if (this.scene.manager.scenes[i].scene.isPaused()) {
          this.scene.resume(this.scene.manager.scenes[i].scene.key);
        }
      }
    } else {

      this.SettingMenu.show(); //Callback for show
      //Pause Scene
      for (let i = 0; i <= this.scene.manager.scenes.length - 1; i++) {
        if (this.scene.manager.scenes[i].scene.key == 'ui-scene') {
        } else if (this.scene.manager.scenes[i].scene.isActive()) {
          this.scene.pause(this.scene.manager.scenes[i].scene.key);
        }
      }
    }

  }

}
