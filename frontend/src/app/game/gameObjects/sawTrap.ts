



export default class SawTrap extends Phaser.Physics.Arcade.Sprite {


    //Current Game Scene
    private currentScene!: Phaser.Scene


    constructor(config: any, angle?: number) {
        super(config.currentScene, config.x, config.y, config.texture);

        if (config.angle) {
            this.angle = config.angle
            console.log(config.angle);
        }

        this.currentScene = config.currentScene

        // Physics
        // this.currentScene.physics.world.enable(this)
        this.currentScene.add.existing(this)







        this.create()

    }


    create() {


        this.anims.create({
            key: 'saw',
            frames: this.currentScene.anims.generateFrameNumbers('sawTrap1', { start: 0, end: 15 }),
            frameRate: 10,
            repeat: -1,
        });




    }

    override update() {
        this.anims.play('saw', true)
    }
}








