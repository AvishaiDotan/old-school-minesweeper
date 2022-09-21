function setLevel(newLevel) {
    gLevel = LEVELS[newLevel]
    clearTimerInterval()
    resetTimer()
    initGame()
}

function resetGameVars() {
    gGame = {
        gameState:{
            isOn: false,
            isGameEnd: false,
            isHintActive: false,
        },

        counter: {
            shownCount: 0,
            markedCount: 0,
            secsPassed: 0,
        },

        data: {minesCoords: [],},

        gameFeatures: {
            lives: 3,
            hints: 3,
        },

        intervals: {timerInterval: undefined,}
    } 
}

function expandShownV2(board, elCell, i, j) {
    // When user clicks a cell with no 
    // mines around, we need to open 
    // not only that cell, but also its 
    // neighbors. 

    // NOTE: start with a basic 
    // implementation that only opens 
    // the non-mine 1st degree 
    // neighbors

    // BONUS: if you have the time 
    // later, try to work more like the 
    // real algorithm (see description 
    // at the Bonuses section below)
}