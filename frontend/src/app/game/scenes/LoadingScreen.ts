import { Injectable } from '@angular/core';
import * as Phaser from 'phaser';
import Constants from '../Constants';

@Injectable({
  providedIn: 'root',
})



export class LoadingScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScreen' });
  }

  init() { }

  preload() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    console.log('loadingScreen');

    // Barra de Carga
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    //Texto barra de carga
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
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
      y: height / 2 - 5,
      text: '0%',
      style: {
        fontFamily: 'pixel',
        fontSize: '18px',
        color: '#FF0000',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    //Info de archivo cargado
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        fontFamily: 'pixel',
        fontSize: '18px',
        color: '#FF0000',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    //Assets a cargar
    this.load.image('sky', 'assets/graphics/sky.png');

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



    this.load.image('logo', 'assets/graphics/Logo.jpg');

    //Maps
    this.load.tilemapTiledJSON(Constants.MAPS.LEVELS.TESTLEVEL.TILEMAPJSON, 'assets/tileMaps/testMap.json');
    this.load.tilemapTiledJSON(Constants.MAPS.LEVELS.LEVEL1.TILEMAPJSON, 'assets/tileMaps/Level-1.json')

    //Tilesets
    this.load.image(Constants.MAPS.SCENERY.BASIC.TILESET.BASICTERRAIN, 'assets/graphics/tileSets/basicTerrain.png')
    this.load.image(Constants.MAPS.SCENERY.PLAINS.TILESET.PLAINS_1, 'assets/graphics/tileSets/plainsTileset1.png')
    this.load.image(Constants.MAPS.SCENERY.PLAINS.TILESET.PLAINS_2, 'assets/graphics/tileSets/plainsTileset2.png')
    this.load.image(Constants.MAPS.SCENERY.FOREST.TILESET.WOODSTERRAIN, 'assets/graphics/tileSets/woodTerrain.png')

    //Decorations
    this.load.image(Constants.MAPS.SCENERY.PLAINS.DECORATOR.PLAINSDECORS, 'assets/graphics/decorations/plainsDecors.png')

    // Backgrounds for Map
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


    //plains
    this.load.image('plainsSky', 'assets/SpritesSheets/plains/BG1.png')
    this.load.image('plainsBG1', 'assets/SpritesSheets/plains/BG2.png')
    this.load.image('plainsBG2', 'assets/SpritesSheets/plains/BG3.png')





    // SpriteSheets del caballero
    this.load.spritesheet(
      Constants.PLAYER.ID,
      'assets/SpritesSheets/FreeKnight/Colour1/NoOutline/120x80_PNGSheets/_Idle.png',
      { frameWidth: 120, frameHeight: 80 }
    );
    this.load.spritesheet(
      'run',
      'assets/SpritesSheets/FreeKnight/Colour1/NoOutline/120x80_PNGSheets/_Run.png',
      { frameWidth: 120, frameHeight: 80 }
    );
    this.load.spritesheet(
      'jump',
      'assets/SpritesSheets/FreeKnight/Colour1/NoOutline/120x80_PNGSheets/_Jump.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'fall',
      'assets/SpritesSheets/FreeKnight/Colour1/NoOutline/120x80_PNGSheets/_Fall.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'dash',
      'assets/SpritesSheets/FreeKnight/Colour1/NoOutline/120x80_PNGSheets/_Dash.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'downAttack',
      'assets/SpritesSheets/FreeKnight/Colour1/NoOutline/120x80_PNGSheets/_Attack.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'slide',
      'assets/SpritesSheets/FreeKnight/Colour1/NoOutline/120x80_PNGSheets/_SlideFull.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'death',
      'assets/SpritesSheets/FreeKnight/Colour1/NoOutline/120x80_PNGSheets/_Death.png',
      { frameWidth: 120, frameHeight: 80 }
    );

    this.load.spritesheet(
      'hit',
      'assets/SpritesSheets/FreeKnight/Colour1/NoOutline/120x80_PNGSheets/_Hit.png',
      { frameWidth: 120, frameHeight: 80 }
    );


    // Enemies
    this.load.spritesheet(
      'slime',
      'assets/SpritesSheets/Enemies/Slime/Idle-Run.png',
      { frameWidth: 44, frameHeight: 30 }
    );
    this.load.spritesheet(
      Constants.ENEMIES.SLIME.ANIMATIONS.HIT,
      'assets/SpritesSheets/Enemies/Slime/Hit(44x30).png',
      { frameWidth: 44, frameHeight: 30 }
    );
    this.load.spritesheet(
      'slimeParticles',
      'assets/SpritesSheets/Enemies/Slime/Particles(62x16).png',
      { frameWidth: 62, frameHeight: 16 }
    );




    // fin de Assets

    // Rellenar la barra de carga
    this.load.on('progress', function (value: any) {
      percentText.setText(Math.round(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // leer los archivos cargados
    this.load.on('fileprogress', function (file: any) {
      assetText.setText('Cargando assets: ' + file.key);
    });

    //Destruir textos y barras tras la carga completa.
    this.load.on('complete', function () {
      console.log('complete');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  create() {
    // contexto.closeScenes('MainMenu');
    this.scene.stop('MainMenu');

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var logo = this.add.image(400, 300, 'logo');

    var startTxT = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        fontFamily: 'pixel',
        fontSize: '18px',
        color: '#FF0000',
      },
    });
    startTxT.setOrigin(0.5, -1.5);
    startTxT.setText('Pulsa la tecla espacio para comenzar');

    this.input.keyboard.once('keydown-SPACE', () => {
      // fade to black
      this.cameras.main.fadeOut(1500, 0, 0, 0);
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam: any, effect: any) => {
        // this.scene.launch('ui-scene');
        // this.scene.bringToTop('ui-scene');
        this.scene.start('Scene1');
        // this.scene.launch('hud');
        // this.scene.bringToTop('hud')
        // this.scene.start('MainMenu');
      }
    );
  }

  override update() {
    console.log('loading...');

  }
}

// export const loadingCtx = (ctx: any) => {
//   contexto = ctx;
//   return LoadingScreen;
// };
