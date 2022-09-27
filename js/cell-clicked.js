'use strict'

// Open cells and Mark cells Functions
function cellClicked(ev, elCell, i, j) {

    /* Handle Exceptions */

    // run PlayHint and return from function
    // Prevent undesired open cells
    if (gGame.state.isHintActive) {
        playHint({i, j})
        return
    }

    // Activate make mine and return when in creation mode
    if (gGame.state.isCreateModeActive) {
        makeMine(ev.which, elCell, i, j)
        return
    }

    // Denied when game end
    if (gGame.state.isGameEnd) {
        playSound(GAME_SOUNDS.MAIN_ERROR)
        return
    } 

    // Set Mega Hint
    if (gIsMegaHintModeActive) {
        setMegaHintCoord({i, j})
        return
    }


    // Wait until clearTimeout
    if (gGame.state.isSafeClickActive) return
    
    // Prevent from "setFirstClickToValid()" to render the board when in creation mode
    if (!gGame.state.isOn && !gGame.state.isCreateModeGameActive) {
        setFirstClickToValid({i, j})
    // Prevent from rendering again when in CreateModeGame state
    } else if (gGame.state.isCreateModeGameActive && !gGame.state.isOn) {
        setMinesNegsCount()
        renderBoard()    
    }
    
    // run function according to mouse clicks
    if (ev.which === 1) openCell(i, j)
    else if (ev.which === 3) markCell(i, j)

    // check for win \ lose
    checkWin()    
}

function openCell(i, j) {
    
    // Play sound only if the game just started
    if (!gGame.state.isOn) playBackgroundSound()

    // Set "gGame.state.isOn" to "true" only when player pressed left mouse key 
    gGame.state.isOn = true

    // display bottom btns
    renderBottomMenuBtns()
    
    // start interval if isn't one
    if (!gTimerInterval) startTimer()

    const cell = gBoard[i][j]
    if (cell.isMarked) {
        playSound(GAME_SOUNDS.MAIN_ERROR)
        return
    }

    // if there is lives left and cell is mine => remove life for mine
    if (gLives && cell.isMine){
        removeOneLife({i, j})
    // if there is no life left (suitable also when user didn't use lives) lose the game
    } else if (!gLives && cell.isMine) {
        gameLose()
    }     

    /* Handle appropriate open of cells */
    if (cell.minesAroundCount === 0)  fullExpand({i,j})
    if (cell.minesAroundCount === 0 && !cell.isMine) expandShown({i, j})
    else {
        gBoard[i][j].isShown = true
        gGame.counters.shownCount++
    }

    // DOM
    renderBoard()
    playSound(GAME_SOUNDS.CLICK)
}

function markCell(i, j) {
    // Return When starting game with right mouse key (necessary for other functions)
    if (!gGame.state.isOn) {
        playSound(GAME_SOUNDS.MAIN_ERROR)
        return
    }
    
    const cell = gBoard[i][j]
    // Return if opend cell is clicked
    if (cell.isShown && !cell.isMarked) {
        playSound(GAME_SOUNDS.MAIN_ERROR)
        return
    }

    // Play mark/unmark cell
    playSound(GAME_SOUNDS.FLAG)


    // delete marking if clicking on already marked cell
    if (cell.isMarked) {
        unMarkCell(cell)
        return
    }

    // limit addition of marked cells to the sum of mines
    if (gGame.counters.markedCount < gLevel.MINES) { 

        // remove one from the amount of mines left to play
        removeMineFromCounter()

        // Model
        
        cell.isMarked = true
        cell.isShown = true
        gGame.counters.markedCount++
    }

    // DOM
    renderBoard()
    renderMinesCounter()
}

function unMarkCell(cell) {

    // Update Model
    cell.isMarked = false
    cell.isShown = false
    gGame.counters.markedCount--

    // add one from the amount of mines left to play
    addMineFromCounter()

    // Update DOM
    renderBoard()
    renderMinesCounter()
}

// TODO: Look at first-click-valid.js
function setFirstClickToValid(coords) {
    gFirstClickCoords = {i: coords.i, j: coords.j}
    gBoard = buildBoard()
    resetMineCoords()
    addMines()
    setMinesNegsCount()
}

function fullExpand(cellCoords) {
    for (var i = cellCoords.i - 1; i <= cellCoords.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellCoords.j - 1; j <= cellCoords.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue 
            if (!gBoard[i][j].isShown) {
                gBoard[i][j].isShown = true
                gGame.counters.shownCount++
                if (gBoard[i][j].minesAroundCount === 0) fullExpand({i, j})
                
            }
        }
    }
    // When finished play sound
    playSound(GAME_SOUNDS.EXPAND)
}