import Constants from "../Constants";
import Settings from "./SettingsMenu";
import Phaser from "phaser";
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
    // private SettingMenu: Settings;
    private settingUI!: UIScene

    constructor(scene: Phaser.Scene) {
        //console.log('hud iniciado');

        this.currentScene = scene;
        this.width = this.currentScene.cameras.main.width;
        this.height = this.currentScene.cameras.main.height;

        //Get score from scene
        this.score = this.currentScene.registry.get(Constants.HUD.SCORE);

        const screenCenterX = this.currentScene.cameras.main.worldView.x + this.currentScene.cameras.main.width / 2;
        const screenCenterY = this.currentScene.cameras.main.worldView.y + this.currentScene.cameras.main.height / 2;
        const { width } = scene.scale;

        this.container = scene.add.container(screenCenterX - 190, screenCenterY - 125);


        this.create()

        // this.container.add(this.healthTxT)
        this.container.add(this.scoreTXT)
    }


    create() {
        //Event Player Damaged
        this.currentScene.events.on(Constants.EVENTS.SCORE, this.alterScore, this)

        // Contador de puntos
        this.scoreTXT = this.currentScene.add.text(0, 0, 'SCORE:' + this.score, {
            fontSize: '16px', color: '#FFFFFF', fontFamily: 'pixel'
        }).setOrigin(0, 0.5).setScrollFactor(0)

        this.currentScene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.currentScene.events.off(Constants.EVENTS.SCORE)
        })

        // Contador de Tiempo


    }

    alterScore(score: number) {
        this.score = this.score + score

        if (this.score < 0) {
            this.score = 0
        }

        // actualizar Score
        this.currentScene.registry.set(Constants.HUD.SCORE, this.score)
        this.scoreTXT.text = 'SCORE:' + (this.score)


    }

    getCurrentScene() {
        return this.currentScene;
    }

}