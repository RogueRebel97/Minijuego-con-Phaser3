import { Game, Physics, Scene } from 'phaser';
import { delay } from 'rxjs';
import Knight from '../character/knight';
import Enemy from '../enemies/enemy';
import Constants from '../Constants';
import HUD from './hud';


export class Scene1 extends Phaser.Scene {
  // Propiedades
  private player!: Knight;
  private hud!: HUD
  private slime!: Enemy

  private enemies!: Physics.Arcade.Group

  private enemyCollider!: Phaser.Physics.Arcade.Collider;
  private invulnerable = false;

  private controls!: any

  private width!: number;
  private height!: number;

  // Tilemap y Tilegroup
  private tileMap!: Phaser.Tilemaps.Tilemap;
  private tileSets!: Phaser.Tilemaps.Tileset[];
  private mapLayers!: Phaser.Tilemaps.TilemapLayer[]

  //Tilesets
  private plainsTileSet_1!: Phaser.Tilemaps.Tileset;
  private plainsTileSet_2!: Phaser.Tilemaps.Tileset;
  private plainsDecors!: Phaser.Tilemaps.Tileset

  //TilemapLayers
  private plataformsLayer!: Phaser.Tilemaps.TilemapLayer;
  private wallsLayer!: Phaser.Tilemaps.TilemapLayer;

  private decorsLayer1!: Phaser.Tilemaps.TilemapLayer;
  private decorsLayer2!: Phaser.Tilemaps.TilemapLayer;
  private decorsLayer3!: Phaser.Tilemaps.TilemapLayer;

  private backgroundsLayer1!: Phaser.Tilemaps.TilemapLayer
  private backgroundsLayer2!: Phaser.Tilemaps.TilemapLayer

  private tileMapLayer!: Phaser.Tilemaps.TilemapLayer;



  constructor() {
    super({ key: 'Scene1' });


  }

  init() {
    // console.log('Scene1 Corriendo');

    // this.scene.launch('hud');
    // this.scene.bringToTop('hud')
    this.scene.launch('ui-scene')
    this.scene.bringToTop('ui-scene')

    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
  }

  create() {

    // MAP & Background

    //background layer 1
    // this.createBackground(this, 'plainsSky', 12, 0)

    //background layer 2
    // this.createBackground(this, 'plainsBG1', 12, 0.5)

    //background layer 3
    // this.createBackground(this, 'plainsBG2', 14, 1)

    const sky = this.add.image(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, 'plainsSky')
    sky.displayWidth = this.sys.canvas.width;
    sky.displayHeight = this.sys.canvas.height;

    const bg1 = this.add.image(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, 'plainsBG1')
    bg1.displayWidth = this.sys.canvas.width;
    bg1.displayHeight = this.sys.canvas.height;

    const bg2 = this.add.image(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, 'plainsBG2')
    bg2.displayWidth = this.sys.canvas.width;
    bg2.displayHeight = this.sys.canvas.height;

    //load tile map
    this.tileMap = this.make.tilemap({ key: Constants.MAPS.LEVELS.LEVEL1.TILEMAPJSON, tileWidth: 16, tileHeight: 16 });
    this.physics.world.bounds.setTo(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);

    //TileSet & decors
    this.plainsTileSet_1 = this.tileMap.addTilesetImage(Constants.MAPS.SCENERY.PLAINS.TILESET.PLAINS_1);
    this.plainsTileSet_2 = this.tileMap.addTilesetImage(Constants.MAPS.SCENERY.PLAINS.TILESET.PLAINS_2);
    this.plainsDecors = this.tileMap.addTilesetImage(Constants.MAPS.SCENERY.PLAINS.DECORATOR.PLAINSDECORS)
    this.tileSets = [this.plainsTileSet_1, this.plainsTileSet_2, this.plainsDecors] //Add every tileset and decor to Tileset Group


    //Layers
    this.decorsLayer3 = this.tileMap.createLayer(Constants.MAPS.LEVELS.LEVEL1.LAYER.DECORS.LAYER3, this.tileSets)
    this.decorsLayer2 = this.tileMap.createLayer(Constants.MAPS.LEVELS.LEVEL1.LAYER.DECORS.LAYER2, this.tileSets)
    this.decorsLayer1 = this.tileMap.createLayer(Constants.MAPS.LEVELS.LEVEL1.LAYER.DECORS.LAYER1, this.tileSets)


    this.backgroundsLayer2 = this.tileMap.createLayer(Constants.MAPS.LEVELS.LEVEL1.LAYER.BACKGROUND.BG2, this.tileSets)
    this.backgroundsLayer1 = this.tileMap.createLayer(Constants.MAPS.LEVELS.LEVEL1.LAYER.BACKGROUND.BG1, this.tileSets)

    this.wallsLayer = this.tileMap.createLayer(Constants.MAPS.LEVELS.LEVEL1.LAYER.PLATAFORMS.WALLS, this.tileSets)
    this.plataformsLayer = this.tileMap.createLayer(Constants.MAPS.LEVELS.LEVEL1.LAYER.PLATAFORMS.PLATAFORMS, this.tileSets)
    this.mapLayers = [this.plataformsLayer, this.wallsLayer, this.decorsLayer1, this.decorsLayer2, this.decorsLayer3, this.backgroundsLayer1, this.backgroundsLayer2]

    for (let i = 0; i < this.mapLayers.length; i++) {
      // console.log(this.mapLayers[i]);
      this.mapLayers[i].setCollisionByExclusion([-1])
    }

    //Player
    this.tileMap.findObject(Constants.PLAYER.ID, (d: any) => {
      this.player = new Knight({
        currentScene: this,
        x: d.x,
        y: d.y,
        texture: Constants.PLAYER.ID
      });
    });
    this.registry.set(Constants.GROUPS.PLAYER, this.player)

    // Enemy Slime
    this.tileMap.findObject(Constants.ENEMIES.SLIME.ID, (d: any) => {
      this.slime = new Enemy({
        currentScene: this,
        x: d.x,
        y: d.y,
        texture: Constants.ENEMIES.SLIME.ID,
        maxHealth: 999
      });
    });
    this.enemies = this.physics.add.group(this.slime);

    this.registry.set(Constants.GROUPS.ENEMIES, this.enemies);

    this.slime.create()
    this.player.create();

    //create hud
    this.hud = new HUD(this)

    //camera
    this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoom = 2;


    // Colliders
    this.physics.add.collider(this.player, this.plataformsLayer);
    this.physics.add.collider(this.player, this.wallsLayer);

    // enemies and platforms
    this.physics.add.collider(this.enemies, this.plataformsLayer, (slime: any, platform: any) => {
      if (slime.body.velocity.x > 0 && slime.body.x > platform.x + (platform.width - slime.body.width) ||
        slime.body.velocity.x < 0 && slime.body.x < platform.x) {
        slime.body.velocity.x *= -1
      }

      console.log(platform);



    });
    this.physics.add.collider(this.enemies, this.wallsLayer);




    //player touch Slime
    this.enemyCollider = this.physics.add.overlap(this.slime, this.player, (slime, player) => {
      if (this.registry.get(Constants.PLAYER.STATS.HEALTH) > 0 && !this.invulnerable) {
        // this.player.getInvulnerable(1500)
        this.player.getDamage(10);
      }
    });
    this.registry.set(Constants.REGISTRY.COLLIDERS.ENEMY, this.enemyCollider)
  }

  override update() {
    // console.log('Nivel 1 corriendo');
    let key = Phaser.Input.Keyboard;

    // if (key.JustDown(this.controls.E)) {

    //   this.spawnEnemy()
    // }

    this.player.update();
    this.player.checkIsDead();

    this.slime.update();

    if (this.slime.body) {
      this.slime.update();
      this.slime.checkIsDead();

    } else {
      return
    }

    this.slime.resetChase();
  }


  createBackground(scene: Phaser.Scene, texture: string, count: number, scrollFactor: number) {
    let x = 0;
    for (let i = 0; i < count; i++) {
      const img = scene.add.image(x, scene.scale.height, texture)
        .setOrigin(0, 1).setScrollFactor(scrollFactor)
      img.displayWidth = this.sys.canvas.width;
      img.displayHeight = this.sys.canvas.height;
      x += img.width
    }
  }

  spawnEnemy() {
    // Enemy Slime
    // this.tileMap.findObject(Constants.ENEMIES.SLIME.ID, (d: any) => {
    //   this.slime = new Enemy({
    //     currentScene: this,
    //     x: d.x,
    //     y: d.y,
    //     texture: Constants.ENEMIES.SLIME.ID,
    //     maxHealth: 999
    //   });
    // });


    // this.enemies = this.physics.add.group(this.slime);

    // this.registry.set(Constants.GROUPS.ENEMIES, this.enemies)

    // this.slime.create()

    // this.physics.add.collider(this.enemies, this.tileMapLayer_1);

    // this.enemyCollider = this.physics.add.overlap(this.slime, this.player, (slime, player) => {
    //   if (this.registry.get(Constants.PLAYER.STATS.HEALTH) > 0 && !this.invulnerable) {
    //     // this.player.getInvulnerable(1500)
    //     this.player.getDamage(10);
    //   }
    // });
    // this.registry.set(Constants.REGISTRY.COLLIDERS.ENEMY, this.enemyCollider)

    // this.physics.add.collider(this.slime, this.enemies)

  }









}
