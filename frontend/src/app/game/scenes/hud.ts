import Constants from "../Constants";
import Settings from "./SettingsMenu";
import Phaser, { Scene } from "phaser";
import UIScene from "./UIScene";


export default class HUD {


    private container!: Phaser.GameObjects.Container;
    private currentScene: Phaser.Scene;
    private scoreTXT!: Phaser.GameObjects.Text;
    private score: number
    private timeTXT!: Phaser.GameObjects.Text;
    private time!: number;
    private width: number;
    private height: number;

    private barMaxWidth!: number;

    private leftShadow!: Phaser.GameObjects.Image;
    private midShadow!: Phaser.GameObjects.Image;
    private rightShadow!: Phaser.GameObjects.Image;

    private leftEnd!: Phaser.GameObjects.Image;
    private midBar!: Phaser.GameObjects.Image;
    private rightEnd!: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene) {
        //console.log('hud iniciado');

        this.currentScene = scene;
        this.width = this.currentScene.cameras.main.width;
        this.height = this.currentScene.cameras.main.height;

        this.barMaxWidth = 100

        //Get score from scene
        this.score = this.currentScene.registry.get(Constants.HUD.SCORE);

        const screenCenterX = this.currentScene.cameras.main.worldView.x + this.currentScene.cameras.main.width / 2;
        const screenCenterY = this.currentScene.cameras.main.worldView.y + this.currentScene.cameras.main.height / 2;
        const { width } = scene.scale;

        this.container = scene.add.container(screenCenterX - 190, screenCenterY - 125);


        this.create(this.currentScene)

        this.container.add(this.scoreTXT)

        this.container.add(this.leftShadow)
        this.container.add(this.midShadow)
        this.container.add(this.rightShadow)

        this.container.add(this.leftEnd)
        this.container.add(this.midBar)
        this.container.add(this.rightEnd)
    }


    create(scene: Scene) {
        //Event Player Damaged
        this.currentScene.events.on(Constants.EVENTS.SCORE, this.alterScore, this)
        this.currentScene.events.on(Constants.EVENTS.HEALTH, this.alterHealthBar, this)

        // Contador de puntos
        this.scoreTXT = this.currentScene.add.text(10, 18, '000', {
            fontSize: '12px', color: '#FFFFFF', fontFamily: 'pixel'
        }).setOrigin(0, 0.5).setScrollFactor(0)

        this.currentScene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.currentScene.events.off(Constants.EVENTS.SCORE)
            this.currentScene.events.off(Constants.EVENTS.HEALTH)
        })

        // Contador de Tiempo

        // Bar Position
        const x = 5
        const y = -5


        // Background shadowBar
        this.leftShadow = scene.add.image(x, y, 'left-cap-shadow')
            .setOrigin(0, 0.5).setScrollFactor(0)

        this.midShadow = scene.add.image(this.leftShadow.x + this.leftShadow.width, y, 'middle-shadow')
            .setOrigin(0, 0.5).setScrollFactor(0)
        this.midShadow.displayWidth = this.barMaxWidth

        this.rightShadow = scene.add.image(this.midShadow.x + this.midShadow.displayWidth, y, 'right-cap-shadow')
            .setOrigin(0, 0.5).setScrollFactor(0)

        //resize shadow
        this.leftShadow.displayHeight = (this.leftShadow.displayHeight) * 0.5
        this.midShadow.displayHeight = (this.midShadow.displayHeight) * 0.5
        this.rightShadow.displayHeight = (this.rightShadow.displayHeight) * 0.5

        // Health Bar
        this.leftEnd = scene.add.image(x, y, 'left-cap')
            .setOrigin(0, 0.5).setScrollFactor(0)

        this.midBar = scene.add.image(this.leftEnd.x + this.leftEnd.width, y, 'middle')
            .setOrigin(0, 0.5).setScrollFactor(0)



        this.rightEnd = scene.add.image(this.midBar.x + this.midBar.displayWidth, y, 'right-cap')
            .setOrigin(0, 0.5).setScrollFactor(0)

        //resize bar
        this.leftEnd.displayHeight = (this.leftEnd.displayHeight) * 0.5
        this.midBar.displayHeight = (this.midBar.displayHeight) * 0.5
        this.rightEnd.displayHeight = (this.rightEnd.displayHeight) * 0.5

        this.setPercentage(1)

    }





    alterScore(score: number) {
        this.score = this.score + score
        // console.log(this.score);

        if (this.score < 0) {
            this.score = 0
        }

        // actualizar Score
        this.currentScene.registry.set(Constants.HUD.SCORE, this.score)

        if (this.score > 9 && this.score < 100) {
            this.scoreTXT.text = '0' + (this.score)


        }
        else if (this.score >= 0 && this.score < 10) {
            this.scoreTXT.text = '00' + (this.score)

        } else {
            this.scoreTXT.text = (this.score).toString()

        }


    }

    getCurrentScene() {
        return this.currentScene;
    }


    setPercentage(percent = 1) {

        const width = this.barMaxWidth * percent

        this.midBar.displayWidth = width
        this.rightEnd.x = this.midBar.x + this.midBar.displayWidth
    }

    alterHealthBar(percent = 1, duration = 1000) {
        let health = this.currentScene.registry.get(Constants.PLAYER.STATS.HEALTH)
        // console.log("health: " + health);
        percent = health / 100;


        const width = this.barMaxWidth * percent

        this.currentScene.tweens.add({
            targets: this.midBar,
            displayWidth: width,
            duration,
            ease: Phaser.Math.Easing.Sine.Out,
            onUpdate: () => {
                this.rightEnd.x = this.midBar.x + this.midBar.displayWidth

                this.leftEnd.visible = this.midBar.displayWidth > 0
                this.midBar.visible = this.midBar.displayWidth > 0
                this.rightEnd.visible = this.midBar.displayWidth > 0
            }
        })
    }

}