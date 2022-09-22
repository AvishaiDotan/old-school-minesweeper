'use strict'

var minesAmount = 0

function initCreateMode(elBtn) {

    if (gGame.state.isOn) {
        resetGameVars()
        minesAmount = 0
        resetTimer()
        clearTimerInterval()
    } 
    // Model
    gGame.state.isCreateModeActive = !gGame.state.isCreateModeActive
    gGame.state.isCreateModeGameActive = true

    // DOM
     var btnStr = (gGame.state.isCreateModeActive) ? 'Create Mode: On' : 'Create Mode: Off'
    elBtn.innerText = btnStr

    // Model
    if (gGame.state.isCreateModeActive) {
        resetMineCoords()
        resetBoard()
    } 

    renderBoard()
}

function makeMine(elMouseBtn, elCell, i, j) {
    
    if (minesAmount >= gLevel.MINES) return
    minesAmount++
    if (elMouseBtn !== 1) return

        // Model
    gBoard[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: true,
        isMarked: false,
        isFlagged: false,  
    } 

    gGame.data.minesCoords.push({i, j})

    // DOM
    renderMine(elCell)
    
}

function renderMine(elCell) {
    elCell.innerText = MINE
    elCell.classList.remove('hidden-by-font-size')    
    elCell.classList.remove('outset') 
}




