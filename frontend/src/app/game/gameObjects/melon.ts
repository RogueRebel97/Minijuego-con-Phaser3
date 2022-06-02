




export default class Melon extends Phaser.Physics.Arcade.Sprite {


    private currentScene!: Phaser.Scene
    private healing: number = 45

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
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'collected',
            frames: this.currentScene.anims.generateFrameNumbers('collected', { start: 0, end: 15 }),
            frameRate: 10,
            repeat: -1,
        });
    }










}