import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScoreBoardScene } from './ScoreBoard';

// Angular context
let contexto: any;

@Injectable({
  providedIn: 'root',
})
export class MainMenu extends Phaser.Scene {
  private buttons!: Phaser.GameObjects.Image[]; //Array de botones
  private selectedButtonIndex = 0; //Boton seleccionado


  // Key controls
  private controls!: any;

  private img!: Phaser.GameObjects.TileSprite
  private img2!: Phaser.GameObjects.TileSprite
  private img3!: Phaser.GameObjects.TileSprite

  private plainTexture!: Phaser.Textures.Texture


  constructor() {
    super({ key: 'MainMenu' });


  }

  init() {

    //console.log('mainMenu Corriendo');

    this.buttons = []

  }

  create() {
    //console.log('mainMenu Create Corriendo');

    //console.log("indice boton seleccionado: " + this.selectedButtonIndex);


    ///Controls
    this.controls = this.input.keyboard.addKeys({
      'UP': Phaser.Input.Keyboard.KeyCodes.UP,
      'DOWN': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'W': Phaser.Input.Keyboard.KeyCodes.W,
      'S': Phaser.Input.Keyboard.KeyCodes.S,
      'SPACE': Phaser.Input.Keyboard.KeyCodes.SPACE,
      'ENTER': Phaser.Input.Keyboard.KeyCodes.ENTER
    })

    const width = this.scale.width
    const height = this.scale.height

    this.cameras.main.fadeIn(3000, 0, 0, 0);

    //Get textures
    const plainsTexture = this.textures.getFrame('plainsSky');


    //Initialice BG = Bioma1 Plains
    this.img = this.add.tileSprite(0, 0, width, height, 'plainsSky')
      .setOrigin(0).setTileScale(width / plainsTexture.width, height / plainsTexture.height)

    this.img2 = this.add.tileSprite(0, 0, width, height, 'plainsBG1')
      .setOrigin(0).setTileScale(width / plainsTexture.width, height / plainsTexture.height)

    this.img3 = this.add.tileSprite(0, 0, width, height, 'plainsBG2')
      .setOrigin(0).setTileScale(width / plainsTexture.width, height / plainsTexture.height)

    // Glass Panel
    const glassPanel = this.add.image(width * 0.5, height * 0.6, 'glass-panel_Corners')
      .setDisplaySize(300, 280)

    // Buttons:
    this.createButtons()

    // Boton seleccionado por defecto
    this.selectButton(0)

  }

  override update() {
    //console.log('MainMenu Corriendo');

    let key = Phaser.Input.Keyboard;

    // BG movement
    this.img2.tilePositionX += 0.2
    this.img3.tilePositionX += 0.5

    //Menu Controls

    if (key.JustDown(this.controls.W) || key.JustDown(this.controls.UP)) {
      this.selectNextButton(-1)



    } else if (key.JustDown(this.controls.S) || key.JustDown(this.controls.DOWN)) {
      this.selectNextButton(1)


    } else if (key.JustDown(this.controls.SPACE) || key.JustDown(this.controls.ENTER)) {
      this.confirmSelection()

    }

  }


  createButtons() {
    const width = this.scale.width
    const height = this.scale.height

    // Play button
    const playButton = this.add
      .image(width * 0.5, height * 0.5, 'red_button1')

    this.actionButton(playButton, 1)

    //Play Text
    this.add
      .text(playButton.x, playButton.y, 'JUGAR', { color: 'black', fontFamily: 'pixel' })
      .setOrigin(0.5);

    // ScoreBoard button
    const scoreButton = this.add
      .image(
        playButton.x,
        playButton.y + playButton.displayHeight + 10,
        'red_button1'
      )
    this.actionButton(scoreButton, 2)

    // ScoreBoard Text
    this.add
      .text(scoreButton.x, scoreButton.y, 'PUNTUACION', {
        color: 'black', fontFamily: 'pixel'
      })
      .setOrigin(0.5);

    // Credits button
    const creditsButton = this.add
      .image(
        scoreButton.x,
        scoreButton.y + scoreButton.displayHeight + 10,
        'red_button1'
      )
    this.actionButton(creditsButton, 3)

    //Credits text
    this.add
      .text(creditsButton.x, creditsButton.y, 'CREDITOS', { color: 'black', fontFamily: 'pixel' })
      .setOrigin(0.5);

    this.buttons.push(playButton);
    this.buttons.push(scoreButton);
    this.buttons.push(creditsButton);

    //console.log(this.buttons);

    //Event Listeners
    playButton.on('selected', () => {
      //console.log('jugar');
      this.scene.start('Scene1')
    })

    scoreButton.on('selected', () => {
      //console.log('scoreboard')
      this.scene.start('ScoreBoard')
    })

    creditsButton.on('selected', () => {
      //console.log('credits')
      this.scene.start('Credits')
    })

    //Limpiar Eventos
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      playButton.off('selected')
      creditsButton.off('selected')
      creditsButton.off('selected')

    })


  }

  selectButton(index: number) {
    //console.log(`selectedButton: ${index}`);

    // Boton seleccionado, por defecto es indice 0
    const currentButton = this.buttons[this.selectedButtonIndex]


    currentButton.setTint(0xffffff);

    const button = this.buttons[index]


    button.setTint(0x66ff7f);

    // guardar el indice del boton actual en Indice de boton seleccionado
    this.selectedButtonIndex = index
  }

  selectNextButton(change = 1) {

    // i = boton seleccionado +1 o -1 depende de si es Arriba o Abajo
    let index = this.selectedButtonIndex + change

    //Mantener index dentro de los limites
    if (index >= this.buttons.length) {
      index = 0
    }
    else if (index < 0) {
      index = this.buttons.length - 1
    }

    //llamar a selectButton
    this.selectButton(index)
  }

  confirmSelection() {
    // Boton seleccionado actualmente
    const button = this.buttons[this.selectedButtonIndex]

    button.emit('selected')
  }


  changeBioma() {
    // ToDo Change backgrounds every 10s
  }

  actionButton(button: Phaser.GameObjects.Image, id?: number) {

    button.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
      button.setTint(0x66ff7f);
    })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        button.setTint(0xffffff);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        button.setTint(0x66ff7f);
        button.setTexture('red_button2')


      }).on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        button.setTint(0xffffff);
        button.setTexture('red_button3')

        switch (id) {
          case 1:
            //console.log(id);
            this.scene.start('Scene1')
            break;
          case 2:
            //console.log(id)
            this.scene.start('ScoreBoard')
            break;
          case 3:
            //console.log(id)
            this.scene.start('Credits')
            break;
          case 4:
            //console.log(id)

            break;
          default:
            return

        }
      })
  }

}
