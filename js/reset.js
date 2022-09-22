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
            isSafeClickActive: false,
            isCreateModeActive: false,
            isCreateModeGameActive: false,
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

function resetBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j] = createCell()
        }
    }
}

function resetMineCoords() {
    gGame.data.minesCoords = []
}