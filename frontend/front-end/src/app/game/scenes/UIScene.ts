//imports
import * as Phaser from 'phaser';
import SettingMenu from './SettingMenu';

//Angular context
let contexto: any;

export class UIScene extends Phaser.Scene {
  // Propiedades
  private settingModal!: SettingMenu;

  constructor() {
    super({ key: 'ui' });
  }

  init() {}
  preload() {}

  create() {
    // this.settingModal = new SettingMenu(this);
    const { width } = this.scale;

    const settingsButton = this.add.image(784, 35, 'small_button');

    this.add.image(
      settingsButton.x - settingsButton.width * 0.5,
      settingsButton.y,
      'option_button'
    );

    settingsButton
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        settingsButton.setTint(0xdedede);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        settingsButton.setTint(0xffffff);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        settingsButton.setTint(0xffffff);
      });
  }

  override update() {}
}
