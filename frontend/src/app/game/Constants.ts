const Constants = {
    EVENTS: {
        HEALTH: 'alterHealth',
        SCORE: 'alterScore'
    },
    HUD: {
        MAXHEALTH: 'maxHealth',
        HEALTH: 'healthValue'
    },

    MAPS: {
        LEVELS: {
            TESTLEVEL: {
                TILEMAPJSON: 'testmap',
                PLATAFORMLAYER: 'plataforms'
            },
            LEVEL1: {
                TILEMAPJSON: 'level-1',
                PLATAFORMLAYER: 'plataforms/plataforms-1',
            }

        },
        SCENERY: {
            PLAINS: {
                TILESET: {
                    PLAINS_1: 'plainsTileset1',
                    PLAINS_2: 'plainsTileset2'
                },
                BACKGROUND: {

                },
                DECORATOR: {

                }

            },
            FOREST: {
                TILESET: {
                    WOODSTERRAIN: 'woodTerrain'

                },
                BACKGROUND: {

                },
                DECORATOR: {

                }

            },
            BASIC: {
                TILESET: {
                    BASICTERRAIN: 'basicTerrain',
                }

            }


        }





    },
    PLAYER: {
        ID: 'knight',
        ANIMATION: {
            IDLE: 'idle',
            RUN: 'run',
            JUMP: 'jump',
            FALL: 'fall',
            DASH: 'dash',
            SLIDE: 'slide',
            ATTACK: {
                DOWNSWING: 'downAttack'
            }
        },
        STATS: {
            MAXHEALTH: 'maxHealth',
            HEALTH: 'healthValue'
        }
    },
    ENEMIES: {
        SLIME: {
            ID: 'slime',
            ANIMATIONS: {
                IDLE: 'idleSlime',
                HIT: 'slimeHit'

            },
            STATS: {
                MAXHEALTH: 'maxHealth-slime',
                HEALTH: 'healthValue-slime',
                DAMAGE: '10'
            }
        }
    },
    GROUPS: {
        ENEMIES: 'enemies',
        PLAYER: 'player'
    },
    REGISTRY: {
        COLLIDERS: {
            ENEMY: 'enemyCollider'

        }
    }





}

export default Constants;