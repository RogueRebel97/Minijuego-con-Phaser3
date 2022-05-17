import { retry } from "rxjs";
import Knight from "../character/knight";
import Constants from "../Constants";

export default class Goblin extends Phaser.Physics.Arcade.Sprite {

    // Attributes 
    private vWalk: number = 60
    private vRun: number = 120
    private maxHealth: number = 50
    private health: number = this.maxHealth
    private dmg: number = 20
    private score: number = 30


    private moveTime: number = 0
    private controls!: any

    //Actions & States
    private actions: any = {
        left: { state: true },
        right: { state: false },
        attack: { state: true, duration: 1000, cooldown: 1500 },
        damage: { state: false, duration: 500, cooldown: 550 },
    }

    private allowMove: boolean = true
    private isDead: boolean = false;
    private isChasing: boolean = false;
    private isPatrolling: boolean = true
    private aggro: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

    //HAMMER Hitbox
    private hammerHitBox: Phaser.Types.Physics.Arcade.ImageWithDynamicBody



    //Current Game Scene
    private currentScene!: Phaser.Scene

    constructor(config: any) {
        console.log("goblin Creado");
        super(config.currentScene, config.x, config.y, config.texture)

        this.currentScene = config.currentScene

        // Controls 
        this.controls = this.currentScene.input.keyboard.addKeys({
            'P': Phaser.Input.Keyboard.KeyCodes.P
        })

        // Physics
        this.currentScene.physics.world.enable(this)
        this.currentScene.add.existing(this)

        //Hitbox
        this.body.setSize(this.width * 0.4, this.height * 0.6);
        this.body.offset.y = this.height * 0.35


        //Field of View
        this.aggro = this.currentScene.add.rectangle(this.x, this.y, 350, 125, 0xFF0000, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
        this.currentScene.physics.add.existing(this.aggro)
        this.aggro.body.setAllowGravity(false)


        this.displayWidth = this.width / 20
        this.displayHeight = this.height / 20



        // Initialize Sword HitBox
        this.hammerHitBox = this.currentScene.add.rectangle(this.x, this.y, 15, 35, 0xFF0000, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
        this.currentScene.physics.add.existing(this.hammerHitBox)
        this.hammerHitBox.body.setAllowGravity(false)
        this.hammerHitBox.body.enable = false;
        this.currentScene.physics.world.remove(this.hammerHitBox.body)

        this.create()
    }


    create() {
        this.createAnimations();

        //Aggro Overlap
        this.currentScene.physics.add.overlap
            (this.aggro, this.currentScene.registry.get(Constants.GROUPS.PLAYER), this.chase, this.checkIsChasing, this)

        // Aggro Start and end Events
        this.aggro.on('overlapstart', () => {
            this.isChasing = true
            this.isPatrolling = false
            console.log("Entraste en Aggro");

        })
        this.aggro.on('overlapend', () => {
            console.log("Saliste de Agro");

            this.isChasing = false
            this.isPatrolling = true
        })

        //Hammer and Player Collider

        this.currentScene.physics.add.overlap
            (this.hammerHitBox,
                this.currentScene.registry.get(Constants.GROUPS.PLAYER),
                this.attackCollide)
    }





    override update() {
        let key = Phaser.Input.Keyboard;

        // events for enter and exit the Aggro Area
        var touching = !this.aggro.body.touching.none
        var wasTouching = !this.aggro.body.wasTouching.none

        if (touching && !wasTouching) {
            this.aggro.emit('overlapstart')
        } else if (!touching && wasTouching) {
            this.aggro.emit('overlapend')
        }

        if (this.isDead) this.allowMove = false

        // if (!this.actions.damage.state) this.anims.play('goblinIdle', true) no necesita idle.

        if (!this.actions.damage.state && !this.isPatrolling && this.isChasing && this.allowMove) { this.anims.play('goblinMove', true) } // walking animation

        //Patrolling
        if (this.allowMove && !this.actions.damage.state && !this.isChasing && this.isPatrolling) {
            // console.log('entro en patrol');

            if (this.actions.left.state) {

                this.moveLeft(1)
            }
            if (this.actions.right.state) {
                this.moveRight(1)
            }
        }

        this.aggro.x = this.x
        this.aggro.y = this.y

        if (key.JustDown(this.controls.P)) {
            console.log(
                `
          GOBLIN isChasing:    ${this.isChasing}
          GOBLIN isPatrolling: ${this.isPatrolling}
          GOBLIN AllowMove:    ${this.allowMove}`);

        }
    }






    getDamage(dmg: number, playerX: number) {
        let distance = this.x - playerX

        console.log(distance);

        if (this.health > 0 && !this.isDead && !this.actions.damage.state) {
            console.log(`States: 
                Muerto:${this.isDead}
                RecibioDaño:${this.actions.damage.state} 
               `);
            console.log("hp INICIAL Goblin: " + this.health);
            console.log("HIT");
            console.log('derecha: ' + this.actions.right.state);
            console.log('izquierda: ' + this.actions.left.state);

            console.log(`body en Dañado:`);
            console.log(this.body);
            console.log("boolean the body en Dañado: " + this.body.enable);

            this.blockMove('damage');
            this.cooldown('damage')

            if (distance < 0) {
                this.anims.stop()
                this.setVelocityX(-40)
                this.setVelocityY(-150)
                this.anims.play('goblinHit')

            }
            else if (distance >= 0) {
                this.anims.stop()
                this.setVelocityX(40)
                this.setVelocityY(-150)
                this.anims.play('goblinHit')

            }

            this.health = this.health - dmg

            // console.log(`hp FINAL de goblin: ${this.health}`);
        }
    }


    checkIsDead() {

        if (this.health <= 0 && !this.isDead && this.allowMove) {
            // console.log("goblin muerto");
            this.isDead = true;

            this.setVelocityX(0);
            this.anims.play('goblinDead')
            this.currentScene.events.emit(Constants.EVENTS.SCORE, this.score)
            // remove body and aggro box
            this.currentScene.physics.world.remove(this.body)
            this.currentScene.physics.world.remove(this.aggro.body)
            this.body.enable = false;
            this.aggro.body.enable = false;

            // this.currentScene.time.delayedCall(1000, () => {
            //     // this.destroy() dejar el cuerpo por ahora
            // }, [], this)

            this.aggro.destroy();
        }
    }
    deathCheck(): boolean {
        return this.isDead;
    }


    moveLeft(time: number) {
        if (!this.flipX) this.flipX = true// turn to left direction
        this.moveTime += time // Aumentar el contador con cada paso
        this.setVelocityX(-this.vWalk)
        this.anims.play('goblinMove', true)

        if (this.moveTime > 500 || this.body.blocked.left) { // a los 2 seg cambiar la direccion
            this.moveTime = 0 // reseteamos el tiempo
            this.actions.left.state = false //Cambio de direccion
            this.actions.right.state = true
        }
    }

    moveRight(time: number) {
        if (this.flipX) this.flipX = false  // turn to rigth direction

        this.moveTime += time // Aumentar el contador con cada paso

        this.setVelocityX(this.vWalk)
        this.anims.play('goblinMove', true)

        if (this.moveTime > 500 || this.body.blocked.right) {      // a los 2 seg cambiar la direccion

            this.moveTime = 0 // reseteamos el tiempo
            this.actions.right.state = false //Cambio de direccion
            this.actions.left.state = true
        }

    }


    blockMove(action: string) {
        this.allowMove = false;
        this.currentScene.time.delayedCall(this.actions[action].duration, () => {
            this.allowMove = true
        }, [], this)
    }

    cooldown(action: string) {
        this.actions[action].state = !this.actions[action].state;
        this.currentScene.time.delayedCall(this.actions[action].cooldown, () => {
            this.actions[action].state = !this.actions[action].state;
        }, [], this);

    }

    createAnimations() {

        //idle
        this.anims.create({
            key: 'goblinIdle',
            frames: this.anims.generateFrameNames('goblinAtlas',
                {
                    prefix: 'goblinTank-idle-',
                    suffix: '.png',
                    end: 7
                }),
            frameRate: 15,
            repeat: -1
        })
        // walk
        this.anims.create({
            key: 'goblinMove',
            frames: this.anims.generateFrameNames('goblinAtlas',
                {
                    prefix: 'goblinTank-walk-',
                    suffix: '.png',
                    end: 5
                }),
            frameRate: 15,
            repeat: -1
        })
        // Hit
        this.anims.create({
            key: 'goblinHit',
            frames: this.anims.generateFrameNames('goblinAtlas',
                {
                    prefix: 'goblinTank-hit-',
                    suffix: '.png',
                    end: 3
                }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'goblinDead',
            frames: this.anims.generateFrameNames('goblinAtlas',
                {
                    prefix: 'goblinTank-die-',
                    suffix: '.png',
                    end: 8
                }),
            frameRate: 8,

        })
        this.anims.create({
            key: 'goblinAttack',
            frames: this.anims.generateFrameNames('goblinAtlas',
                {
                    prefix: 'goblinTank-attack-',
                    suffix: '.png',
                    end: 11
                }),
            frameRate: 15,

        })








    }

    chase(enemy: any, player: any) {
        var distance: number = player.x - enemy.x;

        if (this.isChasing && this.allowMove && !this.isDead && !this.isPatrolling) {
            // console.log("chasing");
            if (distance > 0) {
                this.flipX = false
                this.setVelocityX(this.vRun)
                if (distance <= 35) {
                    this.goblinAttack()


                }

            } else {
                this.flipX = true
                this.setVelocityX(-this.vRun)
                if (distance >= -35) {

                    this.goblinAttack()

                }

            }
        }

    }
    checkIsChasing() {

    }

    goblinAttack() {
        this.setVelocityX(0);
        this.blockMove('attack')
        this.cooldown('attack')
        this.anims.stop();
        this.anims.play('goblinAttack')

        // cambiar el Frame en el ataque se hace efectivo
        const startHit = (anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) => {
            if (frame.index < 4) { // empieza en el frame 4
                return
            }

            this.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit) // apaga evento.

            //hitbox Position & measures
            this.hammerHitBox.x = this.flipX
                ? this.x - 25
                : this.x + 25
            this.hammerHitBox.y = this.y + this.body.height * 0.5

            // activa la hitbox 
            this.hammerHitBox.body.enable = true
            this.currentScene.physics.world.add(this.hammerHitBox.body)
            console.log("golpe");

        }
        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit) // cuando la animacion avance llama a startHit para saber cuando comenzar

        // desactivar la hitbox al acabar la animacion
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'goblinAttack', () => {
            this.hammerHitBox.body.enable = false;
            this.currentScene.physics.world.remove(this.hammerHitBox.body)
        })


    }




    attackCollide(obj1: any, obj2: any) {
        var player: Knight;


        player = obj2;
        player.getDamage(20)
    }






}