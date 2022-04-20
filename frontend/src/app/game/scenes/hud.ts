import Constants from '../Constants';
import * as Phaser from 'phaser';
import Knight from '../character/knight';



export default class HUD extends Phaser.Scene {

    private healthTxT!: Phaser.GameObjects.Text;


    private width!: number;
    private height!: number;
    private currentScene!: Phaser.Scene;

    // scene: Phaser.Scene
    constructor() {
        super('hud')

        // this.currentScene = scene;
    }

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;


        // console.log(this.scene);


    }


    create() {

        console.log(this.registry.get(Constants.REGISTRY.MAXHEALTH));
        console.log(this.registry.get(Constants.REGISTRY.HEALTH));

        const scene: Phaser.Scene = this.scene.get('Scene1')
        scene.events.on(Constants.EVENTS.HEALTH, this.alterHealth, this)

        this.healthTxT = this.add.text(20, 20, this.registry.get(Constants.REGISTRY.HEALTH) + '/' + this.registry.get(Constants.REGISTRY.MAXHEALTH), { fontSize: '32px', color: '#FFFFFF' });

    }

    override update() {


    }


    private alterHealth() {
        this.healthTxT.text = this.registry.get(Constants.REGISTRY.HEALTH) + '/' + this.registry.get(Constants.REGISTRY.MAXHEALTH)
    }





    private alterScore() {

    }
}


