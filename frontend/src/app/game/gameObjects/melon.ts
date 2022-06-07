
import Constants from "../Constants";
import Knight from "../character/knight";



export default class Melon extends Phaser.Physics.Arcade.Sprite {


    private currentScene!: Phaser.Scene
    private healing: number = 45

    private eaten: boolean = false

    constructor(config: any) {
        super(config.currentScene, config.x, config.y, config.texture);

        this.currentScene = config.currentScene

        // Physics
        this.currentScene.add.existing(this);



    }

    create() {
        this.anims.create({
            key: 'melon',
            frames: this.currentScene.anims.generateFrameNumbers('melon', { start: 0, end: 16 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: 'collected',
            frames: this.currentScene.anims.generateFrameNumbers('collected', { start: 0, end: 5 }),
            frameRate: 20,

        });
    }


    override update() {
        // console.log("Ha sido recogida: " + this.eaten);

        if (!this.eaten) {
            this.anims.play('melon', true)
        }

    }


    eat() {
        if (!this.eaten) {

            this.eaten = true
            this.anims.stop()
            this.anims.play('collected')
            this.heal()

            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'collected', () => {
                // console.log("recogido");
                this.currentScene.physics.world.remove(this.body)
                this.disableBody(true, true)
            })

        }


    }

    heal() {

        let health = this.currentScene.registry.get(Constants.PLAYER.STATS.HEALTH);
        // console.log("vida antes de curar: " + health);

        health += 45
        if (health > 100) {
            // console.log("limite superado");

            health = 100
        }
        // console.log("Vida despues de curar: " + health);

        this.currentScene.registry.set(Constants.PLAYER.STATS.HEALTH, health)
        this.currentScene.events.emit(Constants.EVENTS.HEALTH)
        this.currentScene.events.emit(Constants.EVENTS.SCORE, 45)
    }





}