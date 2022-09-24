'use strict'

// TODO: Arrange in logical order
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
    playSound(GAME_SOUNDS.RESET)
}

// Reset but also sets the main gGame global object
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

// Function that resets gBoard to default values
// LOOK FOR TODO in next citation
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

function resetFeatures() {
    resetSafeClick()
    resetCreatorMode()
    resetHints()
    resetMinesCounter()
}
