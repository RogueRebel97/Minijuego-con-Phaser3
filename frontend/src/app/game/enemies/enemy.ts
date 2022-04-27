import { retry } from "rxjs";
import Constants from "../Constants";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

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
        damage: { state: true, duration: 500, cooldown: 400 },
        invulnerable: { state: true, cooldown: 325 }
    }
    private allowMove: boolean = true
    private isDead: boolean = false;


    //Current Game Scene
    private currentScene!: Phaser.Scene

    constructor(config: any) {
        super(config.currentScene, config.x, config.y, config.texture, config.maxHealth);

        this.currentScene = config.currentScene
        this.maxHealth = config.maxHealth
        this.health = this.maxHealth
        this.initialDirection()


        //Register Variables
        this.currentScene.registry
            .set(Constants.ENEMIES.SLIME.STATS.MAXHEALTH, this.maxHealth)
        this.currentScene.registry
            .set(Constants.ENEMIES.SLIME.STATS.HEALTH, this.health)


        // Physics
        this.currentScene.physics.world.enable(this)
        this.currentScene.add.existing(this)

    }

    create() {
        console.log(`hp de Slime: ${this.health}`);

        // slime Anims
        this.anims.create({
            key: Constants.ENEMIES.SLIME.ANIMATIONS.IDLE,
            frames: this.anims.generateFrameNumbers(Constants.ENEMIES.SLIME.ID, { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: Constants.ENEMIES.SLIME.ANIMATIONS.HIT,
            frames: this.anims.generateFrameNumbers(Constants.ENEMIES.SLIME.ANIMATIONS.HIT, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1,
        });
        //End Slime anims

        console.log('derecha: ' + this.actions.right.state);
        console.log('izquierda: ' + this.actions.left.state);
    }

    override update() {
        // console.log('derecha: ' + this.actions.right.state);
        // console.log('izquierda: ' + this.actions.left.state);

        if (this.isDead) this.allowMove = false

        //Patrolling
        if (this.allowMove) {
            this.anims.play(Constants.ENEMIES.SLIME.ANIMATIONS.IDLE, true)

            if (this.actions.left.state) {
                this.moveLeftUpdate(1)
                // console.log("izquierda");
                // console.log('derecha: ' + this.actions.right.state);
                // console.log('izquierda: ' + this.actions.left.state);
            }

            if (this.actions.right.state) {

                this.moveRightUpdate(1)
                // console.log("derecha");
                // console.log('derecha: ' + this.actions.right.state);
                // console.log('izquierda: ' + this.actions.left.state);

            }
        }


    }

    checkIsDead() {

        var health = this.currentScene.registry.get(Constants.ENEMIES.SLIME.STATS.HEALTH)
        if (health <= 0 && !this.isDead && this.allowMove) {
            console.log("Slime muerto");
            this.isDead = true;
            this.anims.stop();

            this.setVelocityX(0);

            this.currentScene.physics.world.remove(this.body)
            this.body.enable = false;
            this.destroy()

        }
    }

    getDamage(damage: number) {
        var health = this.currentScene.registry.get(Constants.ENEMIES.SLIME.STATS.HEALTH)


        if (health > 0 && !this.isDead && this.actions.damage.state && this.actions.invulnerable.state) {
            console.log(`States: 
            Muerto:${this.isDead}
            RecibioDaño:${this.actions.damage.state} 
            Invulnerable:${this.actions.invulnerable.state}`);
            console.log("hp INICIAL Slime: " + health);
            console.log("HIT");
            console.log('derecha: ' + this.actions.right.state);
            console.log('izquierda: ' + this.actions.left.state);


            this.blockMove('damage'); // Parar movimientos del enemigo y evitar que realice otra accion por X ms
            this.cooldown('damage') // Evitar que reciba daño de nuevo por X ms
            this.anims.stop()
            this.setVelocityX(0)
            this.anims.play(Constants.ENEMIES.SLIME.ANIMATIONS.HIT)
            health = health - damage;
            this.currentScene.registry.set(Constants.ENEMIES.SLIME.STATS.HEALTH, health)
            console.log(`hp FINAL de Slime: ${this.currentScene.registry.get(Constants.ENEMIES.SLIME.STATS.HEALTH)}`);
        }



    }
    blockMove(action: string) {
        this.allowMove = false;
        this.currentScene.time.delayedCall(this.actions[action].duration, () => {
            this.allowMove = true
        }, [], this)
    }

    cooldown(action: string) {
        this.actions[action].state = false;
        this.currentScene.time.delayedCall(this.actions[action].cooldown, () => {
            this.actions[action].state = true
        }, [], this);

    }


    initialDirection() {
        // sprite de slime mira a la derecha por defecto flipx=true es izquierda, false es derecha
        const random = Phaser.Math.Between(1, 100)
        if (random > 50) {
            this.actions.left.state = true
        }
        else {
            this.actions.right.state = true
        }
    }

    moveLeft() {
        this.moveTime = 0// reseteamos el tiempo



    }

    moveLeftUpdate(time: number) {
        this.moveTime += time // Aumentar el contador con cada paso
        // console.log(this.moveTime);




        this.setVelocityX(-20)
        if (this.moveTime > 500) { // a los 2 seg cambiar la direccion
            if (!this.flipX) this.flipX = true
            this.moveTime = 0// reseteamos el tiempo
            this.actions.left.state = false //Cambio de direccion
            this.actions.right.state = true

        }



    }

    moveRight() {
        this.moveTime = 0 // reseteamos el tiempo



    }

    moveRightUpdate(time: number) {
        this.moveTime += time // Aumentar el contador con cada paso



        this.setVelocityX(20)

        if (this.moveTime > 500) { // a los 2 seg cambiar la direccion
            if (this.flipX) this.flipX = false
            this.moveTime = 0 // reseteamos el tiempo
            this.actions.right.state = false //Cambio de direccion
            this.actions.left.state = true
        }



    }


}