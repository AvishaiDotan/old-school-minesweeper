'use strict'


function checkWin() {

    // return if needed score and user score aren't equal
    if (gGame.counters.markedCount !== gLevel.MINES) return

    if (isAllMinesMarked() && isAllValidCellsShown()) {
        // Model
        gGame.state.isGameEnd = true

        // DOM
        clearTimerInterval()
        renderSmileEmoji(EMOJI_STATES.won)

        // Local Storage
        saveBestResultInStorage()
        playSound(GAME_SOUNDS.WIN)
    }
}

function isAllMinesMarked() {
    for (var i = 0; i < gGame.data.minesCoords.length; i++) {
        const mineCoords = gGame.data.minesCoords[i]
        const cell = gBoard[mineCoords.i][mineCoords.j]

        // if the cell !isMarked but isMine => happened when using lives function
        if (cell.isFlagged) continue

        if (!cell.isMarked) return false
    }
    return true
}

function isAllValidCellsShown() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]

            // if neg or empty cell are close return false
            if (!cell.isMine && !cell.isShown) return false
        }
    }
    return true
}

function gameLose() {

    stopBackgroundSound()
    // Model
    gGame.state.isGameEnd = true

    // DOM
    playSound(GAME_SOUNDS.LOSE_SOUND)
    displayAllMines()
    clearTimerInterval()
    renderSmileEmoji(EMOJI_STATES.lost)  
}