'use strict'


// TODO: COMPRESS all negs function into one function
// SPLIT FUNCITON TO DIFFERENT FILES

// Global Consts
const MINE = '💣'
const EMPTY = '[]'
const FLAG = '🚩'

const LEVELS = [
    {SIZE: 4,MINES: 2,},
    {SIZE: 8,MINES: 14,},
    {SIZE: 12,MINES: 32,} 
]

const EMOJI_STATES = {
    success: 1,
    won: 2, 
    lost: 0,
}

// Global Vars
var gGame
var gBoard
var gLevel = LEVELS[0] // Default State
var gFirstClickCoords

// Main Functions
function initGame() { 
    // Model Functions
    if (gGame?.timerInterval) clearTimerInterval()
    renderSmileEmoji(EMOJI_STATES.success)
    resetGameVars()
    gBoard = buildBoard()
    addMines()
    setMinesNegsCount()
    defineEmptyCells()

    // DOM
    renderBoard()
    renderLives()
}




// Model Functions
function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        const row = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            row.push(createCell())
        }
        board.push(row)
    }
    return board
}

function createCell() {
    return  {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isNeg: false,
        isMarked: false,  
        isEmpty: false,
       }   
}

function addMines() {
    for (var i = 0; i < gLevel.MINES; i++) {
        const mineCoord = getEmptyCell()
        gBoard[mineCoord.i][mineCoord.j].isMine = true
        gGame.data.minesCoords.push(mineCoord)
    }
}

function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) addNegsCount({i, j})
        }
    }
}

function addNegsCount(cellCoords) {
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

function defineEmptyCells() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (!cell.isMine && !cell.isNeg) cell.isEmpty = true
        }
    }
}


// DOM Functions
function renderBoard() {
    const elTable = document.querySelector('.cells-container')
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            var cellStr;
            var color = ''

            if (cell.isMine) cellStr = MINE
            if (cell.isNeg) {
                cellStr = gBoard[i][j].minesAroundCount
                color = getNumColor(cellStr)
            } 
            if (cell.isEmpty) cellStr = EMPTY
            if (cell.isMarked) cellStr = FLAG

            var cellClass = 'cell '

            if (!cell.isShown || cell.isEmpty) cellClass += ' hidden'
            if (!(cell.isEmpty && cell.isShown)) cellClass += ' outset'

            
            
            strHTML += `<td><span class="${cellClass}" style="color: ${color}"onmousedown="cellClicked(event ,this, ${i}, ${j})">${cellStr}</span></td>`
        }
        strHTML += `</tr>`
    }
    elTable.innerHTML = strHTML
}

function getNumColor(num) {
    var color;

    switch (num) {
        case 1:
            color = 'blue'
            break
        case 2:
            color = 'green'
            break
        case 3: 
            color = 'red'
            break
        case 4: 
            color = 'purple'
            break
        case 5:
            color = 'brown'
            break
        case 6: 
            color = 'turquoise'
            break
        case 7: 
            color = 'maroon'
            break
        case 8:
            color = 'black'
            break
    }
    return color
}

function renderLives() {
    const elLives = document.querySelector('.lives') 
    var strHTML = ''
    for (var i = 0; i < gGame.lives; i++) {
        strHTML += '❤️'
    }
    elLives.innerText = strHTML
}



// Open cells and Mark cells Functions
// TODO Remove elCell
function cellClicked(ev, elCell, i, j) {
    
    // The first start
    if (!gGame.isOn) setFirstClickToValid({i, j})
    if (gGame.isGameEnd) return

    if (ev.which === 1) openCell(i, j)
    else if (ev.which === 3) markedCell(i, j)
    checkGameOver()     
}

function openCell(i, j) {
    gGame.isOn = true
    if (!gGame.timerInterval) startTimer()

    if (gGame.isHintActive) {
        playHint({i, j})
        gGame.isHintActive = false
        return
    }
    const cell = gBoard[i][j]

    if (cell.isMarked) return
    if (cell.isMine) {
        gGame.lives--
        if (!gGame.lives) gameLose()
        renderLives()
    }      

    // Model
    if (noMineNegs({i, j}) && !cell.isMine) expandShown({i, j})
    else {
        gBoard[i][j].isShown = true
        gGame.shownCount++
    }

    // DOM
    renderBoard()
}

function markedCell(i, j) {

    // must started by left key (open cell)
    if (!gGame.isOn) return
    
    const cell = gBoard[i][j]
    if (cell.isShown && !cell.isMarked) return

    if (cell.isMarked) {
        unMarkCell(cell)
        return
    }

    // limit addition of marked cells
    if (gGame.markedCount < gLevel.MINES) {  
        cell.isMarked = true
        cell.isShown = true
        gGame.markedCount++
    }

    renderBoard()
}

function unMarkCell(cell) {
    // Update Model
    cell.isMarked = false
    cell.isShown = false
    gGame.markedCount--
    // Update DOM
    renderBoard()
}



// Game Over Functions
function checkGameOver() {
    if (gGame.markedCount !== gLevel.MINES) return
    if (isAllMinesMarked() && isAllValidCellsShown()) {
        clearTimerInterval()
        gGame.isGameEnd = true
        renderSmileEmoji(2)
    }
}

function isAllMinesMarked() {
    for (var i = 0; i < gGame.minesCoords.length; i++) {
        const mineCoords = gGame.minesCoords[i]
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
    gGame.isGameEnd = true
}



// Game Utility Functions
function displayAllMines() {
    for (var i = 0; i < gGame.minesCoords.length; i++) {
        const cell = gBoard[gGame.minesCoords[i].i][gGame.minesCoords[i].j]
        cell.isShown = true
    }
    renderBoard()
}



function renderPsuedoGame() { 

    resetGameVars()
    const elTable = document.querySelector('.cells-container')
    var strHTML = ''

    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < gLevel.SIZE; j++) {       
            strHTML += `<td><span class="cell outset"></span></td>`
        }
        strHTML += `</tr>`
    }
    elTable.innerHTML = strHTML
}





