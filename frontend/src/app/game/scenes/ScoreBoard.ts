import { Injectable } from "@angular/core";
import * as Phaser from "phaser";


//Angular context
let contexto: any;

@Injectable({
    providedIn: 'root',
})


export class ScoreBoard extends Phaser.Scene {

    // Propiedades
    private scoreText!: Phaser.GameObjects.Text
    private width!: number
    private height!: number

    constructor() {
        super({ key: 'ScoreBoard' });

        console.log("ScoreBoard iniciada");

    }



    init() {

    }



    create() {

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.createBackground(this, 'nightBckgr-1', 1, 0)
        this.createBackground(this, 'nightBckgr-2', 1, 0)
        this.createBackground(this, 'nightBckgr-3', 1, 0)


        this.scoreText = this.add.text(this.width * 0.5, this.height * 0.5, 'SCORE:',
            {
                color: 'WHITE', fontFamily: 'pixel', fontSize: '18px'
            })


    }





    override update() {

    }




    createBackground(scene: Phaser.Scene, texture: string, count: number, scrollFactor: number) {
        let x = 0;
        for (let i = 0; i < count; i++) {
            const img = scene.add.image(x, scene.scale.height, texture)
                .setOrigin(0, 1).setScrollFactor(scrollFactor)
            img.displayWidth = this.sys.canvas.width;
            img.displayHeight = this.sys.canvas.height;
            x += img.displayWidth
        }
    }

}
