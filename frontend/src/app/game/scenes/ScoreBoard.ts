import { Injectable } from "@angular/core";
import * as Phaser from "phaser";


//Angular context
let contexto: any; // = game.component.ts


@Injectable({
    providedIn: 'root',
})


export class ScoreBoard extends Phaser.Scene {

    // Propiedades
    private width!: number
    private height!: number

    private background!: any

    private scoreText!: Phaser.GameObjects.Text

    private arrayUsuarios: any; // array de usuarios recibidos de la BD
    private arrayUsuarios2: any // Copia para comprobar actualizaciones.
    private idUsuario: any //Id usuario recibido desde servicio de Cookies

    private controls!: any



    private img!: Phaser.GameObjects.TileSprite
    private img2!: Phaser.GameObjects.TileSprite
    private img3!: Phaser.GameObjects.TileSprite



    constructor() {
        super({ key: 'ScoreBoard' });

        //console.log("ScoreBoard iniciada");


        //Id usuario
        this.idUsuario = contexto.getID()

        // console.log(this.idUsuario);


    }



    init() {


        this.arrayUsuarios = contexto.arrayRecord
        this.arrayUsuarios2 = this.arrayUsuarios
        //console.log('Array1:');
        //console.log(this.arrayUsuarios);
        //console.log('Array2:');
        //console.log(this.arrayUsuarios2);
    }



    create() {
        //Efecto Fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.width = this.scale.width;
        this.height = this.scale.height;


        this.controls = this.input.keyboard.addKeys({
            'R': Phaser.Input.Keyboard.KeyCodes.R,
            'T': Phaser.Input.Keyboard.KeyCodes.T,
        })

        //Background

        this.img = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'nightBckgr-1')
        this.img2 = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'nightBckgr-2')
        this.img3 = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'nightBckgr-3')


        // Boton Back to Menu
        const returnButton = this.add.image(this.width - 10, 10, 'small_button').setOrigin(1, 0);

        // Icono
        this.add.image(returnButton.x - returnButton.width * 0.5, returnButton.y + returnButton.height * 0.4, 'returnB').setScale(1);

        //animacion al pulsar
        this.animateButton(returnButton)



        // //console.log(`ID del Usuario en el juego:
        //         ${ this.idUsuario } `);;

        this.drawLeaderboard()








    }


    override update() {
        let key = Phaser.Input.Keyboard;
        //console.log("scoreBoard corriendo");

        this.img2.tilePositionX += 0.2
        this.img3.tilePositionX += 0.5

        // if (key.JustDown(this.controls.R)) {

        //     //console.log('Antiguo Array:'); // Valor inical
        //     //console.log(contexto.arrayRecord);

        //     contexto.getScoreboard() // reasignar variable que guarda los Records

        //     //console.log('Antiguo nuevo:'); // Nuevo Valor
        //     //console.log(contexto.arrayRecord);
        //     this.arrayUsuarios = contexto.arrayRecord

        //     if (this.arrayUsuarios != this.arrayUsuarios2) { //Volver  dibujar la scoreBoard
        //         //console.log("actualizcion encontrada");
        //         //console.log('Array1:');
        //         //console.log(this.arrayUsuarios);
        //         //console.log('Array2:');
        //         //console.log(this.arrayUsuarios2);

        //         this.arrayUsuarios = this.arrayUsuarios2



        //     }
        //     else {
        //         //console.log('sin cambios');


        //     }
        // }



    }

    updateScoreBoard() {
        this.arrayUsuarios = contexto.arrayRecord
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

    drawLeaderboard() {
        // LEADERBOARD -----------------------------

        // header
        this.scoreText = this.add.text(this.width * 0.5, this.height - this.scale.height + 35, 'TOP 10 JUGADORES',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '32px',
                stroke: '#0E0E0E',
                strokeThickness: 5,
            }).setOrigin(0.5, 0.5)

        //top 10 players
        this.createTable()


        //personal Score HEADER
        this.scoreText = this.add.text(this.width * 0.75, (this.scale.height * 0.2) + 50, 'PUNTUACION PERSONAL',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '18px',
                stroke: '#0E0E0E',
                strokeThickness: 5,
            }).setOrigin(0.5, 0.5)

        // personal score
        for (let i = 0; i < this.arrayUsuarios.length; i++) {
            if (this.arrayUsuarios[i].id == this.idUsuario) {

                //Puntuacion
                this.scoreText = this.add.text(this.width * 0.6, (this.scale.height * 0.2) + 100, (i + 1) + '.',
                    {
                        color: 'WHITE', fontFamily: 'pixel', fontSize: '18px',
                        stroke: '#0E0E0E',
                        strokeThickness: 5,
                    }).setOrigin(0.5, 0.5)

                //Nombre
                this.scoreText = this.add.text(this.width * 0.68, (this.scale.height * 0.2) + 100, this.arrayUsuarios[i].nombre,
                    {
                        color: 'WHITE', fontFamily: 'pixel', fontSize: '18px',
                        stroke: '#0E0E0E',
                        strokeThickness: 5,
                    }).setOrigin(0.5, 0.5)

                //Score
                this.scoreText = this.add.text(this.width * 0.85, (this.scale.height * 0.2) + 100, this.arrayUsuarios[i].record,
                    {
                        color: 'WHITE', fontFamily: 'pixel', fontSize: '18px',
                        stroke: '#0E0E0E',
                        strokeThickness: 5,
                    }).setOrigin(0.5, 0.5)

            }
        }


    }
    createTable() {
        let y = this.scale.height * 0.2
        let x = this.width * 0.08
        let padding = 50



        for (let i = 0; i < 10; i++) {


            if (i == 0) {
                // Posicion
                this.add.text(x, y, (i + 1) + '.',
                    {

                        color: 'RED', fontFamily: 'pixel', fontSize: '24px',
                        stroke: '#0E0E0E',
                        strokeThickness: 5,

                    }).setOrigin(0.5, 0.5)
                // Nombre
                this.add.text(this.width * 0.18, y, this.arrayUsuarios[i].nombre,
                    {
                        color: 'RED', fontFamily: 'pixel', fontSize: '24px', stroke: '#0E0E0E',
                        strokeThickness: 5,
                    }).setOrigin(0.5, 0.5)
                // Score
                this.add.text(this.width * 0.35, y, this.arrayUsuarios[i].record,
                    {
                        color: 'RED', fontFamily: 'pixel', fontSize: '24px',
                        stroke: '#0E0E0E',
                        strokeThickness: 5,
                    }).setOrigin(0.5, 0.5)

                let icon1 = this.add.image(this.width * 0.455, y - 10, "icono1")
                icon1.setDisplaySize(icon1.width / 2, icon1.height / 2)
                y += padding

            }
            else if (i == 1) {
                // Posicion
                this.add.text(x, y, (i + 1) + '.',
                    {

                        color: 'ORANGE', fontFamily: 'pixel', fontSize: '24px',
                        stroke: '#0E0E0E',
                        strokeThickness: 5,

                    }).setOrigin(0.5, 0.5)
                // Nombre
                this.add.text(this.width * 0.18, y, this.arrayUsuarios[i].nombre,
                    {
                        color: 'ORANGE', fontFamily: 'pixel', fontSize: '24px', stroke: '#0E0E0E',
                        strokeThickness: 5,
                    }).setOrigin(0.5, 0.5)
                // Score
                this.add.text(this.width * 0.35, y, this.arrayUsuarios[i].record,
                    {
                        color: 'ORANGE', fontFamily: 'pixel', fontSize: '24px',
                        stroke: '#0E0E0E',
                        strokeThickness: 5,
                    }).setOrigin(0.5, 0.5)

                let icon2 = this.add.image(this.width * 0.45, y + 5, "icono2")
                icon2.setDisplaySize(icon2.width * 0.8, icon2.height * 0.8)

                y += padding
            } else {
                // Posicion
                this.add.text(x, y, (i + 1) + '.',
                    {

                        color: 'WHITE', fontFamily: 'pixel', fontSize: '24px',
                        stroke: '#0E0E0E',
                        strokeThickness: 5,

                    }).setOrigin(0.5, 0.5)
                // Nombre
                this.add.text(this.width * 0.18, y, this.arrayUsuarios[i].nombre,
                    {
                        color: 'WHITE', fontFamily: 'pixel', fontSize: '24px', stroke: '#0E0E0E',
                        strokeThickness: 5,
                    }).setOrigin(0.5, 0.5)
                // Score
                this.add.text(this.width * 0.35, y, this.arrayUsuarios[i].record,
                    {
                        color: 'WHITE', fontFamily: 'pixel', fontSize: '24px',
                        stroke: '#0E0E0E',
                        strokeThickness: 5,
                    }).setOrigin(0.5, 0.5)

                y += padding

            }

        }

    }
}
export const ScoreBoardScene = (ctx: any) => {

    //console.log("contexto:");
    //console.log(ctx);

    contexto = ctx;
    return ScoreBoard;
}
