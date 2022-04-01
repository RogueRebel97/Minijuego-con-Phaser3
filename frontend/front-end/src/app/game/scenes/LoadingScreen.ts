import * as Phaser from 'phaser';

export class LoadingScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScreen' });
  }

  init() {}
  preload() {
    console.log('loadingScreen');
    // Barra de Carga
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    //Texto
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    //Porcentaje
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            color: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.image('logo', 'assets/graphics/Logo.jpg');
    for (var i = 0; i < 100; i++) {
      this.load.image(
        'glass-panel' + i,
        'assets/graphics/uiAssets/PNG/metalPanel_red.png'
      );
    }

    this.load.on('progress', function (value: any) {
      console.log(value);
      percentText.setText(parseInt(value * 100).toString + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
     
    });

    this.load.on('fileprogress', function (file: any) {
      console.log(file.src);
    });
    this.load.on('complete', function () {
      console.log('complete');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });
  }

  create() {
    var logo = this.add.image(400, 300, 'logo');
  }

  override update() {}
}
