import StateMachine from "../statemachine/stateMachine";

export default class Hero extends Phaser.Physics.Arcade.Sprite {

    private stateMachine: StateMachine

    constructor(config: any) {

        super(config.currentScene, config.x, config.y, config.texture);

        this.stateMachine = new StateMachine(this, 'hero') //crear una stateMachine para el heroe y pasarle el personaje

        // this.stateMachine.addState('idle')
        // .addState('move',{
        //     onEnter:this.onMoveEnter,
        //     onUpdate:this.onMoveUpdate
        // })
        // .addState('jump',{
        //     onEnter:this.onJumpEnter,
        //     onExit:this.onJumpExit

        // })
        this.stateMachine.setState('idle')
    }








}
