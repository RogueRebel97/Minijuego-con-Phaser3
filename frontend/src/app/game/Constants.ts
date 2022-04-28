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
        LEVEL1: {
            TILEMAPJSON: 'level1Map',
            PLATAFORMLAYER: 'plataforms'
        },
        TILESET: 'basicTerrain'
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