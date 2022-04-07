import { Game, Physics, Scene } from 'phaser';
import Settings from './SettingsMenu';

export class Scene1 extends Phaser.Scene {
  // Propiedades
  private ground!: any;
  private knight!: any;
  private cursors!: any;

  private right = true;

  constructor() {
    super({ key: 'Scene1' });
  }

  init() {
    console.log('Scene1 Corriendo');
  }

  preload() {}

  create() {
    this.cameras.main.setBounds(0, 0, 5000, 600);

    //background layer 1
    let forest1 = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'forestBckgr-1'
    );
    let scaleX = this.cameras.main.width / forest1.width;
    let scaleY = this.cameras.main.height / forest1.height;
    let scale = Math.max(scaleX, scaleY);
    forest1.setScale(scale).setScrollFactor(0);

    //Background layer 2
    let forest2 = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'forestBckgr-2'
    );
    let scaleX2 = this.cameras.main.width / forest2.width;
    let scaleY2 = this.cameras.main.height / forest2.height;
    let scale2 = Math.max(scaleX2, scaleY2);
    forest2.setScale(scale2).setScrollFactor(0);

    //Background layer 3
    let forest3 = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'forestBckgr-3'
    );
    let scaleX3 = this.cameras.main.width / forest3.width;
    let scaleY3 = this.cameras.main.height / forest3.height;
    let scale3 = Math.max(scaleX3, scaleY3);
    forest3.setScale(scale3).setScrollFactor(0);

    // groundtiles (temporal)
    this.ground = this.physics.add.staticGroup();

    this.ground.create(400, 568, 'basicPlataform').setScale(2).refreshBody();

    this.ground.create(600, 400, 'basicPlataform');
    this.ground.create(50, 250, 'basicPlataform');
    this.ground.create(750, 220, 'basicPlataform');

    //jugador y fisicas

    this.knight = this.physics.add.sprite(100, 450, 'knight').play('idle');
    this.knight.displayWidth = 240;
    this.knight.displayHeight = 160;
    this.knight.body.setSize(20, 38);
    this.knight.body.setOffset(
      this.knight.width * 0.5 - 15,
      this.knight.height * 0.5
    );

    this.knight.setBounce(0.2);
    this.knight.setCollideWorldBounds(true);

    //Animaciones

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 9 }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'jump',
      frames: [{ key: 'jump', frame: 1 }],
      frameRate: 10,
      repeat: -1,
    });
    // this.anims.create({
    //   key: 'fall',
    //   frames: [{ key: 'fall', frame: 0 }],
    //   frameRate: 10,
    //   repeat: -1,
    // });

    this.anims.create({
      key: 'fall',
      frames: [{ key: 'dude', frame: 1 }],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
      frameRate: 20,
      repeat: -1,
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //Colliders
    this.physics.add.collider(this.knight, this.ground);
  }

  override update() {
    if (this.cursors.left.isDown) {
      this.knight.setVelocityX(-200);
      if (this.knight.body.blocked.down) {
        this.knight.anims.play('left', true);
      }
      this.knight.body.setOffset(
        this.knight.width * 0.5 - 5,
        this.knight.height * 0.5
      );
      this.knight.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.knight.setVelocityX(200);
      if (this.knight.body.blocked.down) {
        this.knight.anims.play('right', true);
      }
      this.knight.flipX = false;
      this.knight.body.setOffset(
        this.knight.width * 0.5 - 15,
        this.knight.height * 0.5
      );
    } else {
      this.knight.setVelocityX(0);
      this.knight.anims.play('idle', true);
    }
    if (this.cursors.up.isDown && this.knight.body.blocked.down) {
      this.knight.anims.stop();
      this.knight.setVelocityY(-330);
      this.knight.anims.play('jump');
      console.log(this.knight.body.velocity.y);
    }
    if (this.knight.body.velocity.y > -200 && this.knight.body.blocked.up) {
      this.knight.anims.stop();
      this.knight.anims.play('fall');
    }
  }
}
