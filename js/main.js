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
var gLevel = LEVELS[0]
var gFirstClickCoords = {i: 0, j: 0}

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
        gGame.minesCoords.push(mineCoord)
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
        strHTML += '❤️ '
    }
    elLives.innerText = strHTML
}



// Open cells and Mark cells Functions
// TODO Remove elCell
function cellClicked(ev, elCell, i, j) {
    setFirstClickToValid({i, j})
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

function startTimer() {
    const currTime = Date.now()
    gGame.timerInterval = setInterval(renderTimer, 31, currTime)
}

function renderTimer(currTime) {
    const elTimer = document.querySelector('.timer')
    // Model
    gGame.secsPassed = ((Date.now() - currTime) / 1000).toFixed(3)
    // DOM
    elTimer.innerText = gGame.secsPassed
}

function resetTimer() {
    // DOM
    const elTimer = document.querySelector('.timer')
    elTimer.innerText = '0.000'
}

function clearTimerInterval() {
    // Model
    clearInterval(gGame.timerInterval)
    gGame.timerInterval = 0
}

function renderSmileEmoji(state) {
    const elEmoji = document.querySelector('.emoji-restarter')
    var strHTML;

    if (state === EMOJI_STATES.lost) {
        strHTML = '🤯'
    } else if (state === EMOJI_STATES.success) {
        strHTML = '😀'
    } else if (state === EMOJI_STATES.won) {
        strHTML = '😎'	
    }

    elEmoji.innerText = strHTML
}

// TODO: BETTER SOLUTION
function setFirstClickToValid(coords) {
    var hintState = (gGame.isHintActive) ? true : false

    if (!gGame.isOn) {
        gFirstClickCoords = {i: coords.i, j: coords.j}
        initGame()
        gGame.isHintActive = hintState
    } 
}

function useHint(elHint) {

    if (!gGame.hints) return
    if (gGame.isHintActive) return

    gGame.isHintActive = true
    elHint.classList.add('hint-activated')
    gGame.hints--
   

    setTimeout(() => {
        elHint.classList.add('hidden-object')
    }, 5000)
}

function playHint(cellCoords) {
    gGame.isHintActive = false
    expandShown(cellCoords)
    renderBoard()

    setTimeout(() => {
        hideNegs(cellCoords)
        renderBoard()}
    , 1000)
}



// Reset Functions
function setLevel(newLevel) {
    gLevel = LEVELS[newLevel]
    clearTimerInterval()
    resetTimer()
    initGame()
}

function resetGameVars() {
    gGame = {
        isOn: false,
        isGameEnd: false,
        isHintActive: false,
        level: gLevel,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        timerInterval: undefined,
        minesCoords: [],
        firstClickCoords: gFirstClickCoords,
        lives: 3,
        hints: 3,
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

function renderPsuedoBoard() {
    const elTable = document.querySelector('.cells-container')
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < gBoard[0].length; j++) {       
            strHTML += `<td><span class="${cellClass}" style="color: ${color}"onmousedown="cellClicked(event ,this, ${i}, ${j})">${cellStr}</span></td>`
        }
        strHTML += `</tr>`
    }
    elTable.innerHTML = strHTML
}





