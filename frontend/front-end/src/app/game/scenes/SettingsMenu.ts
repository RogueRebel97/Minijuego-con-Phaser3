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

  private open = false;

  //Funcion booleana para comprobar si el menu esta desplegado o no.
  get isOpen() {
    return this.open;
  }

  constructor(escena: any) {
    this.activeScene = escena;
    const { width } = escena.scale;

    this.container = escena.add.container(width + 300, 100);
    const panel = escena.add
      .nineslice(0, 0, 200, 80, 'setting_panel', 24)
      .setOrigin(1, 0);

    const toggleButton = escena.add
      .image(-panel.width + 10, 15, 'small_button')
      .setOrigin(0, 0);

    this.checkmark = escena.add.image(
      toggleButton.x + toggleButton.width * 0.5,
      toggleButton.y + toggleButton.height * 0.5,
      'checkmark'
    );

    const text = escena.add.text(
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

  // Mostrar y Ocultar Menu
  show() {
    if (this.open) {
      return;
    }

    const { width, height } = this.activeScene.scale;

    //Animacion de desplazamiento para mostrar
    this.activeScene.tweens.add({
      targets: this.container,
      x: width - 10,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    this.open = true;
  }
  hide() {
    if (!this.open) {
      return;
    }
    const { width, height } = this.activeScene.scale;

    //Animacion de desplazamiento para ocultar
    this.activeScene.tweens.add({
      targets: this.container,
      x: width + 300,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

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

  // funcion para pausar
  pause(key: string) {
    this.show();
  }

  resume(key: string) {
    this.hide();
  }
}
