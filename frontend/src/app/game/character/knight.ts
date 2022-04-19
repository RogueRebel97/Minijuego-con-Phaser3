import Constants from "../Constants";
import { delay } from 'rxjs';


export default class Knight extends Phaser.Physics.Arcade.Sprite {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private WASD: any;
    private shiftKey!: any;
    private spaceKey!: any;

    //Actions Booleans
    private attackCD = true;
    private slideCD = true;
    private jumpCd = true;
    private allowMove = true;
    private playerIsDead = false;
    private currentScene!: Phaser.Scene;





    constructor(config: any) {
        super(config.currentScene, config.x, config.y, config.texture);

        this.currentScene = config.currentScene;
        this.currentScene.physics.world.enable(this);
        this.currentScene.add.existing(this);


        this.body.setSize(20, 38);
        this.setCollideWorldBounds(true);

        this.setBounce(0.05);
        this.displayWidth = 240;
        this.displayHeight = 160;
        this.body.setOffset(
            this.width * 0.5 - 15,
            this.height * 0.5
        );



        this.cursors = this.currentScene.input.keyboard.createCursorKeys();
        this.WASD = this.currentScene.input.keyboard.addKeys('W,A,S,D');
        this.shiftKey = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.spaceKey = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



        this.play(Constants.PLAYER.ANIMATION.IDLE);
    }

    create() {
        this.anims.create({
            key: 'idle',
            frames: this.currentScene.anims.generateFrameNumbers('knight', { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: 'left',
            frames: this.currentScene.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: 'idle',
            frames: this.currentScene.anims.generateFrameNumbers('knight', { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'left',
            frames: this.currentScene.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'jump',
            frames: this.currentScene.anims.generateFrameNumbers('jump', { start: 0, end: 2 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'fall',
            frames: this.currentScene.anims.generateFrameNumbers('fall', { start: 0, end: 2 }),
            frameRate: 10,
        });

        this.anims.create({
            key: 'right',
            frames: this.currentScene.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'dash',
            frames: this.anims.generateFrameNumbers('dash', { start: 0, end: 1 }),
            frameRate: 30
        });

        this.anims.create({
            key: 'slide',
            frames: this.currentScene.anims.generateFrameNumbers('slide', { start: 0, end: 3 }),
            frameRate: 60
        });

        this.anims.create({
            key: 'downSwing',
            frames: this.currentScene.anims.generateFrameNumbers('downAttack', { start: 0, end: 3 }),
            frameRate: 20,
        });

        this.anims.create({
            key: 'hit',
            frames: this.currentScene.anims.generateFrameNumbers('hit', { start: 0 }),
            frameRate: 20,
            repeat: -1,
        });


        this.anims.create({
            key: 'death',
            frames: this.currentScene.anims.generateFrameNumbers('death', { start: 0, end: 9 }),
            frameRate: 20,
        });
    }

    override update() {

        //Moveset
        if (this.allowMove) {
            // <== Left
            if (this.cursors.left.isDown || this.WASD.A.isDown) {

                // Left Speed
                this.setVelocityX(-200);

                //Animation
                if (this.flipX && this.body.blocked.down) {

                    this.anims.play('left', true);
                } else {
                    // turn left
                    this.anims.stop();

                    this.flipX = true;
                }
                // hitbox adjust
                this.body.setOffset(
                    this.width * 0.5 - 5,
                    this.height * 0.5
                );


                // Right ==>
            } else if (this.cursors.right.isDown || this.WASD.D.isDown) {
                // Right speed
                this.setVelocityX(200);

                if (!this.flipX && this.body.blocked.down) {
                    //Animation

                    this.anims.play('right', true);
                }
                else {
                    //turn right
                    this.anims.stop();
                    this.flipX = false;
                }
                // hitbox adjust
                this.body.setOffset(
                    this.width * 0.5 - 15,
                    this.height * 0.5
                );



            } else if (this.body.blocked.down) {
                this.setVelocityX(0);
                this.anims.play('idle', true);
            }

            if ((this.cursors.up.isDown || this.WASD.W.isDown) && this.body.blocked.down) {
                this.anims.stop();
                this.setVelocityY(-300);
                this.anims.play('jump');


            }
            if (this.body.velocity.y >= 0 && !this.body.blocked.down) {
                this.anims.stop();
                this.anims.play('fall');
            }

            // attack: Down Swing
            if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.body.blocked.down && this.attackCD) {

                this.setVelocityX(0); //parar el pj
                this.anims.stop(); // detener animaciones en curso
                this.blockMove(300) // bloquear otros inputs de usuario por x milisegundos

                this.attackCD = false // impedir que se vuelva a ejecutar otro ataque

                this.currentScene.time.delayedCall(700, () => { // Cooldown hasta el siguiente ataque

                    this.attackCD = true
                }, [], this)

                this.anims.play('downSwing');

            }
            //Slide
            if (Phaser.Input.Keyboard.JustDown(this.shiftKey) && this.body.blocked.down &&
                (this.cursors.right.isDown || this.cursors.left.isDown
                    || this.WASD.A.isDown || this.WASD.D.isDown) && this.slideCD) {

                this.anims.stop();
                this.blockMove(500)

                this.slideCD = false;

                if (this.flipX) {
                    this.setVelocityX(-400);
                } else {
                    this.setVelocityX(400);
                }


                this.currentScene.time.delayedCall(1200, () => {

                    this.slideCD = true
                }, [], this)

                this.anims.play('slide');
            }

        }






    }

    playerDead() {
        console.log("player morido");

        if (!this.playerIsDead) {
            this.playerIsDead = true;
            console.log("morido");
            this.playerDead()

        } else {
            this.anims.stop();
            this.setVelocityX(0);
            this.anims.play('death');

            this.allowMove = false;

        }

    }


    blockMove(timeMs: number) {
        this.allowMove = false

        this.currentScene.time.delayedCall(timeMs, () => {

            this.allowMove = true
        }, [], this)
    }

    setCooldown(timeMs: number, action: boolean) {



        action = false

        this.currentScene.time.delayedCall(timeMs, () => {

            action = true

        }, [], this)
    }
}

