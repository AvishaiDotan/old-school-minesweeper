'use strict'

// Game Over Functions
function checkGameOver() {
    if (gGame.counters.markedCount !== gLevel.MINES) return
    if (isAllMinesMarked() && isAllValidCellsShown()) {
        clearTimerInterval()
        gGame.state.isGameEnd = true
        renderSmileEmoji(2)
        saveBestResultInStorage()
    }
}

function isAllMinesMarked() {
    for (var i = 0; i < gGame.data.minesCoords.length; i++) {
        const mineCoords = gGame.data.minesCoords[i]
        const cell = gBoard[mineCoords.i][mineCoords.j]

        if (!cell.isMarked) return false
    }
    return true
}

function isAllValidCellsShown() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (cell.isNeg && !cell.isShown) return false
            if (cell.isEmpty && !cell.isShown) return false
        }
    }
    return true
}

function gameLose() {
    displayAllMines()
    clearTimerInterval()
    renderSmileEmoji(0)
    gGame.state.isGameEnd = true
}