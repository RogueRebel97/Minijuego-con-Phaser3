import { retry } from "rxjs";
import Constants from "../Constants";

export default class Goblin extends Phaser.Physics.Arcade.Sprite {

    private vRun: number = 120
    private maxHealth: number = 50
    private health: number = this.maxHealth

    //Actions & States
    private actions: any = {
        left: { state: false },
        right: { state: false },
        attack: { state: true, duration: 200, cooldown: 400 },
        damage: { state: false, duration: 500, cooldown: 400 },
    }

    private allowMove: boolean = true
    private isDead: boolean = false;
    private isChasing: boolean = false;
    // private aggro: Phaser.Types.Physics.Arcade.ImageWithDynamicBody



    //Current Game Scene
    private currentScene!: Phaser.Scene

    constructor(config: any) {

        console.log("goblin Creado");

        super(config.currentScene, config.x, config.y, config.texture)

        this.currentScene = config.currentScene
        this.create()

        // Physics
        this.currentScene.physics.world.enable(this)
        this.currentScene.add.existing(this)

        //Field of View
        // this.aggro = this.currentScene.add.rectangle(this.x, this.y, 200, 150, 0xFF0000, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
        // this.currentScene.physics.add.existing(this.aggro)
        // this.aggro.body.setAllowGravity(false)


        this.displayWidth = this.width / 20
        this.displayHeight = this.height / 20
    }


    create() {
        this.createAnimations();
    }



    createAnimations() {

        this.anims.create({
            key: 'goblinIdle',
            frames: this.anims.generateFrameNames('goblinAtlas',
                {
                    prefix: 'goblinTank-idle-',
                    suffix: '.png',
                    end: 7
                }),
            frameRate: 15,
            repeat: -1
        })
    }

    override update() {

        this.anims.play('goblinIdle', true)
        console.log("goblin");

    }
































}