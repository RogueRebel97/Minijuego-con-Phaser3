import { Game, Physics, Scene } from 'phaser';
import { delay } from 'rxjs';
import Settings from './SettingsMenu';
import Knight from '../character/knight';
import Constants from '../Constants';

export class Scene1 extends Phaser.Scene {
  // Propiedades
  private player!: Knight;

  private slime!: Phaser.Physics.Arcade.Sprite
  private width!: number;
  private height!: number;

  private tileMap!: Phaser.Tilemaps.Tilemap;
  private tileSet!: Phaser.Tilemaps.Tileset;
  private tileMapLayer!: Phaser.Tilemaps.TilemapLayer;


  private maxHealth!: number;
  private healthValue!: number;


  private dmgButton!: Phaser.GameObjects.Text;
  private slimemove: boolean = true;


  private gameOver = false;

  constructor() {
    super({ key: 'Scene1' });
  }

  init() {
    console.log('Scene1 Corriendo');
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    //Inicializar variables globales
    this.maxHealth = 100
    this.healthValue = this.maxHealth;

    this.registry.set(Constants.REGISTRY.MAXHEALTH, this.maxHealth)
    this.registry.set(Constants.REGISTRY.HEALTH, this.healthValue)


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
        currentScene: this,
        x: d.x,
        y: d.y,
        texture: Constants.PLAYER.ID
      });
    });
    this.player.create();

    //camera
    this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);
    this.cameras.main.startFollow(this.player);

    //TileSet
    this.tileSet = this.tileMap.addTilesetImage(Constants.MAPS.TILESET);

    this.tileMapLayer = this.tileMap.createLayer(Constants.MAPS.LEVEL1.PLATAFORMLAYER, this.tileSet);
    this.tileMapLayer.setCollisionByExclusion([-1]);




    this.dmgButton = this.add.text(this.width - 50, 20, 'Daño', { fontSize: '20px', color: '#FFFFFF' }).setInteractive();


    // Test dmg function
    this.dmgButton.on('pointerdown', () => {
      this.healthValue = this.healthValue - 10

      if (this.healthValue <= 0 && !this.gameOver) {
        this.gameOver = true;
        this.player.playerDead();
      }

      if (this.registry.get(Constants.REGISTRY.HEALTH) > 0) {
        this.registry.set(Constants.REGISTRY.HEALTH, this.healthValue);
        this.events.emit(Constants.EVENTS.HEALTH);
      }

    });





    this.anims.create({
      key: 'idleSlime',
      frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 9 }),
      frameRate: 20,
      repeat: -1,
    });


    // Enemie Test

    this.slime = this.physics.add.sprite(695, 505, 'slime').play('idleSlime')
    this.slime.body.immovable = true




    const damaged = () => {
      console.log(this.player);

    }
  }

  override update() {
    this.physics.add.collider(this.player, this.tileMapLayer);
    this.physics.add.collider(this.slime, this.tileMapLayer);
    this.physics.add.collider(this.slime, this.player, this.getDamaged);




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

  // GameOver() {



  // }

  getDamaged(slime: any, player: any) {
    player.setVelocityX(200);
    // player.anims('hit')

  }




}
