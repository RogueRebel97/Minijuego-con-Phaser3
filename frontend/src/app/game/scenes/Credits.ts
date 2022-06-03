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

    private creditsTXT!: Phaser.GameObjects.Text

    constructor() {
        super({ key: 'Credits' });
    }

    init() {

    }


    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.width = this.scale.width;
        this.height = this.scale.height;



        // this.img = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'castle-1')
        // this.img2 = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'castle-2')
        // this.img3 = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'castle-3')

        this.img = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'nightBckgr-1')
        this.img2 = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'nightBckgr-2')
        this.img3 = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'nightBckgr-3')



        // Boton Back to Menu
        const returnButton = this.add.image(this.width - 10, 10, 'small_button').setOrigin(1, 0);

        // Icono
        this.add.image(returnButton.x - returnButton.width * 0.5, returnButton.y + returnButton.height * 0.4, 'returnB').setScale(1);

        //animacion al pulsar
        this.animateButton(returnButton)




        // Texts

        // header
        this.creditsTXT = this.add.text(this.width * 0.5, this.height - this.scale.height + 35, 'CREDITOS',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '32px'
            }).setOrigin(0.5, 0.5)

        // texts
        const txt1 = this.add.text(this.width * 0.5, this.creditsTXT.y + 75, 'AN ORIGINAL IDEA OF',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '20PX'
            }).setOrigin(0.5, 0.5)

        const txt1_1 = this.add.text(this.width * 0.5, txt1.y + 45, 'Adrian Ruiz Diaz',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '18PX'
            }).setOrigin(0.5, 0.5)



        const txt2 = this.add.text(this.width * 0.5, txt1_1.y + 65, 'DESIGNED AND DEVELOPED BY ',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '20PX'
            }).setOrigin(0.5, 0.5)

        const txt2_1 = this.add.text(this.width * 0.5, txt2.y + 45, 'Adrian Ruiz Diaz',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '18PX'
            }).setOrigin(0.5, 0.5)

        const txt3 = this.add.text(this.width * 0.5, txt2_1.y + 65, 'PRODUCED BY ',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '20PX'
            }).setOrigin(0.5, 0.5)

        const txt3_1 = this.add.text(this.width * 0.5, txt3.y + 45, 'iMageCreative.es',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '18PX'
            }).setOrigin(0.5, 0.5)

        const txt4 = this.add.text(this.width * 0.5, txt3_1.y + 65, 'IN COLLABORATION WITH ',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '20PX'
            }).setOrigin(0.5, 0.5)
        const txt4_1 = this.add.text(this.width * 0.5, txt4.y + 45, 'UnMundoEnMiniatura.es ',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '18PX'
            }).setOrigin(0.5, 0.5)




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