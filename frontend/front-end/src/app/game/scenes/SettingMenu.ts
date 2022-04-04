import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';

export default class SettingMenu {
  private container!: Phaser.GameObjects.Container;
  constructor(scene: Phaser.Scene) {
    const { width } = scene.scale;

    this.container = scene.add.container(width - 10, 50);

    const panel = scene.add.nineslice(0, 0, 150, 50, 'ui_panel', 24);

    this.container.add(panel);
  }
}
