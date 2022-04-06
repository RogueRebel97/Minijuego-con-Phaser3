//imports
import * as Phaser from 'phaser';
import { MainMenu } from './MainMenu';
import Settings from './Settings';

//Angular context
let contexto: any;

export default class UIScene extends Phaser.Scene {
  // Propiedades
  private SettingMenu!: Settings;

  constructor() {
    super({ key: 'ui-scene' });
  }

  create() {
    console.log('UI');
    this.SettingMenu = new Settings(this);

    const { width } = this.scale;

    const settingButton = this.add
      .image(width - 10, 10, 'small_button')
      .setOrigin(1, 0);

    this.add
      .image(
        settingButton.x - settingButton.width * 0.5,
        settingButton.y + settingButton.height * 0.5,
        'option_button'
      )
      .setScale(1);

    settingButton
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        settingButton.setTint(0xdedede);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        settingButton.setTint(0xffffff);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        settingButton.setTint(0x8afbff);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        settingButton.setTint(0xffffff);
        if (this.SettingMenu.isOpen) {
          this.SettingMenu.hide();
          // Resume Scene
          for (let i = 0; i <= this.scene.manager.scenes.length - 1; i++) {
            // console.log('Escena: ' + this.scene.manager.scenes[i].scene.key);
            if (this.scene.manager.scenes[i].scene.key == 'ui-scene') {
            } else {
              this.scene.resume(this.scene.manager.scenes[i].scene.key);
            }
          }
        } else {
          //Pause Scene
          this.SettingMenu.show();
          for (let i = 0; i <= this.scene.manager.scenes.length - 1; i++) {
            // console.log('Escena: ' + this.scene.manager.scenes[i].scene.key);
            if (this.scene.manager.scenes[i].scene.key == 'ui-scene') {
            } else {
              this.scene.pause(this.scene.manager.scenes[i].scene.key);
            }
          }
        }
      });
  }

  override update() {}
}
