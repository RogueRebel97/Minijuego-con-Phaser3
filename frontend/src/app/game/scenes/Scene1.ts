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

  private controls!: any


  // private slimeHPText!: Phaser.GameObjects.Text
  private width!: number;
  private height!: number;

  private tileMap!: Phaser.Tilemaps.Tilemap;
  private tileSet!: Phaser.Tilemaps.Tileset;
  private tileMapLayer!: Phaser.Tilemaps.TilemapLayer;

  private enemyCollider!: Phaser.Physics.Arcade.Collider;
  private invulnerable = false;

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

    // controles de la escena
    this.controls = this.input.keyboard.addKeys({
      'E': Phaser.Input.Keyboard.KeyCodes.E,
      'R': Phaser.Input.Keyboard.KeyCodes.R,
    })




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


    //create hud
    this.hud = new HUD(this)

    //camera
    this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);
    this.cameras.main.startFollow(this.player);

    //TileSet
    this.tileSet = this.tileMap.addTilesetImage(Constants.MAPS.TILESET);

    this.tileMapLayer = this.tileMap.createLayer(Constants.MAPS.LEVEL1.PLATAFORMLAYER, this.tileSet);
    this.tileMapLayer.setCollisionByExclusion([-1]);


    // Enemy Slime
    this.tileMap.findObject(Constants.ENEMIES.SLIME.ID, (d: any) => {
      this.slime = new Enemy({
        currentScene: this,
        x: d.x,
        y: d.y,
        texture: Constants.ENEMIES.SLIME.ID,
        maxHealth: 99999
      });
    });


    this.enemies = this.physics.add.group(this.slime);

    this.registry.set(Constants.GROUPS.ENEMIES, this.enemies)
    // console.log("enemy GRoup from Scene:" + this.registry.get(Constants.GROUPS.ENEMIES));

    this.slime.create()
    this.player.create();




    // collider Player and Ground
    this.physics.add.collider(this.player, this.tileMapLayer);

    this.physics.add.collider(this.enemies, this.tileMapLayer);
    // this.player.attack(this.slime)

    //player touch Slime
    this.enemyCollider = this.physics.add.overlap(this.slime, this.player, (slime, player) => {
      if (this.registry.get(Constants.PLAYER.STATS.HEALTH) > 0 && !this.invulnerable) {
        // this.player.getInvulnerable(1500)
        this.player.getDamage(10);
      }
    });
    this.registry.set(Constants.REGISTRY.COLLIDERS.ENEMY, this.enemyCollider)


    // console.log(this.enemies.getLength());



  }

  override update() {
    // console.log('Nivel 1 corriendo');
    let key = Phaser.Input.Keyboard;

    if (key.JustDown(this.controls.E)) {

      this.spawnEnemy()
    }

    this.player.update();
    this.player.checkIsDead();

    this.slime.update();

    if (this.slime.body) {
      this.slime.update();
      this.slime.checkIsDead();

    } else {
      return
    }

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

  spawnEnemy() {
    // Enemy Slime
    this.tileMap.findObject(Constants.ENEMIES.SLIME.ID, (d: any) => {
      this.slime = new Enemy({
        currentScene: this,
        x: d.x,
        y: d.y,
        texture: Constants.ENEMIES.SLIME.ID,
        maxHealth: 9999
      });
    });


    this.enemies = this.physics.add.group(this.slime);

    this.registry.set(Constants.GROUPS.ENEMIES, this.enemies)

    this.slime.create()

    this.physics.add.collider(this.enemies, this.tileMapLayer);

    this.enemyCollider = this.physics.add.overlap(this.slime, this.player, (slime, player) => {
      if (this.registry.get(Constants.PLAYER.STATS.HEALTH) > 0 && !this.invulnerable) {
        // this.player.getInvulnerable(1500)
        this.player.getDamage(10);
      }
    });
    this.registry.set(Constants.REGISTRY.COLLIDERS.ENEMY, this.enemyCollider)

    this.physics.add.collider(this.slime, this.enemies)

  }









}
