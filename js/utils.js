'use strict'

function getEmptyCell() {
    var emptyCell = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (i === gGame.firstClickCoords.i && j === gGame.firstClickCoords.j) continue
            if (!gBoard[i][j].isMine) emptyCell.push({i, j}) 
        }
    }
    return emptyCell[getRandomIntInclusive(0, emptyCell.length - 1)]
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function noMineNegs(cellCoords) {
    for (var i = cellCoords.i - 1; i <= cellCoords.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellCoords.j - 1; j <= cellCoords.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === cellCoords.i && j === cellCoords.j) continue

            if (gBoard[i][j].isMine) return false     
        }
    }
    return true
}

function expandShown(cellCoords) {
    for (var i = cellCoords.i - 1; i <= cellCoords.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellCoords.j - 1; j <= cellCoords.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            
            if (!gBoard[i][j].isShown) {
                gBoard[i][j].isShown = true
                gGame.shownCount++
            }
        }
    }
}

function hideNegs(cellCoords) {
    for (var i = cellCoords.i - 1; i <= cellCoords.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellCoords.j - 1; j <= cellCoords.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue

            if (!gBoard[i][j].isShown) {
                gBoard[i][j].isShown = false
                gGame.shownCount--
            }
        }
    }
}