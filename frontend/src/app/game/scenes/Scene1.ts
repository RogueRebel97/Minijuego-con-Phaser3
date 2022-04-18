import { Game, Physics, Scene } from 'phaser';
import { delay } from 'rxjs';
import Settings from './SettingsMenu';
import Knight from '../character/knight';
import Constants from '../Constants';

export class Scene1 extends Phaser.Scene {
  // Propiedades
  // private ground!: any;
  // private knight!: any;
  // private cursors!: any;
  // private allowMove = true;
  // private shiftKey!: any;
  // private spaceKey!: any;

  private player!: Knight;

  private width!: number;
  private height!: number;

  private tileMap!: Phaser.Tilemaps.Tilemap;
  private tileSet!: Phaser.Tilemaps.Tileset;
  private tileMapLayer!: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super({ key: 'Scene1' });
  }

  init() {
    console.log('Scene1 Corriendo');
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
  }

  preload() { }

  create() {


    //background layer 1
    this.createBackground(this, 'forestBckgr-1', 12, 0)

    //background layer 2

    this.createBackground(this, 'forestBckgr-2', 12, 0.5)



    //background layer 3
    this.createBackground(this, 'forestBckgr-3', 14, 1)


    //load tile map
    this.tileMap = this.make.tilemap({ key: Constants.MAPS.LEVEL1.TILEMAPJSON, tileWidth: 16, tileHeight: 16 });
    this.physics.world.bounds.setTo(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);

    //Player
    this.tileMap.findObject(Constants.PLAYER.ID, (d: any) => {
      this.player = new Knight({
        escena: this,
        x: d.x,
        y: d.y,
        texture: Constants.PLAYER.ID
      });
    });

    //camera
    this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);
    this.cameras.main.startFollow(this.player);

    //TileSet
    this.tileSet = this.tileMap.addTilesetImage(Constants.MAPS.TILESET);

    this.tileMapLayer = this.tileMap.createLayer(Constants.MAPS.LEVEL1.PLATAFORMLAYER, this.tileSet);
    this.tileMapLayer.setCollisionByExclusion([-1]);


    this.physics.add.collider(this.player, this.tileMapLayer);













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
      frameRate: 60
    });

    this.anims.create({
      key: 'downSwing',
      frames: this.anims.generateFrameNumbers('downAttack', { start: 0, end: 3 }),
      frameRate: 20,
    });

  }

  override update() {

    this.player.update();

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









}
