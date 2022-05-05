import { retry } from "rxjs";
import Constants from "../Constants";

export default class Slime extends Phaser.Physics.Arcade.Sprite {

    // Attributes 
    private vRun: number = 150
    private maxHealth: number
    private health: number

    private moveTime: number = 0


    //Actions & States
    private actions: any = {
        left: { state: false },
        right: { state: false },
        attack: { state: true, duration: 200, cooldown: 400 },
        damage: { state: false, duration: 500, cooldown: 400 },
        // invulnerable: { state: true, cooldown: 325 },
    }

    private allowMove: boolean = true
    private isDead: boolean = false;
    private isChasing: boolean = false;
    private aggro: Phaser.Types.Physics.Arcade.ImageWithDynamicBody


    //Current Game Scene
    private currentScene!: Phaser.Scene

    constructor(config: any) {
        console.log('slime creado');

        super(config.currentScene, config.x, config.y, config.texture, config.maxHealth);

        this.currentScene = config.currentScene
        this.maxHealth = config.maxHealth
        this.health = this.maxHealth
        this.initialDirection()


        //Register Variables
        // this.currentScene.registry
        //     .set(Constants.ENEMIES.SLIME.STATS.MAXHEALTH, this.maxHealth)
        // this.currentScene.registry
        //     .set(Constants.ENEMIES.SLIME.STATS.HEALTH, this.health)

        // Physics
        this.currentScene.physics.world.enable(this)
        this.currentScene.add.existing(this)

        //Field of View
        this.aggro = this.currentScene.add.rectangle(this.x, this.y, 200, 150, 0xFF0000, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
        this.currentScene.physics.add.existing(this.aggro)
        this.aggro.body.setAllowGravity(false)

        this.create()
    }

    create() {
        console.log(`hp de Slime: ${this.health}`);
        this.createAnimations();
        this.currentScene.physics.add.overlap
            (this.aggro, this.currentScene.registry.get(Constants.GROUPS.PLAYER), this.chase, this.checkIsChasing, this)
    }

    override update() {
        if (this.isDead) this.allowMove = false

        if (!this.actions.damage.state) this.anims.play(Constants.ENEMIES.SLIME.ANIMATIONS.IDLE, true)

        //Patrolling
        if (this.allowMove && !this.isChasing && !this.actions.damage.state) {
            // console.log('entro en patrol');

            if (this.actions.left.state) {
                this.moveLeftUpdate(1)
            }
            if (this.actions.right.state) {
                this.moveRightUpdate(1)
            }
        }


        // Field of view Aggro follow slime
        this.aggro.x = this.x
        this.aggro.y = this.y
    }

    createAnimations() {

        this.anims.create({
            key: Constants.ENEMIES.SLIME.ANIMATIONS.IDLE,
            frames: this.anims.generateFrameNumbers(Constants.ENEMIES.SLIME.ID, { start: 0, end: 9 }),
            frameRate: 15,
            repeat: -1,
        });

        this.anims.create({
            key: Constants.ENEMIES.SLIME.ANIMATIONS.HIT,
            frames: this.anims.generateFrameNumbers(Constants.ENEMIES.SLIME.ANIMATIONS.HIT, { start: 0, end: 4 }),
            frameRate: 10,

        });
    }

    checkIsDead() {
        var health = this.health

        if (health <= 0 && !this.isDead && this.allowMove) {
            console.log("Slime muerto");
            this.isDead = true;
            this.anims.stop();
            this.setVelocityX(0);

            // remove body and aggro box
            this.currentScene.physics.world.remove(this.body)
            this.currentScene.physics.world.remove(this.aggro.body)
            this.body.enable = false;
            this.aggro.body.enable = false;
            this.aggro.destroy();
            this.destroy()

        }
    }

    getDamage(damage: number) {
        var health = this.health

        if (health > 0 && !this.isDead && !this.actions.damage.state) {
            console.log(`States: 
            Muerto:${this.isDead}
            RecibioDaño:${this.actions.damage.state} 
           `);
            console.log("hp INICIAL Slime: " + health);
            console.log("HIT");
            console.log('derecha: ' + this.actions.right.state);
            console.log('izquierda: ' + this.actions.left.state);


            this.blockMove('damage'); // Parar movimientos del enemigo y evitar que realice otra accion por X ms
            this.cooldown('damage') // Evitar que reciba daño de nuevo por X ms
            this.anims.stop()
            this.setVelocityX(0)
            this.anims.play(Constants.ENEMIES.SLIME.ANIMATIONS.HIT)

            this.health = health - damage;

            console.log(`hp FINAL de Slime: ${this.health}`);
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

    initialDirection() {
        // sprite de slime mira a la derecha por defecto flipX= true es izquierda, false es derecha
        const random = Phaser.Math.Between(1, 100)
        if (random > 50) {
            this.actions.left.state = true
        }
        else {
            this.actions.right.state = true
        }
    }

    moveLeftUpdate(time: number) {
        if (this.flipX) this.flipX = false // turn to rigth direction
        this.moveTime += time // Aumentar el contador con cada paso


        this.setVelocityX(-20)

        // if (this.body.blocked.left) {
        //     console.log('Choque por la izquierda');
        //     this.moveTime = 500

        // }


        if (this.moveTime > 500 || this.body.blocked.left) { // a los 2 seg cambiar la direccion
            this.moveTime = 0 // reseteamos el tiempo
            this.actions.left.state = false //Cambio de direccion
            this.actions.right.state = true
        }
    }

    moveRightUpdate(time: number) {
        if (!this.flipX) this.flipX = true // turn to rigth direction

        this.moveTime += time // Aumentar el contador con cada paso

        this.setVelocityX(20)

        // if (this.body.blocked.right) {
        //     console.log('Choque por la derecha');
        //     this.moveTime = 500

        // }

        if (this.moveTime > 500 || this.body.blocked.right) {      // a los 2 seg cambiar la direccion

            this.moveTime = 0 // reseteamos el tiempo
            this.actions.right.state = false //Cambio de direccion
            this.actions.left.state = true
        }

    }

    chase(enemy: any, player: any) {
        var distance: number = player.x - enemy.x;

        this.isChasing = true


        if (this.isChasing && this.allowMove && !this.isDead) {
            if (distance > 0) {
                this.flipX = true
                this.setVelocityX(40)
            } else {
                this.flipX = false
                this.setVelocityX(-40)
            }
        }







    }
    checkIsChasing() {


    }

    resetChase() {
        this.isChasing = false
    }

}