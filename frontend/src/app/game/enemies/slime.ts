import Constants from "../Constants";

export default class Slime extends Phaser.Physics.Arcade.Sprite {

    // Attributes 
    private vRun: number = 150
    private maxHealth: number = 40
    private health: number = this.maxHealth

    //Actions & States
    private actions: any = {
        attack: { state: true, duration: 200, cooldown: 400 }
    }
    private allowMove: boolean = true
    private isDead: boolean = false;


    //Current Game Scene
    private currentScene!: Phaser.Scene

    constructor(config: any) {
        super(config.currentScene, config.x, config.y, config.texture);

        this.currentScene = config.currentScene


        //Register Variables
        this.currentScene.registry
            .set(Constants.ENEMIES.SLIME.STATS.MAXHEALTH, this.maxHealth)
        this.currentScene.registry
            .set(Constants.ENEMIES.SLIME.STATS.HEALTH, this.health)

        this.currentScene.physics.world.enable(this)
        this.currentScene.add.existing(this)

    }

    create() {
        this.anims.create({
            key: 'idleSlime',
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'slimeHit',
            frames: this.anims.generateFrameNumbers('slimeHit', { start: 0, end: 4 }),
            frameRate: 20,
            repeat: 0,
        });
    }







}