import Constants from "../Constants";
import SettingsMenu from "./SettingsMenu";
import Phaser from "phaser";


export default class HUD {


    private container!: Phaser.GameObjects.Container;
    private activeScene: Phaser.Scene;
    private healthTxT!: Phaser.GameObjects.Text;
    private panel: any
    private width: number;
    private height: number;





    constructor(scene: Phaser.Scene) {

        this.activeScene = scene;
        this.width = this.activeScene.cameras.main.width;
        this.height = this.activeScene.cameras.main.height;


        const screenCenterX = this.activeScene.cameras.main.worldView.x + this.activeScene.cameras.main.width / 2;
        const screenCenterY = this.activeScene.cameras.main.worldView.y + this.activeScene.cameras.main.height / 2;
        const { width } = scene.scale;

        this.container = scene.add.container(width - 200, screenCenterY - 250);

        this.panel = scene.add.nineslice(0, 0, 340, 250, 'setting_panel', 24).setOrigin(0.5, 0).setScrollFactor(0);
        this.create()

        // // this.activeScene.events.on(Constants.EVENTS.HEALTH, this.alterHealth, this)

        // const healthTxT = scene.add.text
        //     ((panel.x - (panel.width / 2)) + 10, panel.y + 10,
        //         this.activeScene.registry.get(Constants.REGISTRY.HEALTH) + '/' + this.activeScene.registry.get(Constants.REGISTRY.MAXHEALTH),
        //         { fontSize: '32px', color: '#FFFFFF', fontFamily: 'pixel' }).setScrollFactor(0);









        this.container.add(this.panel)
        this.container.add(this.healthTxT)




    }


    create() {
        this.activeScene.events.on(Constants.EVENTS.HEALTH, this.alterHealth, this)

        this.healthTxT = this.activeScene.add.text
            ((this.panel.x - (this.panel.width / 2)) + 10, this.panel.y + 10,
                this.activeScene.registry.get(Constants.REGISTRY.HEALTH) + '/' + this.activeScene.registry.get(Constants.REGISTRY.MAXHEALTH),
                { fontSize: '32px', color: '#FFFFFF', fontFamily: 'pixel' }).setScrollFactor(0);




    }

    alterHealth() {
        this.healthTxT.text = this.activeScene.registry.get(Constants.REGISTRY.HEALTH) + '/' + this.activeScene.registry.get(Constants.REGISTRY.MAXHEALTH)
    }




}