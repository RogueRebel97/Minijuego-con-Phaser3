import { keyframes } from "@angular/animations";
import { Game, UP } from "phaser";
import Constants from "../Constants";
import Slime from "../enemies/slime";

export default class Knight extends Phaser.Physics.Arcade.Sprite {
    // Attributes
    private vRun: number = 125;
    private vJump: number = 250;
    private vSlide: number = 330;
    private maxHealth: number = 100;
    private health: number = this.maxHealth;
    private damage: number = 10;


    // Atk Attributes
    private attackCounter: number = 0;
    private firstAttack!: any
    private secondAttack!: any
    private attackDelay!: number
    private maxDelay: number = 800


    // Actions & states
    private actions: any = {
        attack: { state: true, duration: 350, cooldown: 450 },
        slide: { state: true, duration: 300, cooldown: 800 },
        damage: { state: true, duration: 500, cooldown: 1500 },
        invulnerable: { state: true, cooldown: 325 }
    }
    private allowMove: boolean = true;
    private crouch: boolean = false
    private playerIsDead: boolean = false;


    // Key controls
    private controls!: any;

    //Key Combo
    private combo!: Phaser.Input.Keyboard.KeyCombo;
    private konami!: Phaser.Input.Keyboard.KeyCombo;

    // Current Game Scene
    private currentScene!: Phaser.Scene;

    //Platform Collider
    private platformCollider!: Phaser.Physics.Arcade.Collider;

    //Sword Hitbox
    private swordHitbox: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

    constructor(config: any) {
        super(config.currentScene, config.x, config.y, config.texture);

        this.currentScene = config.currentScene;
        //console.log('caballero creado');
        //console.log(`Hp Inicial: ${this.health}`);

        //Register global Variables
        this.currentScene.registry.set(Constants.PLAYER.STATS.MAXHEALTH, this.maxHealth)
        this.currentScene.registry.set(Constants.PLAYER.STATS.HEALTH, this.health)

        // console.log("Vida  Inicial:");

        // console.log(this.currentScene.registry.get(Constants.PLAYER.STATS.HEALTH));


        // Player Controls
        this.controls = this.currentScene.input.keyboard.addKeys({
            // Conf 1
            'UP': Phaser.Input.Keyboard.KeyCodes.UP,
            'DOWN': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'LEFT': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'RIGHT': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'Z': Phaser.Input.Keyboard.KeyCodes.Z,
            'X': Phaser.Input.Keyboard.KeyCodes.X,
            'C': Phaser.Input.Keyboard.KeyCodes.C,
            //Conf 2
            'W': Phaser.Input.Keyboard.KeyCodes.W,
            'A': Phaser.Input.Keyboard.KeyCodes.A,
            'S': Phaser.Input.Keyboard.KeyCodes.S,
            'D': Phaser.Input.Keyboard.KeyCodes.D,
            'J': Phaser.Input.Keyboard.KeyCodes.J,
            'K': Phaser.Input.Keyboard.KeyCodes.K,
            'L': Phaser.Input.Keyboard.KeyCodes.L,
            'I': Phaser.Input.Keyboard.KeyCodes.I,

            'SHIFT': Phaser.Input.Keyboard.KeyCodes.SHIFT,
            'SPACE': Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        // Sprite Physics
        this.currentScene.physics.world.enable(this);
        this.currentScene.add.existing(this);
        this.setCollideWorldBounds(false);


        //hit box default
        this.body.setSize(20, 38);
        this.body.setOffset(this.width * 0.5 - 15, this.height * 0.5);


        // Initialize Sword HitBox
        this.swordHitbox = this.currentScene.add.rectangle(this.x, this.y, 30, 40, 0xFF0000, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
        this.currentScene.physics.add.existing(this.swordHitbox)
        this.swordHitbox.body.setAllowGravity(false)
        this.swordHitbox.body.enable = false;
        this.currentScene.physics.world.remove(this.swordHitbox.body)


        //Combos
        this.konami = this.currentScene.input.keyboard.createCombo([38, 38, 40, 40, 37, 39, 37, 39], { resetOnMatch: true });
        // this.combo = this.currentScene.input.keyboard.createCombo([38, 38], { resetOnMatch: true })

        this.currentScene.input.keyboard.on('keycombomatch', (event: any) => {
            this.currentScene.events.emit(Constants.EVENTS.SCORE, +50)
            // console.log('Codigo Konami!');

        });

        // this.currentScene.input.keyboard.on('keycombomatch', (event: any) => {
        //     //console.log('Code entered!');

        //     this.getDamage(20, 0)
        // });
    }

    create() {

        // character platform collide
        this.platformCollider = this.currentScene.physics.add.collider
            (this, this.currentScene.registry.get(Constants.REGISTRY.COLLIDERS.PLATFORMS))

        this.createAnimations()
        // Sword and Enemy Colliders
        this.currentScene.physics.add.overlap
            (this.swordHitbox,
                this.currentScene.registry.get(Constants.GROUPS.ENEMIES),
                this.attackCollide)

    }

    override update() {

        let key = Phaser.Input.Keyboard;

        if (this.playerIsDead) this.allowMove = false;
        // Actions set
        if (this.allowMove) {
            //crouch
            if ((this.controls.DOWN.isDown || this.controls.S.isDown) && this.body.blocked.down) {
                this.setVelocityX(0)

                this.crouch = true
            }
            else { //Reset crouch state 
                this.crouch = false

            }
            // Run
            if (!this.crouch) {

                if ((this.controls.LEFT.isDown || this.controls.A.isDown)) { // Left <==

                    // Left Speed
                    this.setVelocityX(-this.vRun);
                    // this.body.velocity.x = -this.vRun
                    // Animation and Turn
                    if (this.flipX && this.body.blocked.down) {
                        this.anims.play('left', true);
                    } else {
                        this.anims.stop();
                        this.flipX = true;
                    }

                    // hitbox adjust
                    this.body.setOffset(this.width * 0.5 - 5, this.height * 0.5);

                } else if ((this.controls.RIGHT.isDown || this.controls.D.isDown)) { // Right ==>

                    // Right speed

                    this.body.velocity.x = this.vRun

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
                } else {
                    this.setVelocityX(0)
                }

                // Jump
                if ((key.JustDown(this.controls.UP) || key.JustDown(this.controls.W)) && this.body.blocked.down) {
                    this.anims.stop();
                    this.setVelocityY(-this.vJump);
                    this.anims.play('jump');
                }

                // Attack
                if ((key.JustDown(this.controls.J) || key.JustDown(this.controls.Z))
                    && this.body.blocked.down && this.actions.attack.state) {

                    //Attack counter max 2(valor fijo)
                    if (this.attackCounter == 2) {
                        this.attackCounter = 0
                        this.attackCounter++
                    }
                    else {
                        this.attackCounter++
                    }

                    //console.log("attacks: " + this.attackCounter);

                    // Catch time of every attack and check Delay
                    if (this.attackCounter == 1) {
                        this.firstAttack = new Date
                    } else {
                        this.secondAttack = new Date
                        this.attackDelay = this.secondAttack - this.firstAttack
                        //console.log("Time between Attacks: " + this.attackDelay);

                        if (this.attackDelay > this.maxDelay) {
                            //console.log("TO LATE");
                            this.attackCounter = 0
                        }

                    }

                    this.blockMove('attack') // bloquear otros inputs de usuario por x milisegundos
                    // this.cooldown('attack');    // impide que se vuelva a ejecutar otro ataque durante x ms
                    // this.anims.stop(); // detener animaciones en curso


                    // Ataque parado 
                    if (this.body.velocity.x == 0) {
                        // Hit 1
                        if (this.attackCounter < 2) {

                            //console.log("downSwing");
                            this.anims.play('downSwing_noMove');
                            // Hit 2
                        } else {
                            //console.log("lateralSwing");

                            this.anims.play('swing_noMove');
                        }
                        // Ataque en movimiento
                    } else {
                        if (this.flipX) {
                            this.setVelocityX((-this.vRun * 0.3));
                        } else {
                            this.setVelocityX((this.vRun * 0.3));
                        }

                        if (this.attackCounter < 2) {
                            //console.log("downSwing");
                            this.anims.play('downSwing');
                        } else {
                            //console.log("lateralSwing");
                            this.anims.play('swing');
                        }

                    }


                    // cambiar el Frame en el ataque se hace efectivo
                    const startHit = (anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) => {
                        if (frame.index < 1) { // empieza en el frame 1
                            return
                        }
                        this.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit) // apaga evento.

                        this.swordHitbox.x = this.flipX
                            ? this.x - this.width * 0.2
                            : this.x + this.width * 0.2
                        this.swordHitbox.y = this.y + this.body.height * 0.5



                        // activa la hitbox 
                        this.swordHitbox.body.enable = true
                        this.currentScene.physics.world.add(this.swordHitbox.body)
                    }
                    this.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit) // cuando la animacion avance llama a startHit para saber cuando comenzar

                    //Desactivar hitbox
                    const timedEvent = this.currentScene.time.delayedCall(this.actions.attack.duration, () => {
                        this.swordHitbox.body.enable = false;
                        this.currentScene.physics.world.remove(this.swordHitbox.body)


                    }, [], this)
                }

                // Slide
                if (key.JustDown(this.controls.SHIFT) &&
                    (this.controls.RIGHT.isDown || this.controls.LEFT.isDown || this.controls.A.isDown || this.controls.D.isDown) &&
                    this.body.blocked.down && this.actions.slide.state) {
                    this.crouch = true
                    this.blockMove('slide'); // bloquear otros inputs de usuario por x milisegundos
                    this.cooldown('slide'); // impide que se vuelva a ejecutar otro slide durante x ms
                    this.cooldown('invulnerable')
                    this.anims.stop();  // detener animaciones en curso
                    this.anims.play('slide');

                    if (this.flipX) this.setVelocityX(-this.vSlide);
                    else this.setVelocityX(this.vSlide);

                    //reset crouch
                    const timedEvent = this.currentScene.time.delayedCall(this.actions.slide.duration, () => {
                        this.crouch = false;

                    }, [], this)
                }



            }
            else // Crouch Movement  crouch == true
            {
                // Crouch walk left
                if ((this.controls.LEFT.isDown || this.controls.A.isDown)) {

                    // Left Speed
                    this.setVelocityX((-this.vRun * 0.6));

                    // Animation and Turn
                    if (this.flipX && this.body.blocked.down) {
                        this.anims.play('crouchWalk', true);
                    } else {
                        this.anims.stop();
                        this.flipX = true;
                    }

                } else if ((this.controls.RIGHT.isDown || this.controls.D.isDown)) {
                    // Right speed
                    this.setVelocityX((this.vRun * 0.6));

                    // Animation & Turn
                    if (!this.flipX && this.body.blocked.down) {
                        this.anims.play('crouchWalk', true);
                    } else {
                        this.anims.stop();
                        this.flipX = false;
                    }

                } else if (this.body.blocked.down) //idle crouch
                {
                    this.setVelocityX(0);
                    this.anims.play('crouch');
                } else {
                    this.setVelocityX(0);
                }
                if ((key.JustDown(this.controls.UP) || key.JustDown(this.controls.W)) && this.body.blocked.down) {

                    this.platformCollider.active = false
                    this.currentScene.time.delayedCall(400, () => {
                        this.platformCollider.active = true
                    }, [], this);
                }

                if ((key.JustDown(this.controls.J) || key.JustDown(this.controls.Z))
                    && this.actions.attack.state) {
                    //CrouchAttack
                    //console.log("ataque agachado");

                    this.setVelocityX(0)
                    this.blockMove('attack')
                    this.cooldown('attack');
                    this.anims.play('crouchAttack');

                    // cambiar el Frame en el ataque se hace efectivo
                    const startHit = (anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) => {
                        if (frame.index < 1) { // empieza en el frame 1
                            return
                        }
                        this.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit) // apaga evento.

                        this.swordHitbox.x = this.flipX
                            ? this.x - this.width * 0.2
                            : this.x + this.width * 0.2
                        this.swordHitbox.y = this.y + this.body.height



                        // activa la hitbox 
                        this.swordHitbox.body.enable = true
                        this.currentScene.physics.world.add(this.swordHitbox.body)
                    }
                    this.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit) // cuando la animacion avance llama a startHit para saber cuando comenzar

                    //Desactivar hitbox
                    const timedEvent = this.currentScene.time.delayedCall(this.actions.attack.duration, () => {
                        this.swordHitbox.body.enable = false;
                        this.currentScene.physics.world.remove(this.swordHitbox.body)


                    }, [], this)


                }


            }

            // Fall
            if (this.body.velocity.y >= 0 && !this.body.blocked.down) {
                this.anims.stop();
                this.anims.play('fall');
            }


            // Crouch
            if (this.crouch == true) {
                //console.log('agachado');
                this.body.setSize(20, 20, true);
                this.body.setOffset(this.body.offset.x, this.body.height + 38);

            }
            else {
                //console.log('levantado');
                this.body.setSize(20, 38)
                this.body.setOffset(this.body.offset.x, this.height * 0.5);

            }


        }

        // if (key.JustDown(this.controls.I)) {
        //console.log(`
        //     Attack: ${this.actions.attack.state}
        //     Slide: ${this.actions.slide.state}
        //     Damaged: ${this.actions.damage.state}
        //     Invulnerable: ${this.actions.invulnerable.state}

        //     AllowMove: ${this.allowMove}
        //     Crouch: ${this.crouch}
        //     IsDead: ${this.playerIsDead}
        //     `);

        // }

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


        if (this.health <= 0 && !this.playerIsDead && this.allowMove && this.body.blocked.down) {
            this.playerIsDead = true //boolean to check players Death
            this.anims.stop();
            this.setVelocityX(0);
            this.anims.play('death');
            this.currentScene.events.emit(Constants.EVENTS.SCORE, -50)
            this.currentScene.physics.world.remove(this.body)
            this.body.enable = false;
            //console.log(`Hp: ${this.health}`);
        }
    }

    deathCheck(): boolean {
        return this.playerIsDead;
    }

    deathFall() {
        //console.log("Sa Matao Paco");
        this.currentScene.cameras.main.stopFollow()
        this.playerIsDead = true


        this.health = 0
        this.currentScene.registry.set(Constants.PLAYER.STATS.HEALTH, this.health)
        this.currentScene.events.emit(Constants.EVENTS.HEALTH)

        this.currentScene.events.emit(Constants.EVENTS.SCORE, - 50)
        this.currentScene.physics.world.removeCollider(this.currentScene.registry.get(Constants.REGISTRY.COLLIDERS.DEATHZONE))
        this.currentScene.physics.world.removeCollider(this.currentScene.registry.get(Constants.REGISTRY.COLLIDERS.TRAPS))

        this.setCollideWorldBounds(false)
    }

    getDamage(damage: number, force: number) {
        if (this.health > 0 && !this.playerIsDead && this.actions.damage.state && this.actions.invulnerable.state) {

            this.blockMove('damage');
            this.cooldown('damage')
            this.getInvulnerable(1500)

            if (this.body.blocked.left) {
                this.setVelocityX(force)
                this.setVelocityY(-(force * 0.5))
                this.anims.play('hit')



            } else if (this.body.blocked.right) {

                this.setVelocityX(-force)
                this.setVelocityY(-(force * 0.5))
                this.anims.play('hit')


            } else if (this.body.touching.down) {
                var random = Math.floor(Math.random() * 2) + 1;
                this.anims.stop;
                this.setVelocityY(-(force * 0.5))
                if (random == 1) {
                    this.setVelocityX(force)
                    this.anims.play('hit')
                } else {
                    this.setVelocityX(-force)
                    this.anims.play('hit')
                }
            }

            this.health = this.health - damage;

            this.currentScene.registry.set(Constants.PLAYER.STATS.HEALTH, this.health)

            //console.log(`Hp : ${this.health}`);

            this.currentScene.events.emit(Constants.EVENTS.HEALTH)
            this.currentScene.events.emit(Constants.EVENTS.SCORE, -5)
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

    temporalHitBoxAdjust(time: number, x: number, y: number) {
        const offSetx = this.body.offset.x
        const offSety = this.body.offset.y
        this.body.setOffset(x, y)
        this.currentScene.time.delayedCall(time, () => {
            this.body.setOffset(offSetx, offSety)
        }, [], this)

    }
    attackCollide(obj1: any, obj2: any) {
        var enemy: Slime;

        //console.log("ATAQUE");

        enemy = obj2;
        enemy.getDamage(10, obj1.x)
    }

    reachGoal() {
        //console.log("Has llegado a la meta");

        this.anims.stop()
        this.anims.play('idle')
        this.allowMove = false
        this.setVelocityX(0)
        this.setVelocityY(0)
    }
    createAnimations() {
        // Character animations
        this.anims.create({
            key: 'left',
            frames: this.currentScene.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: 'idle',
            frames: this.currentScene.anims.generateFrameNumbers('knight', { start: 0, end: 9 }),
            frameRate: 10,
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
            frameRate: 20,
        });
        this.anims.create({
            key: 'fall',
            frames: this.currentScene.anims.generateFrameNumbers('fall', { start: 0, end: 2 }),
            frameRate: 20,
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
            frameRate: 40
        });
        this.anims.create({
            key: 'slide',
            frames: this.currentScene.anims.generateFrameNumbers('slide', { start: 0, end: 3 }),
            frameRate: 40
        });
        this.anims.create({
            key: 'downSwing_noMove',
            frames: this.currentScene.anims.generateFrameNumbers('downAttack_noMove', { start: 0, end: 3 }),
            frameRate: 20,
        });
        this.anims.create({
            key: 'swing_noMove',
            frames: this.currentScene.anims.generateFrameNumbers('swing_noMove', { start: 0, end: 5 }),
            frameRate: 20,
        });
        this.anims.create({
            key: 'downSwing',
            frames: this.currentScene.anims.generateFrameNumbers('downAttack', { start: 0, end: 3 }),
            frameRate: 20,
        });
        this.anims.create({
            key: 'swing',
            frames: this.currentScene.anims.generateFrameNumbers('swing', { start: 0, end: 5 }),
            frameRate: 20,
        });
        this.anims.create({
            key: 'crouchAttack',
            frames: this.currentScene.anims.generateFrameNumbers('crouchAttack', { start: 0, end: 3 }),
            frameRate: 20,
        });


        this.anims.create({
            key: 'hit',
            frames: this.currentScene.anims.generateFrameNumbers('hit', { start: 0 }),
            frameRate: 5,
            repeat: -1,
        });
        this.anims.create({
            key: 'death',
            frames: this.currentScene.anims.generateFrameNumbers('death', { start: 0, end: 9 }),
            frameRate: 20,
        });
        this.anims.create({
            key: 'crouch',
            frames: this.currentScene.anims.generateFrameNumbers('crouch', { start: 0, end: 2 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: 'crouchWalk',
            frames: this.currentScene.anims.generateFrameNumbers('crouchWalk', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

    }



}

