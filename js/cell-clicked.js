'use strict'


// Open cells and Mark cells Functions
function cellClicked(ev, elCell, i, j) {
    setFirstClickToValid({i, j})
    if (gGame.state.isGameEnd) return
    if (ev.which === 1) openCell(i, j)
    else if (ev.which === 3) markedCell(i, j)
    checkGameOver()     
}

function openCell(i, j) {
    gGame.state.isOn = true
    if (!gGame.intervals.timerInterval) startTimer()

    if (gGame.state.isHintActive) {
        playHint({i, j})
        return
    }
    const cell = gBoard[i][j]

    if (cell.isMarked) return

    if (gLives && cell.isMine){
        removeOneLife({i, j})
    } else if (!gLives && cell.isMine) {
        gameLose()
    }     

    // Model
    if (cell.minesAroundCount === 0)  fullExpand({i,j})
    if (cell.minesAroundCount === 0 && !cell.isMine) expandShown({i, j})
    else {
        gBoard[i][j].isShown = true
        gGame.counters.shownCount++
    }
    // DOM
    renderBoard()
}

function markedCell(i, j) {
    // must started by left key (open cell)
    if (!gGame.state.isOn) return
    
    const cell = gBoard[i][j]
    if (cell.isShown && !cell.isMarked) return

    if (cell.isMarked) {
        unMarkCell(cell)
        return
    }

    // limit addition of marked cells
    if (gGame.counters.markedCount < gLevel.MINES) {  
        cell.isMarked = true
        cell.isShown = true
        gGame.counters.markedCount++
    }

    renderBoard()
}

function unMarkCell(cell) {
    // Update Model
    cell.isMarked = false
    cell.isShown = false
    gGame.counters.markedCount--
    // Update DOM
    renderBoard()
}

// TODO: BETTER SOLUTION
function setFirstClickToValid(coords) {
    if (!gGame.state.isOn) {
        gFirstClickCoords = {i: coords.i, j: coords.j}
        initGame()
    } 
}