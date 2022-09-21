'use strict'

// TODO: COMPRESS all negs function into one function
// TODO: COMPRESS all render function into one function
// SPLIT FUNCITON TO DIFFERENT FILES
// TODO:
/* float: right;
overflow: visible;
position: relative;
z-index: 1000;
height: 177px;
width: 100%; */

// Global Consts
const MINE = '💣'
const EMPTY = '[]'
const FLAG = '🚩'

const LEVELS = [
    {SIZE: 4,MINES: 2, id: 0},
    {SIZE: 8,MINES: 14, id: 1},
    {SIZE: 12,MINES: 32, id: 2} 
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
var gLives;

// Main Functions
function initGame() { 
    // Model Functions
    if (gGame?.intervals.timerInterval) clearTimerInterval()
    renderSmileEmoji(EMOJI_STATES.success)
    resetGameVars()
    gBoard = buildBoard()
    addMines()
    setMinesNegsCount()
    defineEmptyCells()

    // DOM
    renderBoard()
    renderLives()
    renderHints()
}


// MODEL Functions
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
            if (gBoard[i][j].isMine) applyNegsCount({i, j})
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
                color = getColor(cellStr)
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








