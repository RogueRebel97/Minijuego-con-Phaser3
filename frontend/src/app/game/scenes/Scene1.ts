import { Game, Physics, Scene } from 'phaser';
import { delay, map } from 'rxjs';
import Knight from '../character/knight';
import Slime from '../enemies/slime';
import Constants from '../Constants';
import HUD from './hud';


export class Scene1 extends Phaser.Scene {
  // Propiedades
  private player!: Knight;
  private hud!: HUD
  private slime!: Slime

  private slimes!: Physics.Arcade.Group

  private enemyCollider!: Phaser.Physics.Arcade.Collider;
  private deathZoneCollider!: Phaser.Physics.Arcade.Collider;
  // private invulnerable = false;

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

  private invisibleWallsPlayer!: Phaser.Tilemaps.TilemapLayer
  private invisibleWallsEnemy!: Phaser.Tilemaps.TilemapLayer
  private deathZone!: Phaser.Tilemaps.TilemapLayer
  private slimeLayer!: Phaser.Tilemaps.ObjectLayer

  private tileMapLayer!: Phaser.Tilemaps.TilemapLayer;



  constructor() {
    super({ key: 'Scene1' });

    console.log('constructor iniciado');


  }

  init() {
    console.log('Scene1 init Corriendo');

    // this.scene.launch('hud');
    // this.scene.bringToTop('hud')
    this.scene.launch('ui-scene')
    this.scene.bringToTop('ui-scene')

    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
  }

  create() {
    console.log('create iniciado');
    // MAP & Background

    //background layer 1
    this.createBackground(this, 'plainsSky', 1, 0)

    //background layer 2
    this.createBackground(this, 'plainsBG1', 15, 0.5)

    //background layer 3
    this.createBackground(this, 'plainsBG2', 15, 1)

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
    this.invisibleWallsEnemy = this.tileMap.createLayer('InvisibleWalls/enemywalls', this.tileSets)
    this.invisibleWallsPlayer = this.tileMap.createLayer('InvisibleWalls/playerWalls', this.tileSets)
    this.deathZone = this.tileMap.createLayer('deathZone/deathZone', this.tileSets)
    this.deathZone.setAlpha(0)


    this.mapLayers = [this.plataformsLayer, this.wallsLayer, this.decorsLayer1, this.decorsLayer2, this.decorsLayer3,
    this.backgroundsLayer1, this.backgroundsLayer2, this.invisibleWallsEnemy, this.invisibleWallsPlayer, this.deathZone]

    for (let i = 0; i < this.mapLayers.length; i++) { //innecesario añadir .setCollisions... despues de definir cada Layer
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
    this.tileMap.findObject('slimes', (d: any) => {
      this.slime = new Slime({
        currentScene: this,
        x: d.x,
        y: d.y,
        texture: Constants.ENEMIES.SLIME.ID,
        maxHealth: 30
      });
    });

    // this.slimes = this.physics.add.group({
    //   classType: Slime,
    //   createCallback: (go) => {
    //     const slimeGo = go as Slime
    //     slimeGo.body.onCollide = true
    //   }
    // })


    // this.slimeLayer = this.tileMap.getObjectLayer('slimes')
    // this.slimeLayer.objects.forEach(slimeObj => {
    //   this.slime = new Slime({
    //     currentScene: this,
    //     x: slimeObj.x,
    //     y: slimeObj.y,
    //     texture: Constants.ENEMIES.SLIME.ID,
    //     maxHealth: 30
    //   })
    // })

    this.slimes = this.physics.add.group(this.slime);
    this.registry.set(Constants.GROUPS.ENEMIES, this.slimes);

    this.slime.create()
    this.player.create();

    //create hud
    this.hud = new HUD(this)

    //camera
    this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels); //fijar camara a los limtes del mapa con tileset
    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoom = 2;


    // Colliders
    this.physics.add.collider(this.player, this.plataformsLayer);
    this.physics.add.collider(this.player, this.wallsLayer);
    this.physics.add.collider(this.player, this.invisibleWallsPlayer)
    this.deathZoneCollider = this.physics.add.collider(this.player, this.deathZone, (deathzone, player) => {
      this.cameras.main.stopFollow()
      this.player.getDamage(999)
      this.cameras.main.stopFollow
      this.physics.world.removeCollider(this.deathZoneCollider)
    })



    // enemies and platforms and Walls
    this.physics.add.collider(this.slimes, this.plataformsLayer)
    this.physics.add.collider(this.slimes, this.wallsLayer);
    this.physics.add.collider(this.slimes, this.invisibleWallsEnemy);


    //player touch Slime
    this.enemyCollider = this.physics.add.overlap(this.slime, this.player, (slime, player) => {
      this.player.getDamage(10);

    });
    this.registry.set(Constants.REGISTRY.COLLIDERS.ENEMY, this.enemyCollider)


    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.player.removeAllListeners()
      this.slimes.removeAllListeners()
    })
  }

  override update() {
    console.log('Nivel 1 update  corriendo');

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
      x += img.displayWidth
    }
  }

  endScene() {
    console.log("Escena Detenida");

  }









}
