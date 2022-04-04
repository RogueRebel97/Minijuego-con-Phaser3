import * as Phaser from 'phaser';
import WebFont from 'webfontloader';
import WebFontLoader from 'webfontloader';

export class LoadingScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScreen' });
  }

  init() {}

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
    this.load.image(
      'glass-panel',
      'assets/graphics/uiAssets/PNG/metalPanel_red.png'
    );
    this.load.image(
      'cursor-hand',
      'assets/graphics/uiAssets/PNG/cursor_hand.png'
    );

    this.load.image('ui_panel', 'assets/graphics/uiAssets2/PNG/grey_panel.png');
    this.load.image(
      'small_button',
      'assets/graphics/uiAssets2/PNG/grey_button07.png'
    );
    this.load.image(
      'option_button',
      'assets/graphics/gameIcons/PNG/Black/1x/gear.png'
    );

    for (var i = 0; i < 250; i++) {
      //Carga muchas veces el logo para probar la Barra de progureso
      this.load.image('logo' + i, 'assets/graphics/Logo.jpg');
    }
    this.load.image('star', 'assets/graphics/star.png');

    // fin de Assets

    // Rellenar la barra de carga
    this.load.on('progress', function (value: any) {
      // console.log(value);
      percentText.setText(Math.round(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // leer los archivos cargados
    this.load.on('fileprogress', function (file: any) {
      // console.log(file.src);
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
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var logo = this.add.image(400, 300, 'logo1');

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
      this.cameras.main.fadeOut(150, 0, 0, 0);
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam: any, effect: any) => {
        this.scene.start('ui');
        // this.scene.bringToTop('ui');
        this.scene.start('MainMenu');
      }
    );
  }

  override update() {}
}
