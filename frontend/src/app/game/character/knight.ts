import Constants from "../Constants";

export default class Knight extends Phaser.Physics.Arcade.Sprite {
    // Attributes
    private vRun: number = 250;
    private vJump: number = 300;
    private vSlide: number = 500;
    private maxHealth: number = 100;
    private health: number = this.maxHealth;

    // Actions & states
    private actions: any = {
        attack: { state: true, duration: 300, cooldown: 525 },
        slide: { state: true, duration: 300, cooldown: 800 },
        damage: { state: true, duration: 500, cooldown: 1500 },
        invulnerable: { state: true, cooldown: 325 }
    }
    private allowMove: boolean = true;
    private playerIsDead: boolean = false;
    // private allowDamage: boolean = true;

    // Key controlls
    private controlls!: any;

    // Current Game Scene
    private currentScene!: Phaser.Scene;


    constructor(config: any) {
        super(config.currentScene, config.x, config.y, config.texture);

        this.currentScene = config.currentScene;

        //Register global Variables

        this.currentScene.registry.set(Constants.REGISTRY.MAXHEALTH, this.maxHealth)
        this.currentScene.registry.set(Constants.REGISTRY.HEALTH, this.health)

        // Player Controls
        this.controlls = this.currentScene.input.keyboard.addKeys({
            'UP': Phaser.Input.Keyboard.KeyCodes.UP,
            'DOWN': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'LEFT': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'RIGHT': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'W': Phaser.Input.Keyboard.KeyCodes.W,
            'A': Phaser.Input.Keyboard.KeyCodes.A,
            'S': Phaser.Input.Keyboard.KeyCodes.S,
            'D': Phaser.Input.Keyboard.KeyCodes.D,
            'SHIFT': Phaser.Input.Keyboard.KeyCodes.SHIFT,
            'SPACE': Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        // Sprite Phisics
        this.currentScene.physics.world.enable(this);
        this.currentScene.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.setSize(20, 38);
        this.displayWidth = 240;
        this.displayHeight = 160;
        this.body.setOffset(this.width * 0.5 - 15, this.height * 0.5);
    }

    create() { // Character animations
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
        let key = Phaser.Input.Keyboard;

        if (this.playerIsDead) this.allowMove = false;

        // Actions set
        if (this.allowMove) {

            // Displace
            if (this.controlls.LEFT.isDown || this.controlls.A.isDown) { // Left <==

                // Left Speed
                this.setVelocityX(-this.vRun);

                // Animation and Turn
                if (this.flipX && this.body.blocked.down) {
                    this.anims.play('left', true);
                } else {
                    this.anims.stop();
                    this.flipX = true;
                }

                // hitbox adjust
                this.body.setOffset(this.width * 0.5 - 5, this.height * 0.5);

            } else if (this.controlls.RIGHT.isDown || this.controlls.D.isDown) { // Right ==>

                // Right speed
                this.setVelocityX(this.vRun);

                // Animation & Turn
                if (!this.flipX && this.body.blocked.down) {
                    this.anims.play('right', true);
                } else {
                    this.anims.stop();
                    this.flipX = false;
                }

                // hitbox adjust
                this.body.setOffset(this.width * 0.5 - 15, this.height * 0.5);

            } else if (this.body.blocked.down) { // Idle
                this.setVelocityX(0);
                this.anims.play('idle', true);
            }

            // Jump
            if ((key.JustDown(this.controlls.UP) || key.JustDown(this.controlls.W)) && this.body.blocked.down) {
                this.anims.stop();
                this.setVelocityY(-this.vJump);
                // this.setVelocityX(390   )
                this.anims.play('jump');
                if (this.flipX) {
                    this.setVelocityX(0)
                }

            }

            // Fall
            if (this.body.velocity.y >= 0 && !this.body.blocked.down) {
                this.anims.stop();
                this.anims.play('fall');
            }

            // Attack: Down Swing
            if (key.JustDown(this.controlls.SPACE) && this.body.blocked.down && this.actions.attack.state) {
                this.blockMove('attack') // bloquear otros inputs de usuario por x milisegundos
                this.cooldown('attack'); // impide que se vuelva a ejecutar otro ataque durante x ms
                this.anims.stop(); // detener animaciones en curso
                this.anims.play('downSwing');
                this.setVelocityX(0); //parar el pj
            }

            // Slide
            if (key.JustDown(this.controlls.SHIFT) &&
                (this.controlls.RIGHT.isDown || this.controlls.LEFT.isDown || this.controlls.A.isDown || this.controlls.D.isDown) &&
                this.body.blocked.down && this.actions.slide.state) {

                this.blockMove('slide'); // bloquear otros inputs de usuario por x milisegundos
                this.cooldown('slide'); // impide que se vuelva a ejecutar otro slide durante x ms
                this.cooldown('invulnerable')
                this.anims.stop();  // detener animaciones en curso
                this.anims.play('slide');

                if (this.flipX) this.setVelocityX(-this.vSlide);
                else this.setVelocityX(this.vSlide);
            }
        }
    }

    private blockMove(action: string) {
        this.allowMove = false;
        this.currentScene.time.delayedCall(this.actions[action].duration, () => {
            this.allowMove = true
        }, [], this)
    }

    private cooldown(action: string) {
        this.actions[action].state = false;
        this.currentScene.time.delayedCall(this.actions[action].cooldown, () => {
            this.actions[action].state = true
        }, [], this);

    }

    checkIsDead() {
        var health = this.currentScene.registry.get(Constants.REGISTRY.HEALTH);

        if (health <= 0 && !this.playerIsDead && this.allowMove) {
            this.currentScene.physics.world.removeCollider(this.currentScene.registry.get(Constants.REGISTRY.COLLIDERS.ENEMY))
            this.playerIsDead = true //boolean to check players Death
            this.anims.stop();
            this.setVelocityX(0);
            this.anims.play('death');
        }
    }

    getDamage(damage: number) {
        var health = this.currentScene.registry.get(Constants.REGISTRY.HEALTH);
        if (health > 0 && !this.playerIsDead && this.actions.damage.state && this.actions.invulnerable.state) {

            this.blockMove('damage');
            this.cooldown('damage')
            this.getInvulnerable(1500)

            if (this.body.blocked.left) {
                this.setVelocityX(200)
                this.setVelocityY(-150)
                this.anims.play('hit')



            } else if (this.body.blocked.right) {

                this.setVelocityX(-200)
                this.setVelocityY(-150)
                this.anims.play('hit')


            } else if (this.body.touching.down) {
                var random = Math.floor(Math.random() * 2) + 1;
                this.anims.stop;
                this.setVelocityY(-150)
                if (random == 1) {
                    this.setVelocityX(250)
                    this.anims.play('hit')
                } else {
                    this.setVelocityX(-250)
                    this.anims.play('hit')
                }
            }

            health = health - damage;
            this.currentScene.registry.set(Constants.REGISTRY.HEALTH, health)
            this.currentScene.events.emit(Constants.EVENTS.HEALTH)
        }
    }

    getInvulnerable(time: number) {
        this.currentScene.tweens.add({
            targets: this,
            alpha: { from: 1, to: 0 },
            ease: 'Sine.InOut',
            duration: 55,
            repeat: 10,
            yoyo: true
        });
        this.currentScene.time.delayedCall(time, () => {
        }, [], this)

    }
}