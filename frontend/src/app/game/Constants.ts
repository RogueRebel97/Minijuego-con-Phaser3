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
    REGISTRY: {
        MAXHEALTH: 'maxHealth',
        HEALTH: 'healthValue',
        COLLIDERS: {
            ENEMY: 'enemyCollider'
        }
    }





}

export default Constants;