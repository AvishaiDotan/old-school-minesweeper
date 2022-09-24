'use strict'

// Hold current amount of mines
var gMinesCount = 0
var maxCreatedMines;

function initCreateMode(elBtn) {
    
    // If game already began and creator mode activated => reset the game
    if (gGame.state.isOn) {      
        // DOM
        clearTimerInterval()
        resetElTimer()
        resetGameVars()
        globalReset(gLevel)
        resetCreatorMode()
    } 

    // TODO: FIX THIS BUG
    // if player didnt fill up the board with mines as full as gLevel.MINES => ELSE IT BUG
    if (gGame.state.isCreateModeActive && gGame.state.isCreateModeGameActive
        && !gGame.state.isOn && gMinesCount < gLevel.MINES) {
            playSound(GAME_SOUNDS.MAIN_ERROR)
            return
        }

    // Model
    gGame.state.isCreateModeActive = !gGame.state.isCreateModeActive
    gGame.state.isCreateModeGameActive = true

    // DOM
    var btnStr = (gGame.state.isCreateModeActive) ? 'Start Play' : 'Create Mode: ON'
    elBtn.innerText = btnStr

    // Reset the board and the mine coords data array if creator mode started
    if (gGame.state.isCreateModeActive) {
        resetMineCoords()
        
        // TODO: Need to check if gBoard = buildBoard() also works
        resetBoard()
    }

    // DOM
    renderBoard()
}

function makeMine(elMouseBtn, elCell, i, j) {
    renderMinesCounter()
    // Return if right mouse
    if (elMouseBtn !== 1) {
        playSound(GAME_SOUNDS.MAIN_ERROR)
        return
    }

    // add mines is possible only as the level default mine sum permits
    if (gMinesCount >= gLevel.MINES) {
        playSound(GAME_SOUNDS.MAIN_ERROR)
        return
    }
    gMinesCount++
    
    // Model
    gBoard[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: true,
        isMarked: false,
        isFlagged: false,
    }

    gGame.data.minesCoords.push({ i, j })

    // DOM
    renderMine(elCell)
}

function renderMine(elCell) {
    elCell.innerText = MINE
    elCell.classList.remove('hidden-by-font-size')
    elCell.classList.remove('outset')
}

function resetCreatorMode() {
    // Model
    gMinesCount = 0
    gGame.state.isCreateModeGameActive = false
}





