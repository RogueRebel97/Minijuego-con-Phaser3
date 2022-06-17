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

    private txt1!: Phaser.GameObjects.Text


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

        // logo
        const logo = this.add.image(this.width * 0.15, this.height * 0.85, 'iMageCretive').setDisplaySize(160, 160).setAngle(10)


        // Texts

        // header
        this.creditsTXT = this.add.text(this.width * 0.5, this.height - this.scale.height + 100, 'YO TE RETRO!',
            {
                color: 'ORANGE', fontFamily: 'pixel', fontSize: '64px',
                stroke: '#0E0E0E',
                strokeThickness: 7,
            }).setOrigin(0.5, 0.5)

        // Text
        this.txt1 = this.add.text(this.width * 0.5, this.creditsTXT.y + 225, '', {
            color: 'WHITE', fontFamily: 'pixel', fontSize: '20PX',
            stroke: '#0E0E0E',
            strokeThickness: 5,

        }).setOrigin(0.5, 0.5)

        // Maquina de escribir:
        this.typewriteTextWrapped(this.txt1,
            '  UNA IDEA ORIGINAL DE \n    Adrian Ruiz Diaz \n \n    DISEÑADO Y DESARROLLADO POR \n    Adrian Ruiz Diaz \n \n   PRODUCIDO POR \n   iMageCreative.es \n \n   EN COLABORACION CON  \n     UnMundoEnMiniatura.es \n  \n  USANDO ASSETS GRATUITOS DE \n itch.io'
            , 25)

        const copyRigth = this.add.text(this.width * 0.63, this.height * 0.95, '2022.©iMageCreative ',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '15PX'
            }).setOrigin(0, 0)





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

    typewriteText(label: Phaser.GameObjects.Text, text: string, delay: number) {
        const length = text.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                label.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: delay
        })
    }

    typewriteTextWrapped(label: Phaser.GameObjects.Text, text: string, delay: number) {
        const lines = label.getWrappedText(text)
        const wrappedText = lines.join('\n')

        this.typewriteText(label, wrappedText, delay)
    }




}