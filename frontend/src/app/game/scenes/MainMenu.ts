import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Angular context
let contexto: any;

@Injectable({
  providedIn: 'root',
})
export class MainMenu extends Phaser.Scene {
  private buttons: Phaser.GameObjects.Image[] = [];
  private selectedButtonIndex = 0;
  private buttonSelector!: Phaser.GameObjects.Image;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;



  constructor() {
    super({ key: 'MainMenu' });
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    console.log('mainMenu Corriendo');
  }
  preload() {
    console.log('mainMenu preload Corriendo');
  }

  create() {
    console.log('mainMenu Create Corriendo');
    this.cameras.main.fadeIn(3000, 0, 0, 0);

    this.add.image(400, 300, 'sky');


    const { width, height } = this.scale;

    // Play button
    const playButton = this.add
      .image(width * 0.5, height * 0.6, 'glass-panel')
      .setDisplaySize(150, 50);

    this.add
      .text(playButton.x, playButton.y, 'Jugar', { color: 'black' })
      .setOrigin(0.5);

    // Settings button
    const settingsButton = this.add
      .image(
        playButton.x,
        playButton.y + playButton.displayHeight + 10,
        'glass-panel'
      )
      .setDisplaySize(150, 50);

    this.add
      .text(settingsButton.x, settingsButton.y, 'Puntuaciones', {
        color: 'black',
      })
      .setOrigin(0.5);

    // Credits button
    const creditsButton = this.add
      .image(
        settingsButton.x,
        settingsButton.y + settingsButton.displayHeight + 10,
        'glass-panel'
      )
      .setDisplaySize(150, 50);

    this.add
      .text(creditsButton.x, creditsButton.y, 'Creditos', { color: 'black' })
      .setOrigin(0.5);

    this.buttons.push(playButton);
    this.buttons.push(settingsButton);
    this.buttons.push(creditsButton);

    this.buttonSelector = this.add.image(0, 0, 'cursor-hand');

    this.selectButton(0);

    playButton.on('selected', () => {
      console.log('play');

      this.scene.start('Scene1');
      this.scene.start('hud');
      this.scene.bringToTop('hud')
      // this.scene.stop('MainMenu');
    });
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      playButton.off('selected');
      settingsButton.off('selected');
      creditsButton.off('selected');
      console.log('EVENTOS CERRADOS');
    });

    settingsButton.on('selected', () => {
      console.log('settings');
    });

    creditsButton.on('selected', () => {
      console.log('credits');
    });

    this.selectNextButton(0);
    this.selectButton(0);
  }

  override update() {
    const pressUp = Phaser.Input.Keyboard.JustDown(this.cursors.up!);
    const pressDown = Phaser.Input.Keyboard.JustDown(this.cursors.down!);
    const pressSpace = Phaser.Input.Keyboard.JustDown(this.cursors.space!);
    console.log('MainMenu Corriendo');



    if (pressUp) {
      this.selectNextButton(-1);
    } else if (pressDown) {
      this.selectNextButton(1);
    } else if (pressSpace) {
      this.confirmSelection();
    }
  }

  selectButton(index: number) {
    console.log('selectButton');

    const currentButton = this.buttons[this.selectedButtonIndex];

    // set the current selected button to a white tint
    currentButton.setTint(0xffffff);

    const button = this.buttons[index];

    // set the newly selected button to a green tint
    button.setTint(0x66ff7f);

    // move the hand cursor to the right edge
    this.buttonSelector.x = button.x + button.displayWidth * 0.5;
    this.buttonSelector.y = button.y + 10;

    // store the new selected index
    this.selectedButtonIndex = index;
  }

  selectNextButton(change = 1) {
    console.log('selecnextButton');

    let index = this.selectedButtonIndex + change;

    // wrap the index to the front or end of array
    if (index >= this.buttons.length) {
      index = 0;
    } else if (index < 0) {
      index = this.buttons.length - 1;
    }

    this.selectButton(index);
  }

  confirmSelection() {
    console.log('confirmSelection');

    // get the currently selected button
    const button = this.buttons[this.selectedButtonIndex];

    // emit the 'selected' event
    button.emit('selected');
  }
}
