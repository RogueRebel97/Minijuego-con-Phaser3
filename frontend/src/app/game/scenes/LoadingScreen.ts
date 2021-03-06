import { Injectable } from '@angular/core';
import * as Phaser from 'phaser';
import Constants from '../Constants';

@Injectable({
  providedIn: 'root',
})



export class LoadingScreen extends Phaser.Scene {


  constructor() {
    super({
      key: 'LoadingScreen', pack: {
        files: [
          { type: 'image', key: 'intro-1', url: 'assets/Intro/800x600/INTRO-1.png' },
          { type: 'image', key: 'intro-2', url: 'assets/Intro/800x600/INTRO-2.png' },
          { type: 'image', key: 'intro-3', url: 'assets/Intro/800x600/INTRO-3.png' },
          { type: 'image', key: 'intro-4', url: 'assets/Intro/800x600/INTRO-4.png' },
          { type: 'image', key: 'intro-5', url: 'assets/Intro/800x600/INTRO-5.png' },
          { type: 'image', key: 'intro-6', url: 'assets/Intro/800x600/INTRO-6.png' },
          { type: 'image', key: 'intro-7', url: 'assets/Intro/800x600/INTRO-7.png' },
          { type: 'image', key: 'intro-8', url: 'assets/Intro/800x600/INTRO-8.png' },
          { type: 'image', key: 'intro-9', url: 'assets/Intro/800x600/INTRO-9.png' },
          { type: 'image', key: 'intro-10', url: 'assets/Intro/800x600/INTRO-10.png' },
          { type: 'image', key: 'intro-11', url: 'assets/Intro/800x600/INTRO-11.png' },
        ]
      }
    });
  }

  init() {

  }


  preload() {

    var background = this.add.image(400, 300, 'intro-1')

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    //console.log('loadingScreen');



    // Barra de Carga
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 370, 320, 50);

    //Texto barra de carga
    var loadingText = this.make.text({
      x: width / 2,
      y: 345,
      text: 'Cargando...',
      style: {
        fontFamily: 'pixel',
        fontSize: '20px',
        color: '#FF0000',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    //Porcentaje barra de carga
    var percentText = this.make.text({
      x: width / 2,
      y: 395,
      text: '0%',
      style: {
        fontFamily: 'pixel',
        fontSize: '18px',
        color: '#FF0000',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    //Info de archivo cargado
    // var assetText = this.make.text({
    //   x: width / 2,
    //   y: height / 2 + 50,
    //   text: '',
    //   style: {
    //     fontFamily: 'pixel',
    //     fontSize: '18px',
    //     color: '#FF0000',
    //   },
    // });
    // assetText.setOrigin(0.5, 0.5);

    //Assets a cargar

    // Assets for Menu
    this.load.image(
      'settingPanelRed',
      'assets/graphics/uiAssets/PNG/metalPanel_red.png'
    );

    this.load.image(
      'glass-panel',
      'assets/graphics/uiAssets/PNG/glassPanel.png'
    );

    this.load.image(
      'glass-panel_Corners',
      'assets/graphics/uiAssets/PNG/glassPanel_corners.png'
    );

    this.load.image(
      'cursor-hand',
      'assets/graphics/uiAssets/PNG/cursor_hand.png'
    );

    this.load.image(
      'setting_panelv2',
      'assets/graphics/uiAssets/PNG/metalPanel_blueCornerV2.png'
    );
    this.load.image(
      'setting_panelv1',
      'assets/graphics/uiAssets/PNG/metalPanel_blueCornerV1.png'
    );
    this.load.image(
      'setting_panel',
      'assets/graphics/uiAssets/PNG/metalPanel_blue.png'
    );
    this.load.image(
      'small_button',
      'assets/graphics/uiAssets2/PNG/grey_button07.png'
    );
    this.load.image(
      'option_button',
      'assets/graphics/gameIcons/PNG/Black/1x/gear.png'
    );
    this.load.image(
      'checkmark',
      'assets/graphics/uiAssets2/PNG/blue_checkmark.png'
    );
    this.load.image(
      'menuButton-1',
      'assets/graphics/uiAssets2/PNG/grey_button03.png'
    );
    this.load.image(
      'menuButton-2',
      'assets/graphics/uiAssets2/PNG/grey_button04.png'
    );

    this.load.image(
      'red_button1',
      'assets/graphics/uiAssets2/PNG/red_button11.png'
    );

    this.load.image(
      'red_button2',
      'assets/graphics/uiAssets2/PNG/red_button12.png'
    );
    this.load.image(
      'red_button3',
      'assets/graphics/uiAssets2/PNG/red_button13.png'
    );

    this.load.image(
      'cross',
      'assets/graphics/gameIcons/PNG/Black/1x/cross.png'
    );

    this.load.image(
      'returnB',
      'assets/graphics/gameIcons/PNG/Black/1x/return.png'
    );
    this.load.image(
      'returnW',
      'assets/graphics/gameIcons/PNG/White/1x/return.png'
    );


    this.load.image(
      'icono1',
      'assets/graphics/gameIcons/icono1.png'
    );

    this.load.image(
      'icono2',
      'assets/graphics/gameIcons/icono2.png'
    );


    //Maps
    this.load.tilemapTiledJSON(Constants.MAPS.LEVELS.LEVEL1.TILEMAPJSON, 'assets/tileMaps/Level-1.json')

    //Tilesets
    this.load.image(Constants.MAPS.SCENERY.BASIC.TILESET.BASICTERRAIN, 'assets/graphics/tileSets/basicTerrain.png')
    this.load.image(Constants.MAPS.SCENERY.PLAINS.TILESET.PLAINS_1, 'assets/graphics/tileSets/plainsTileset1.png')
    this.load.image(Constants.MAPS.SCENERY.PLAINS.TILESET.PLAINS_2, 'assets/graphics/tileSets/plainsTileset2.png')
    this.load.image(Constants.MAPS.SCENERY.FOREST.TILESET.WOODSTERRAIN, 'assets/graphics/tileSets/woodTerrain.png')

    //Decorations
    this.load.image(Constants.MAPS.SCENERY.PLAINS.DECORATOR.PLAINSDECORS, 'assets/graphics/decorations/plainsDecors.png')

    this.load.image("shop", 'assets/graphics/decorations/Forestdecorations/shop.png')


    // Backgrounds for Map

    //Night
    this.load.image(
      'nightBckgr-1',
      'assets/graphics/background/background_full.png'
    );
    this.load.image(
      'nightBckgr-2',
      'assets/graphics/background/background_1Full.png'
    );
    this.load.image(
      'nightBckgr-3',
      'assets/graphics/background/background_2Full.png'
    );

    //Forest
    this.load.image(
      'forestBckgr-1',
      'assets/SpritesSheets/oak_woods_v1.0/background/background_layer_1.png'
    );
    this.load.image(
      'forestBckgr-2',
      'assets/SpritesSheets/oak_woods_v1.0/background/background_layer_2.png'
    );
    this.load.image(
      'forestBckgr-3',
      'assets/SpritesSheets/oak_woods_v1.0/background/background_layer_3.png'
    );
    // Night Forest

    this.load.image(
      'NforestBckgr-1',
      'assets/SpritesSheets/oak_woods_v1.0/background/NOCHE_background_layer_1.png'
    );
    this.load.image(
      'NforestBckgr-2',
      'assets/SpritesSheets/oak_woods_v1.0/background/NOCHE_background_layer_2.png'
    );
    this.load.image(
      'NforestBckgr-3',
      'assets/SpritesSheets/oak_woods_v1.0/background/NOCHE_background_layer_3logo.png'
    );

    this.load.image(
      'iMageCretive',
      'assets/imagecretive_CREDITOS.png'
    );

    //plains
    this.load.image('plainsSky', 'assets/SpritesSheets/plains/BG1.png')
    this.load.image('plainsBG1', 'assets/SpritesSheets/plains/BG2.png')
    this.load.image('plainsBG2', 'assets/SpritesSheets/plains/BG3.png')


    //Character Portrait
    this.load.image('portrait', 'assets/Token/tokenNormal.png')
    this.load.image('portraitWound', 'assets/Token/TokenHerido.png')

    // SpriteSheets del caballero
    this.load.spritesheet(
      Constants.PLAYER.ID,
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_Idle.png',
      { frameWidth: 120, frameHeight: 80 }
    );
    this.load.spritesheet(
      'run',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_Run.png',
      { frameWidth: 120, frameHeight: 80 }
    );
    this.load.spritesheet(
      'jump',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_Jump.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'fall',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_Fall.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    // this.load.spritesheet(
    //   'dash',
    //   'assets/SpritesSheets/FreeKnight/FinalColorOutline/_Dash.png',
    //   { frameWidth: 120, frameHeight: 80 }
    // );

    this.load.spritesheet(
      'downAttack_noMove',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_AttackNoMovement.png',
      { frameWidth: 120, frameHeight: 80 }
    );
    this.load.spritesheet(
      'swing_noMove',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_Attack2NoMovement.png',
      { frameWidth: 120, frameHeight: 80 }
    );
    this.load.spritesheet(
      'downAttack',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_Attack.png',
      { frameWidth: 120, frameHeight: 80 }
    );
    this.load.spritesheet(
      'swing',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_Attack2.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'crouchAttack',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_CrouchAttack.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'slide',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_SlideFull.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'death',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_Death.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'hit',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_Hit.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'crouch',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_CrouchFull.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'crouchWalk',
      'assets/SpritesSheets/FreeKnight/FinalColorOutline/_CrouchWalk.png',
      { frameWidth: 120, frameHeight: 80 }
    );


    // Enemies
    // Green Slime
    // this.load.spritesheet(
    //   Constants.ENEMIES.SLIME.GREEN.ANIMATIONS.IDLE_RUN,
    //   'assets/SpritesSheets/Enemies/Slime/Idle-Run.png',
    //   { frameWidth: 44, frameHeight: 30 }
    // );
    // this.load.spritesheet(
    //   Constants.ENEMIES.SLIME.GREEN.ANIMATIONS.HIT,
    //   'assets/SpritesSheets/Enemies/Slime/Hit(44x30).png',
    //   { frameWidth: 44, frameHeight: 30 }
    // );
    // this.load.spritesheet(
    //   'gSlimeParticles',
    //   'assets/SpritesSheets/Enemies/Slime/Particles(62x16).png',
    //   { frameWidth: 62, frameHeight: 16 }
    // );

    // Blue Slime
    this.load.spritesheet(
      Constants.ENEMIES.SLIME.BLUE.ANIMATIONS.IDLE_RUN,
      'assets/SpritesSheets/Enemies/Slime/2Idle-Run.png',
      { frameWidth: 44, frameHeight: 30 }
    );
    this.load.spritesheet(
      Constants.ENEMIES.SLIME.BLUE.ANIMATIONS.HIT,
      'assets/SpritesSheets/Enemies/Slime/2Hit(44x30).png',
      { frameWidth: 44, frameHeight: 30 }
    );
    // this.load.spritesheet(
    //   'bSlimeParticles',
    //   'assets/SpritesSheets/Enemies/Slime/2Particles(62x16).png',
    //   { frameWidth: 62, frameHeight: 16 }
    // );

    // Purple Slime
    // this.load.spritesheet(
    //   Constants.ENEMIES.SLIME.PURPLE.ANIMATIONS.IDLE_RUN,
    //   'assets/SpritesSheets/Enemies/Slime/2Idle-Run.png',
    //   { frameWidth: 44, frameHeight: 30 }
    // );
    // this.load.spritesheet(
    //   Constants.ENEMIES.SLIME.PURPLE.ANIMATIONS.HIT,
    //   'assets/SpritesSheets/Enemies/Slime/2Hit(44x30).png',
    //   { frameWidth: 44, frameHeight: 30 }
    // );
    // this.load.spritesheet(
    //   'pSlimeParticles',
    //   'assets/SpritesSheets/Enemies/Slime/2Particles(62x16).png',
    //   { frameWidth: 62, frameHeight: 16 }
    // );

    //Goblin atlas
    this.load.atlas('goblinAtlas',
      'assets/SpritesSheets/Enemies/Goblin/goblinTank/goblinTank-0.png',
      'assets/SpritesSheets/Enemies/Goblin/goblinTank/goblinTank.json'
    )

    // Archer Goblin SpriteSheet
    this.load.spritesheet(
      'goblinArcher',
      'assets/SpritesSheets/Enemies/Goblin/GoblinArcher/ArcherIdle.png',
      { frameWidth: 600, frameHeight: 500 }
    );


    //Trampas
    this.load.spritesheet(
      'sawTrap1',
      'assets/SpritesSheets/traps/saw/SawTrap-Level1.png',
      { frameWidth: 64, frameHeight: 64 }
    );

    // Frutas
    // this.load.spritesheet(
    //   'melon',
    //   'assets/SpritesSheets/fruits/Melon.png',
    //   { frameWidth: 32, frameHeight: 32 }
    // );

    this.load.spritesheet(
      'nut',
      'assets/SpritesSheets/fruits/imagecreative.png',
      { frameWidth: 32, frameHeight: 32 }
    );

    this.load.image(
      'fruitTxT',
      'assets/SpritesSheets/fruits/vidaText.png'
    );
    this.load.image(
      'finalMsg',
      'assets/SpritesSheets/fruits/mensajeFinal.png'
    );
    this.load.image(
      'redOrb',
      'assets/SpritesSheets/items/redOrb.png'
    );
    this.load.image(
      'emerald',
      'assets/SpritesSheets/items/emerald.png'
    );

    this.load.spritesheet(
      'collected',
      'assets/SpritesSheets/fruits/Collected.png',
      { frameWidth: 32, frameHeight: 32 }
    );



    // Barra de salud
    this.load.image(
      'left-cap',
      'assets/graphics/uiAssets/PNG/barHorizontal_green_left.png'
    );
    this.load.image(
      'middle',
      'assets/graphics/uiAssets/PNG/barHorizontal_green_mid.png'
    );
    this.load.image(
      'right-cap',
      'assets/graphics/uiAssets/PNG/barHorizontal_green_right.png'
    );

    // Bar Shadow
    this.load.image(
      'left-cap-shadow',
      'assets/graphics/uiAssets/PNG/barHorizontal_shadow_left.png'
    );
    this.load.image(
      'middle-shadow',
      'assets/graphics/uiAssets/PNG/barHorizontal_shadow_mid.png'
    );
    this.load.image(
      'right-cap-shadow',
      'assets/graphics/uiAssets/PNG/barHorizontal_shadow_right.png'
    );

    // fin de Assets



    // Rellenar la barra de carga
    this.load.on('progress', function (value: any) {
      var percent = value * 100

      if (percent < 10) {

        background.setTexture('intro-1')
      } else if (percent < 20) {

        background.setTexture('intro-2')
      } else if (percent < 30) {

        background.setTexture('intro-3')
      }
      else if (percent < 35) {

        background.setTexture('intro-4')
      }
      else if (percent < 40) {

        background.setTexture('intro-5')
      }
      else if (percent <= 50) {

        background.setTexture('intro-6')
      }
      else if (percent <= 60) {
        background.setTexture('intro-7')
      }
      else if (percent <= 70) {
        background.setTexture('intro-8')
      }
      else if (percent <= 80) {
        background.setTexture('intro-9')
      }
      else if (percent <= 90) {
        background.setTexture('intro-10')
      }
      else if (percent <= 100) {
        background.setTexture('intro-11')
      }

      percentText.setText(Math.round(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(250, 380, 300 * value, 30);
    });



    //Destruir textos y barras tras la carga completa.
    this.load.on('complete', function () {
      //console.log('complete');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      // assetText.destroy();
    });
  }

  create() {
    // contexto.closeScenes('MainMenu');
    this.scene.stop('MainMenu');


    var width = this.cameras.main.width;
    var height = this.cameras.main.height;



    var startTxT = this.make.text({
      x: width / 2,
      y: 380,
      text: '',
      style: {
        fontFamily: 'pixel',
        fontSize: '18px',
        color: '#FF0000',
      },
    });
    startTxT.setOrigin(0.5, -1.5);
    startTxT.setText('Presiona cualquier Tecla para comenzar');

    // fade to black
    this.input.keyboard.once('keydown', () => {

      this.cameras.main.fadeOut(1500, 0, 0, 0);
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam: any, effect: any) => {
        // this.scene.start('Scene1');
        // this.scene.start('ScoreBoard')
        this.scene.start('MainMenu');
        // this.scene.start("Credits")
      }
    );
  }

  override update() {
    //console.log('loading...');

  }
}

// export const loadingCtx = (ctx: any) => {
//   contexto = ctx;
//   return LoadingScreen;
// };
