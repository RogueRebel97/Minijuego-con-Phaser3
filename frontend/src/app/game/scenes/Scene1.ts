import { Game, Physics, Scene } from 'phaser';
import { delay, map } from 'rxjs';
import Knight from '../character/knight';
import Slime from '../enemies/slime';
import Constants from '../Constants';
import HUD from './hud';
import GameOver from './GameOver';


export class Scene1 extends Phaser.Scene {
  // Propiedades
  private player!: Knight;
  private hud!: HUD
  // private slime!: Slime

  private slimes!: Physics.Arcade.Group
  private arraySlimes!: Slime[]

  // Colliders para Registro
  private enemyCollider!: Phaser.Physics.Arcade.Collider;
  private deathZoneCollider!: Phaser.Physics.Arcade.Collider;
  private platformsColliders!: Phaser.Physics.Arcade.Collider;
  private goalCollider!: Phaser.Physics.Arcade.Collider;
  private gameOver!: boolean;
  private win!: boolean;

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
  private goalLayer!: Phaser.Tilemaps.TilemapLayer

  private tileMapLayer!: Phaser.Tilemaps.TilemapLayer;


  private GameOverScreen!: GameOver;


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

    this.win = false;
    this.gameOver = false

    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    this.slimes = this.physics.add.group()
    this.arraySlimes = []
  }

  create() {
    console.log('create iniciado');
    //Efecto fadeIN
    this.cameras.main.fadeIn(1000, 0, 0, 0);


    // MAP & Background

    //background layer 1
    this.createBackground(this, 'plainsSky', 1, 0)

    //background layer 2
    this.createBackground(this, 'plainsBG1', 15, 0.5)

    //background layer 3
    this.createBackground(this, 'plainsBG2', 15, 1) //Todo: Reducir Tamañao

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

    //Invisible Zones (alpha 0)
    this.deathZone = this.tileMap.createLayer('deathZone/deathZone', this.tileSets)
    this.goalLayer = this.tileMap.createLayer('InvisibleWalls/goal', this.tileSets)
    this.goalLayer.setAlpha(0)
    this.deathZone.setAlpha(0)
    this.invisibleWallsEnemy.setAlpha(0)
    this.invisibleWallsPlayer.setAlpha(0)

    //Add layers to mapLayers Array.
    this.mapLayers = [this.plataformsLayer, this.wallsLayer, this.decorsLayer1, this.decorsLayer2, this.decorsLayer3,
    this.backgroundsLayer1, this.backgroundsLayer2, this.invisibleWallsEnemy, this.invisibleWallsPlayer, this.deathZone, this.goalLayer]

    for (let i = 0; i < this.mapLayers.length; i++) { //innecesario añadir .setCollisions... despues de definir cada Layer

      this.mapLayers[i].setCollisionByExclusion([-1])


    }
    //Plataforms Collide


    // Plataform Layers Colision: Only up
    this.plataformsLayer.layer.data.forEach((row) => {
      row.forEach((tile) => {
        tile.collideDown = false
        tile.collideLeft = false
        tile.collideRight = false
        tile.collideUp = true
      })
    })


    this.registry.set(Constants.REGISTRY.COLLIDERS.PLATFORMS, this.plataformsLayer)

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

    this.player.setCollideWorldBounds(true)

    // this.platformsColliders = this.physics.add.collider(this.player, this.plataformsLayer);
    // this.registry.set(Constants.REGISTRY.COLLIDERS.PLATFORMS, this.platformsColliders)


    // Crear enemigos:

    this.slimeLayer = this.tileMap.getObjectLayer('slimes')
    this.slimeLayer.objects.forEach(slimeObj => {
      // console.log(slimeObj);
      const slime = new Slime({
        currentScene: this,
        x: slimeObj.x,
        y: slimeObj.y,
        texture: Constants.ENEMIES.SLIME.BLUE.ANIMATIONS.IDLE_RUN,
        maxHealth: 30
      })
      // this.slimes = this.physics.add.group(slime);
      this.slimes.add(slime); //add slime to  Physics.Arcade.Group
      this.arraySlimes.push(slime) // push slime into Array of Slime (class)
      this.physics.add.collider(slime, this.plataformsLayer)
      this.physics.add.collider(slime, this.wallsLayer);
      this.physics.add.collider(slime, this.invisibleWallsEnemy);

    })

    this.registry.set(Constants.GROUPS.ENEMIES, this.slimes);

    // this.slime.create()
    this.player.create();

    //create hud
    this.hud = new HUD(this)

    //camera
    this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels); //fijar camara a los limtes del mapa con tileset
    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoom = 2;

    // Player Colliders










    this.physics.add.collider(this.player, this.wallsLayer);
    this.physics.add.collider(this.player, this.invisibleWallsPlayer);

    //Player and Goal zone
    this.goalCollider = this.physics.add.collider(this.player, this.goalLayer, (goal, player) => {
      this.player.reachGoal()
      this.win = true;
    })

    this.registry.set(Constants.REGISTRY.COLLIDERS.GOAL, this.goalCollider)

    //Player andDeath zone
    this.deathZoneCollider = this.physics.add.collider(this.player, this.deathZone, (deathzone, player) => {
      this.player.deathFall()

    })

    this.registry.set(Constants.REGISTRY.COLLIDERS.DEATHZONE, this.deathZoneCollider)


    //player touch Slime
    this.enemyCollider = this.physics.add.overlap(this.slimes, this.player, (slime, player) => {
      this.player.getDamage(10);
    });
    this.registry.set(Constants.REGISTRY.COLLIDERS.ENEMY, this.enemyCollider)


    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.player.removeAllListeners()
      this.slimes.removeAllListeners()
    })


    for (let i = 0; i < this.arraySlimes.length; i++) {
      console.log(this.arraySlimes[i]);

    }

  }

  override update() {

    // console.log('Nivel 1 update  corriendo');
    if (this.player.body) {
      this.player.update();
      this.player.checkIsDead();
    }
    else {
      return
    }

    this.slimeLogic()

    // console.log(this.arraySlimes)

    if (this.player.deathCheck() && !this.gameOver) {
      this.gameOver = true

      this.time.delayedCall(1000, () => {
        this.scene.stop('ui-scene')
        this.scene.launch('gameOver', { defeat: true })
        this.scene.bringToTop('gameOver')
        console.log('muertoooo');
      }, [], this);

    } else if (this.win && !this.player.deathCheck()) {
      this.win = false
      this.time.delayedCall(700, () => {
        this.scene.stop('ui-scene')
        this.scene.launch('gameOver', { defeat: false })
        this.scene.bringToTop('gameOver')
        console.log('victoria');
      }, [], this);
    }
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



  slimeLogic() {
    for (let i = 0; i < this.arraySlimes.length; i++) {
      if (this.arraySlimes[i].body && !this.arraySlimes[i].deathCheck()) {
        this.arraySlimes[i].update()
        this.arraySlimes[i].checkIsDead()
        this.arraySlimes[i].resetChase()
      }

    }


  }

  // platformColliding() {
  //   this.player.checkPlatformCollider(true)
  // }

  // checkPlatformColliding() {
  //   this.player.checkPlatformCollider(false)
  // }








}
