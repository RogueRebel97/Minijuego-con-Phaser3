//imports
import * as Phaser from 'phaser';

//Angular context
let contexto: any;

export default class Settings {
  // Propiedades
  private activeScene!: Phaser.Scene;
  private container!: Phaser.GameObjects.Container;
  private checkmark!: Phaser.GameObjects.Image;

  private open = false;

  get isOpen() {
    return this.open;
  }

  constructor(scene: Phaser.Scene) {
    this.activeScene = scene;
    const { width } = scene.scale;

    this.container = scene.add.container(width + 300, 100);
    const panel = scene.add
      .nineslice(0, 0, 200, 80, 'setting_panel', 24)
      .setOrigin(1, 0);

    const toggleButton = scene.add
      .image(-panel.width + 10, 15, 'small_button')
      .setOrigin(0, 0);

    this.checkmark = scene.add.image(
      toggleButton.x + toggleButton.width * 0.5,
      toggleButton.y + toggleButton.height * 0.5,
      'checkmark'
    );

    const text = scene.add.text(
      toggleButton.x + toggleButton.width + 10,
      toggleButton.y + 14,
      'Sonido',
      {
        color: 'black',
        fontFamily: 'pixel',
        fontSize: '14px',
      }
    );

    this.container.add(panel);
    this.container.add(toggleButton);
    this.container.add(this.checkmark);
    this.container.add(text);

    toggleButton
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        toggleButton.setTint(0xe0e0e0);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        toggleButton.setTint(0xffffff);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        toggleButton.setTint(0xffffff);

        this.toggleSound();
      });
  }

  show() {
    console.log('abrir');
    if (this.open) {
      console.log('abierto');
      return;
    }
    const { width, height } = this.activeScene.scale;

    this.activeScene.tweens.add({
      targets: this.container,
      x: width - 10,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
    this.open = true;
  }
  hide() {
    console.log('esconder');

    if (!this.open) {
      console.log('cerrado');
      return;
    }
    const { width, height } = this.activeScene.scale;

    this.activeScene.tweens.add({
      targets: this.container,
      x: width + 300,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
    this.open = false;
  }

  private toggleSound() {
    let isMute = this.checkmark.visible;

    isMute = !isMute;

    this.activeScene.sound.mute = isMute;

    this.checkmark.visible = isMute;
  }
}
