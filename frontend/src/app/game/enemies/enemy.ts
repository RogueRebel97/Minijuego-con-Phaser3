import Constants from "../Constants";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    // Attributes 
    private vRun: number = 150
    private maxHealth: number = 40
    private health: number = this.maxHealth

    private dmg: number = 10;

    //Actions & States
    private actions: any = {
        attack: { state: true, duration: 200, cooldown: 400 },
        damage: { state: true, duration: 500, cooldown: 1500 },
        invulnerable: { state: true, cooldown: 325 }
    }
    private allowMove: boolean = true
    private isDead: boolean = false;


    //Current Game Scene
    private currentScene!: Phaser.Scene

    constructor(config: any) {
        super(config.currentScene, config.x, config.y, config.texture);

        this.currentScene = config.currentScene


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
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: Constants.ENEMIES.SLIME.ANIMATIONS.HIT,
            frames: this.anims.generateFrameNumbers(Constants.ENEMIES.SLIME.ANIMATIONS.HIT, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1,
        });
        // this.anims.create({
        //     key: 'particles',
        //     frames: this.anims.generateFrameNumbers('particles', { start: 0, end: 4 }),
        //     frameRate: 20,
        //     repeat: 0,
        // });
        //End Slime anims
    }

    override update() {

        if (this.isDead) this.allowMove = false

        if (this.allowMove) {
            this.anims.play(Constants.ENEMIES.SLIME.ANIMATIONS.IDLE, true)
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


            this.blockMove('damage'); // Parar movimientos del enemigo y evitar que realice otra accion por X ms
            this.cooldown('damage') // Evitar que reciba daño de nuevo por X ms
            this.anims.play(Constants.ENEMIES.SLIME.ANIMATIONS.HIT)

            health = health - damage;
            this.currentScene.registry.set(Constants.ENEMIES.SLIME.STATS.HEALTH, health)
            console.log(`hp FINAL de Slime: ${this.currentScene.registry.get(Constants.ENEMIES.SLIME.STATS.HEALTH)}`);


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


}