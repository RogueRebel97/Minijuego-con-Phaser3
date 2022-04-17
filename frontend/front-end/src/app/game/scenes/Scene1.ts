import { Game, Physics, Scene } from 'phaser';
import { delay } from 'rxjs';
import Settings from './SettingsMenu';

export class Scene1 extends Phaser.Scene {
  // Propiedades
  private ground!: any;
  private knight!: any;
  private cursors!: any;
  private allowMove = true;
  private shiftKey!: any;
  private spaceKey!: any;

  constructor() {
    super({ key: 'Scene1' });
  }

  init() {
    console.log('Scene1 Corriendo');
  }

  preload() { }

  create() {


    //background layer 1
    this.createBackground(this, 'forestBckgr-1', 3, 0)

    //background layer 2

    this.createBackground(this, 'forestBckgr-2', 3, 0.5)



    //background layer 3
    this.createBackground(this, 'forestBckgr-3', 3, 1)


    // groundtiles (temporal)
    this.ground = this.physics.add.staticGroup();

    this.ground.create(400, 568, 'basicPlataform').setScale(2).refreshBody();
    this.ground.create(1200, 568, 'basicPlataform').setScale(2).refreshBody();

    this.ground.create(600, 400, 'basicPlataform');
    this.ground.create(50, 250, 'basicPlataform');
    this.ground.create(750, 220, 'basicPlataform');

    //jugador y fisicas

    this.knight = this.physics.add.sprite(100, 450, 'knight');
    this.knight.displayWidth = 240;
    this.knight.displayHeight = 160;
    this.knight.body.setSize(20, 38);
    this.knight.body.setOffset(
      this.knight.width * 0.5 - 15,
      this.knight.height * 0.5
    );

    // this.cameras.main.startFollow(this.knight)
    // this.cameras.main.
    this.knight.setBounce(0.05);
    // this.knight.setCollideWorldBounds(true);

    //Animaciones
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 9 }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('turn', { start: 0, end: 2 }),
      frameRate: 20,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 2 }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'fall',
      frames: this.anims.generateFrameNumbers('fall', { start: 0, end: 2 }),
      frameRate: 10,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
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
      frames: this.anims.generateFrameNumbers('slide', { start: 0, end: 3 }),
      frameRate: 30
    });

    this.anims.create({
      key: 'downSwing',
      frames: this.anims.generateFrameNumbers('downAttack', { start: 0, end: 3 }),
      frameRate: 20,
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //Colliders
    this.physics.add.collider(this.knight, this.ground);


    // Camera
    this.cameras.main.startFollow(this.knight).setFollowOffset(0, 180)
    this.cameras.main.setBounds




  }

  override update() {
    console.log(this.allowMove);

    if (this.allowMove) {
      // <== Left
      if (this.cursors.left.isDown) {

        // Left Speed
        this.knight.setVelocityX(-200);

        //Animation
        if (this.knight.flipX && this.knight.body.blocked.down) {

          this.knight.anims.play('left', true);
        } else {
          // turn left
          this.knight.anims.stop();

          this.knight.flipX = true;
        }
        // hitbox adjust
        this.knight.body.setOffset(
          this.knight.width * 0.5 - 5,
          this.knight.height * 0.5
        );


        // Right ==>
      } else if (this.cursors.right.isDown) {
        // Right speed
        this.knight.setVelocityX(200);

        if (!this.knight.flipX && this.knight.body.blocked.down) {
          //Animation

          this.knight.anims.play('right', true);
        }
        else {
          //turn right
          this.knight.anims.stop();
          this.knight.flipX = false;
        }


        // hitbox adjust
        this.knight.body.setOffset(
          this.knight.width * 0.5 - 15,
          this.knight.height * 0.5
        );



      } else if (this.knight.body.blocked.down) {
        this.knight.setVelocityX(0);
        this.knight.anims.play('idle', true);
      }
      if (this.cursors.up.isDown && this.knight.body.blocked.down) {
        this.knight.anims.stop();
        this.knight.setVelocityY(-300);
        this.knight.anims.play('jump');

      }
      if (this.knight.body.angle >= 0 && !this.knight.body.blocked.down) {
        this.knight.anims.stop();
        this.knight.anims.play('fall');
      }
      if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.knight.setVelocityX(0);
        this.knight.anims.stop();
        this.blockMove(300)
        this.knight.anims.play('downSwing');

      }

    }


    //Right Dash
    if (Phaser.Input.Keyboard.JustDown(this.shiftKey) && this.knight.body.blocked.down) {
      this.knight.anims.stop();
      this.blockMove(500)
      if (this.knight.flipX) {
        this.knight.setVelocityX(-400);
      } else {
        this.knight.setVelocityX(400);
      }
      this.knight.anims.play('slide');
    }


  }

  blockMove(timeMs: number) {
    this.allowMove = false

    this.time.delayedCall(timeMs, () => {

      this.allowMove = true
    }, [], this)
  }

  createBackground(scene: Phaser.Scene, texture: string, count: number, scrollFactor: number) {
    let x = 0;
    for (let i = 0; i < count; i++) {
      const m = scene.add.image(x, scene.scale.height, texture)
        .setOrigin(0, 1).setScrollFactor(scrollFactor)
      m.displayWidth = this.sys.canvas.width;
      m.displayHeight = this.sys.canvas.height;
      x += m.width
    }
  }






  // this.forest2.displayWidth = this.sys.canvas.width;
  // this.forest2.displayHeight = this.sys.canvas.height;



}
