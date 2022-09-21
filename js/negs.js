'use strict'

function isMineNeg(cellCoords) {
    for (var i = cellCoords.i - 1; i <= cellCoords.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellCoords.j - 1; j <= cellCoords.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === cellCoords.i && j === cellCoords.j) continue

            if (gBoard[i][j].isMine) return true     
        }
    }
    return false
}

function applyNegsCount(cellCoords) {
    for (var i = cellCoords.i - 1; i <= cellCoords.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellCoords.j - 1; j <= cellCoords.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === cellCoords.i && j === cellCoords.j) continue
            
            gBoard[i][j].minesAroundCount++
            if (!gBoard[i][j].isMine) gBoard[i][j].isNeg = true
            
        }
    }
}