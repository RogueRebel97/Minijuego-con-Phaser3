import Constants from "../Constants";


export default class Jewel extends Phaser.Physics.Arcade.Sprite {

    private currentScene!: Phaser.Scene;
    private score: number = 10;

    private collected: Boolean = false;


    constructor(config: any) {
        super(config.currentScene, config.x, config.y, config.texture);

        this.currentScene = config.currentScene


        //Physics
        this.currentScene.add.existing(this);
        this.create();


    }

    create() {
        this.anims.create({
            key: 'collected',
            frames: this.currentScene.anims.generateFrameNumbers('collected', { start: 0, end: 5 }),
            frameRate: 20,
        });


    }
    override update() {

    }

    collect() {
        if (!this.collected) {
            this.collected = true
        }
    }

    checkCollect() {
        if (this.collected) {
            this.collected = true
            this.anims.play("collected")
            this.givePoints();

            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'collected', () => {
                // console.log("recogido");

                this.currentScene.physics.world.remove(this.body)
                this.body.enable = false;
                // this.disableBody(true, true)
                this.destroy()
            })
        }
    }

    collectCheck() {
        return this.collected
    }

    givePoints() {
        this.currentScene.events.emit(Constants.EVENTS.SCORE, this.score)
    }






}