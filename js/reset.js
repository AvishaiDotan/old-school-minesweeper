'use strict'


function setLevel(newLevel) {
    resetSafeClick()
    gRemovedLives = 0
    gLevel = LEVELS[newLevel]
    clearTimerInterval()
    resetTimer()

    gLives = 0
    renderLives()

    gHintsAmount = 3
    renderHints()
    initGame()
}

function resetGameVars() {
    gGame = {
        state: {
            isOn: false,
            isGameEnd: false,
            isHintActive: false,
        },
        
        counters: {
            shownCount: 0,
            markedCount: 0,
            secsPassed: 0,
        },

        intervals: {
            timerInterval: undefined,
        },
        
        data: {minesCoords: [],},
    } 
    gRemovedLives = 0
}