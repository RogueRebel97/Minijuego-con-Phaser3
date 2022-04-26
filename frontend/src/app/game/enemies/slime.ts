import Constants from "../Constants";

export default class Slime extends Phaser.Physics.Arcade.Sprite {

    // Attributes 
    private vRun: number = 150
    private maxHealth: number = 40
    private health: number = this.maxHealth

    private dmg: number = 10;

    //Actions & States
    private actions: any = {
        attack: { state: true, duration: 200, cooldown: 400 },
        damage: { state: true, duration: 300, cooldown: 1000 }
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


        // Physics
        this.currentScene.physics.world.enable(this)
        this.currentScene.add.existing(this)

    }

    create() {


        this.anims.create({
            key: Constants.ENEMIES.SLIME.ANIMATIONS.IDLE,
            frames: this.anims.generateFrameNumbers(Constants.ENEMIES.SLIME.ID, { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: Constants.ENEMIES.SLIME.ANIMATIONS.HIT,
            frames: this.anims.generateFrameNumbers(Constants.ENEMIES.SLIME.ANIMATIONS.HIT, { start: 0, end: 4 }),
            frameRate: 20,
            repeat: 0,
        });
    }

    override update() {
        this.anims.play(Constants.ENEMIES.SLIME.ANIMATIONS.IDLE, true)

    }

    checkIsDead() {
        var health = this.currentScene.registry.get(Constants.ENEMIES.SLIME.STATS.HEALTH)
        if (health <= 0 && !this.isDead) {
            console.log("Slime muerto");
        }
    }

    getDamage(damage: number) {
        var health = this.currentScene.registry.get(Constants.ENEMIES.SLIME.STATS.HEALTH)
        health = health - damage;
        if (health > 0 && !this.isDead && this.actions.damage.state) {
            this.currentScene.registry.set(Constants.ENEMIES.SLIME.STATS.HEALTH, health)
        }

        console.log(this.currentScene.registry.get(Constants.ENEMIES.SLIME.STATS.HEALTH));

    }



}