export class Scene1 extends Phaser.Scene {
  // Propiedades

  constructor() {
    super({ key: 'Scene1' });
  }

  // init, preload, create, update
  init() {}

  
  preload() {
    this.load.image('star', 'assets/graphics/star.png');
  }

  create() {
    this.add.image(640, 360, 'star');
  }

  override update() {}

  // metodos.
}
