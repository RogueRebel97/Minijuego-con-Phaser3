//imports
import * as Phaser from "phaser";




//Angular context
let contexto: any;

export default class GameOver extends Phaser.Scene {

    // Propiedades
    private defeatText!: Phaser.GameObjects.Text
    private mainMenuButton!: Phaser.GameObjects.Image;
    private mainMenuText!: Phaser.GameObjects.Text
    private retryButton!: Phaser.GameObjects.Image;
    private retryText!: Phaser.GameObjects.Text
    private glassBckgrnd!: Phaser.GameObjects.Image;

    private container!: Phaser.GameObjects.Container;



    constructor() {
        super({ key: 'gameOver' });
    }

    init() {

    }
    preload() {

    }

    create() {

        const { width, height } = this.scale

        // Glass Background
        this.glassBckgrnd = this.add.image(0, 0, 'glass-panel').setOrigin(0.5, 0.5)
        this.glassBckgrnd.setTint(0x000000)

        let scaleX = this.cameras.main.width / this.glassBckgrnd.width
        let scaleY = this.cameras.main.height / this.glassBckgrnd.height
        let scale = Math.max(scaleX, scaleY)
        this.glassBckgrnd.setScale(scale)
        this.glassBckgrnd.setScale(scale)
        this.glassBckgrnd.setTint(0x000000)



        //Mensaje de Derrota
        this.defeatText = this.add.text(0, 0, 'Derrota', {
            fontFamily: 'Germania One',
            fontSize: '48px',
            color: '#A91A1A',
            stroke: '#121212',
            strokeThickness: 5,
            shadow: { offsetX: 3, offsetY: 5, blur: 1, color: '#454444', fill: true }
        }).setOrigin(0.5, 0.5)

        //Buttons
        this.mainMenuButton = this.add.image(- 80, 80, 'menuButton-1')
        this.mainMenuButton.setScale(0.8)

        this.mainMenuText = this.add.text
            (this.mainMenuButton.x, this.mainMenuButton.y - 10, 'MENU', {
                color: 'black', fontFamily: 'pixel', fontSize: '16px'
            }).setOrigin(0.5, 0)

        this.retryButton = this.add.image(120, 80, 'menuButton-1')
        this.retryButton.setScale(0.8)

        this.retryText = this.add.text
            (this.retryButton.x, this.retryButton.y - 10, 'CONTINUAR', {
                color: 'black', fontFamily: 'pixel', fontSize: '16px'
            }).setOrigin(0.5, 0)


        // container
        this.container = this.add.container(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5 - (this.cameras.main.height + this.glassBckgrnd.height));

        this.container.add(this.glassBckgrnd)
        this.container.add(this.retryButton)
        this.container.add(this.retryText)
        this.container.add(this.mainMenuButton)
        this.container.add(this.mainMenuText)
        this.container.add(this.defeatText)

        // this.tweens.add({
        //     targets: this.container,
        //     y: (this.cameras.main.height * 0.5),
        //     duration: 300,
        //     ease: Phaser.Math.Easing.Sine.InOut,
        // }).complete;

    }



    override update() {

    }





    defeat() {


        //Animacion de desplazamiento para mostrar
        // scene.tweens.add({
        //     targets: this.container,
        //     y: (this.cameras.main.height + this.glassBckgrnd.height),
        //     duration: 300,
        //     ease: Phaser.Math.Easing.Sine.InOut,
        // }).complete;

    }

    win() {

    }

}