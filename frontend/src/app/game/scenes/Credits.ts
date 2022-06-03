//imports
import * as Phaser from "phaser";


//Angular context
let contexto: any;

export class Credits extends Phaser.Scene {

    // Propiedades
    private width!: number
    private height!: number



    private img!: Phaser.GameObjects.TileSprite
    private img2!: Phaser.GameObjects.TileSprite
    private img3!: Phaser.GameObjects.TileSprite

    constructor() {
        super({ key: 'Credits' });
    }

    init() {

    }


    create() {
        this.width = this.scale.width;
        this.height = this.scale.height;



        this.img = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'castle-1')
        this.img2 = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'castle-2')
        this.img3 = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'castle-3')



        // Boton Back to Menu
        const returnButton = this.add.image(this.width - 10, 10, 'small_button').setOrigin(1, 0);

        // Icono
        this.add.image(returnButton.x - returnButton.width * 0.5, returnButton.y + returnButton.height * 0.4, 'returnB').setScale(1);

        //animacion al pulsar
        this.animateButton(returnButton)

    }

    override update() {
        this.img2.tilePositionX += 0.2
        this.img3.tilePositionX += 0.5
    }






    animateButton(button: Phaser.GameObjects.Image) {

        button.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            button.setTint(0xe0e0e0);
        })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                button.setTint(0xffffff);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                button.setTint(0xe0e0e0);



            }).on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                button.setTint(0xffffff);
                this.scene.start('MainMenu')
            })
    }
}