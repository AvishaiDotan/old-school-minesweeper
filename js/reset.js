'use strict'

function globalReset(currLevel = GAME_LEVELS[0]) {
    // Define Level
    gLevel = currLevel

    // Reset Model
    resetGameVars()
    gBoard = buildBoard()
    addMines()
    setMinesNegsCount()
    clearTimerInterval()

    // DOM
    renderBoard()
    renderBestResult()
    renderBottomMenuBtns()

    resetFeatures() 
    
    // Reset DOM
    resetElTimer()
    renderSmileEmoji(EMOJI_STATES.success)

    renderHints()
    renderMinesCounter()
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
        
        data: {minesCoords: [],},
    } 
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
    resetMegaHint()
    resetMinesCounter()
    resetLives()
}

function setLevel(newLevel) {
    playSound(GAME_SOUNDS.RESET)
    globalReset(newLevel)
}

function emojiReset() {
    playSound(GAME_SOUNDS.RESET)
    globalReset(gLevel)
}
