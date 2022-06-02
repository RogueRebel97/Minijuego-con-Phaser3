



export default class SawTrap extends Phaser.Physics.Arcade.Sprite {


    //Current Game Scene
    private currentScene!: Phaser.Scene

    private damage: number = 45
    private force: number = 300


    constructor(config: any, angle?: number) {
        super(config.currentScene, config.x, config.y, config.texture);



        if (config.angle) {
            this.angle = config.angle

        }

        this.currentScene = config.currentScene

        // Physics
        this.currentScene.add.existing(this);





    }


    create() {


        this.anims.create({
            key: 'saw',
            frames: this.currentScene.anims.generateFrameNumbers('sawTrap1', { start: 0, end: 15 }),
            frameRate: 10,
            repeat: -1,
        });

        this.setCircle(13)

        if (this.angle == 360 || this.angle == 0) {
            // console.log(this.angle);
            this.setOffset(this.body.offset.x + 3, this.height * 0.5 - 25)
        }
        else if (this.angle == 180 || this.angle == -180) {
            this.setOffset(this.body.offset.x + 3, this.height * 0.5)
        } else if (this.angle == 90) {
            // console.log(this.angle);

            this.setOffset(this.body.offset.x + 16, this.height * 0.5 - 13)
        } else if (this.angle == -90) {
            // console.log(this.angle);
            this.setOffset(this.body.offset.x - 10, this.height * 0.5 - 13)
        } else if (this.angle == 135 || this.angle == -135) {
            console.log("aaaa");

            console.log(this.angle);
            this.setOffset(this.body.offset.x + 13, this.height * 0.5 - 5)
        } else {
            console.log(this.angle);
        }





    }

    override update() {
        this.anims.play('saw', true)
    }

    getDmg() {
        return this.damage
    }

    getForce() {
        return this.force
    }
}








