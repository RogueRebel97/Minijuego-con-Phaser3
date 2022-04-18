import Constants from "../Constants";
import { delay } from 'rxjs';


export default class Knight extends Phaser.Physics.Arcade.Sprite {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private WASD: any;
    private shiftKey!: any;
    private spaceKey!: any;

    private allowMove = true;

    private escena!: Phaser.Scene;

    constructor(config: any) {
        super(config.escena, config.x, config.y, config.texture);

        this.escena = config.escena;
        this.escena.physics.world.enable(this);
        this.escena.add.existing(this);


        this.body.setSize(20, 38);
        this.setCollideWorldBounds(true);

        this.setBounce(0.05);
        this.displayWidth = 240;
        this.displayHeight = 160;
        this.body.setOffset(
            this.width * 0.5 - 15,
            this.height * 0.5
        );


        this.cursors = this.escena.input.keyboard.createCursorKeys();
        this.WASD = this.escena.input.keyboard.addKeys('W,A,S,D');
        this.shiftKey = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.spaceKey = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // this.play(Constants.PLAYER.ANIMATION.IDLE);

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
            if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
                this.setVelocityX(0);
                this.anims.stop();
                this.blockMove(300)
                this.anims.play('downSwing');

            }

        }


        //Right Dash
        if (Phaser.Input.Keyboard.JustDown(this.shiftKey) && this.body.blocked.down && (this.cursors.right.isDown || this.cursors.left.isDown || this.WASD.A.isDown || this.WASD.D.isDown)) {
            this.anims.stop();
            this.blockMove(500)
            if (this.flipX) {
                this.setVelocityX(-400);
            } else {
                this.setVelocityX(400);
            }
            this.anims.play('slide');
        }


    }


    blockMove(timeMs: number) {
        this.allowMove = false

        this.escena.time.delayedCall(timeMs, () => {

            this.allowMove = true
        }, [], this)
    }
}