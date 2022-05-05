import Constants from "../Constants";
import Settings from "./SettingsMenu";
import Phaser from "phaser";
import UIScene from "./UIScene";


export default class HUD {


    private container!: Phaser.GameObjects.Container;
    private activeScene: Phaser.Scene;
    private healthTxT!: Phaser.GameObjects.Text;
    private width: number;
    private height: number;
    // private SettingMenu: Settings;
    private settingUI!: UIScene

    constructor(scene: Phaser.Scene) {
        this.activeScene = scene;
        this.width = this.activeScene.cameras.main.width;
        this.height = this.activeScene.cameras.main.height;

        const screenCenterX = this.activeScene.cameras.main.worldView.x + this.activeScene.cameras.main.width / 2;
        const screenCenterY = this.activeScene.cameras.main.worldView.y + this.activeScene.cameras.main.height / 2;
        const { width } = scene.scale;

        this.container = scene.add.container(width, screenCenterY - 250);


        this.create()

        this.container.add(this.healthTxT)
    }


    create() {
        this.activeScene.events.on(Constants.EVENTS.HEALTH, this.alterHealth, this)

        this.healthTxT = this.activeScene.add.text
            ((this.container.width / 2) - 750, this.height - 625,
                this.activeScene.registry.get(Constants.PLAYER.STATS.HEALTH) + '/' + this.activeScene.registry.get(Constants.PLAYER.STATS.MAXHEALTH),
                { fontSize: '24px', color: '#FFFFFF', fontFamily: 'pixel' }).setScrollFactor(0);


        this.activeScene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.activeScene.events.off(Constants.EVENTS.HEALTH)
        })


    }

    alterHealth() {
        this.healthTxT.text = this.activeScene.registry.get(Constants.PLAYER.STATS.HEALTH) + '/' + this.activeScene.registry.get(Constants.PLAYER.STATS.MAXHEALTH)
    }


    getCurrentScene() {
        return this.activeScene;
    }

}