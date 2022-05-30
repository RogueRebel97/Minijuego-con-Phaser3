//imports
import * as Phaser from "phaser";
import Constants from '../Constants';




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

    private countdown!: Phaser.GameObjects.Text
    private timer!: number
    private timedEvent!: any



    constructor() {
        super({ key: 'gameOver' });
    }


    create(data: { defeat: boolean }) {

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

        // container
        this.container = this.add.container
            (this.cameras.main.width * 0.5, this.cameras.main.height * 0.5 - (this.cameras.main.height + this.glassBckgrnd.height));

        this.container.add(this.glassBckgrnd)
        //Mensaje de GAME OVER
        if (data.defeat) {

            this.timer = 10;
            //DERROTA
            this.defeatText = this.add.text(10, 0, 'DERROTA', {
                fontFamily: 'pixel',
                fontSize: '48px',
                color: '#A91A1A',
                stroke: '#121212',
                strokeThickness: 5
            }).setOrigin(0.5, 0.5)
            this.container.add(this.defeatText)

            //Menu Button
            this.mainMenuButton = this.add.image(- 80, 80, 'menuButton-1')
            this.mainMenuButton.setScale(0.8)

            this.mainMenuText = this.add.text
                (this.mainMenuButton.x, this.mainMenuButton.y - 10, 'MENU', {
                    color: 'black', fontFamily: 'pixel', fontSize: '16px'
                }).setOrigin(0.5, 0)
            this.container.add(this.mainMenuButton)
            this.container.add(this.mainMenuText)

            // Continue Button
            this.retryButton = this.add.image(120, 80, 'menuButton-1')
            this.retryButton.setScale(0.8)

            this.retryText = this.add.text
                (this.retryButton.x, this.retryButton.y - 10, 'CONTINUAR', {
                    color: 'black', fontFamily: 'pixel', fontSize: '16px'
                }).setOrigin(0.5, 0)

            // Countdown
            this.countdown = this.add.text(10, 185, '' + this.timer, {
                fontFamily: 'pixel',
                fontSize: '48px',
                color: '#FFFFFF',
                stroke: '#121212',
                strokeThickness: 5,
            }).setOrigin(0.5, 0.5)

            this.container.add(this.countdown)
            this.container.add(this.defeatText)
            this.container.add(this.retryButton)
            this.container.add(this.retryText)

            this.actionButton(this.mainMenuButton, 2)
            this.actionButton(this.retryButton, 1);

            this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

        } else if (!data.defeat) {

            //VICTORIA
            this.defeatText = this.add.text(0, 0, 'VICTORIA', {
                fontFamily: 'pixel',
                fontSize: '48px',
                color: '#FFD700',
                stroke: '#121212',
                strokeThickness: 5,
                shadow: { offsetX: 3, offsetY: 5, blur: 1, color: '#454444', fill: true }
            }).setOrigin(0.5, 0.5)
            this.container.add(this.defeatText)

            // Next Level
            this.retryButton = this.add.image(0, 80, 'menuButton-1')
            this.retryButton.setScale(0.8)

            this.retryText = this.add.text
                (this.retryButton.x, this.retryButton.y - 10, 'AVANZAR', {
                    color: 'black', fontFamily: 'pixel', fontSize: '16px'
                }).setOrigin(0.5, 0)
            this.container.add(this.retryButton)
            this.container.add(this.retryText)
            this.actionButton(this.retryButton, 1);
        }

        // Animacion de Derrota
        this.tweens.add({
            targets: this.container,
            y: (this.cameras.main.height * 0.5),
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut,
        }).complete;




    }



    override update() {
        //console.log("Gameover Corriendo");





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
                        //console.log(id);
                        this.reset()
                        break;
                    case 2:
                        //console.log(id)
                        this.backToMenu()
                        break;
                    default:
                        return

                }
            })
    }


    backToMenu() {
        //pausar escena activa
        for (let i = 0; i <= this.scene.manager.scenes.length - 1; i++) {
            if (this.scene.manager.scenes[i].scene.key == 'gameOVer') {
            } else if (this.scene.manager.scenes[i].scene.isActive()) {
                this.scene.stop(this.scene.manager.scenes[i].scene.key);
            }
        }
        this.scene.start('MainMenu')
        this.scene.bringToTop('MainMenu')
    }

    reset() {
        for (let i = 0; i <= this.scene.manager.scenes.length - 1; i++) {

            if (this.scene.manager.scenes[i].scene.key == 'gameOver') {

            } else if (this.scene.manager.scenes[i].scene.isActive()) {

                this.cameras.main.fadeOut(600, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
                    (cam: any, effect: any) => {

                        this.scene.stop(this.scene.manager.scenes[i].scene.key);
                        this.scene.start(this.scene.manager.scenes[i].scene.key);
                    })

            }
        }
    }

    onEvent() {
        if (this.timer > 0) {
            this.timer -= 1;
            this.countdown.setText(this.timer.toString());
        } else {

            this.time.addEvent({ delay: 1000, callback: this.backToMenu, callbackScope: this, loop: true });

        }

    }
}

