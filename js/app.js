'use strict'

// TODO: COMPRESS all negs function into one function
// TODO: COMPRESS all render function into one function
// Refractor "renderBoard()"
// TODO: refractor isEmpty To negsCellCount
// Check LOCAL STORAGE FUCNTION
// delete negs.js

/* float: right;
overflow: visible;
position: relative;
z-index: 1000;
height: 177px;
width: 100%; */

// Global Consts
const MINE = '💣'
const EMPTY = ''
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

// Main Functions
function initGame() { 
    // Model Functions
    if (gGame?.intervals.timerInterval) clearTimerInterval() //Check If can remove ?
    renderSmileEmoji(EMOJI_STATES.success)
    resetGameVars()
    gBoard = buildBoard()
    addMines()
    setMinesNegsCount()

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
        isMarked: false,
        isFlagged: false,  
       }   
}

function addMines() {
    for (var i = 0; i < gLevel.MINES; i++) {
        const mineCoord = getEmptyCell()
        gGame.data.minesCoords.push(mineCoord)
    }
}

function setMinesNegsCount() {
    for (var k = 0; k < gGame.data.minesCoords.length; k++) {
        const mineCoord = gGame.data.minesCoords[k]


        for (var i = mineCoord.i - 1; i <= mineCoord.i + 1; i++) {
            if (i < 0 || i >= gBoard.length) continue
    
            for (var j = mineCoord.j - 1; j <= mineCoord.j + 1; j++) {
                if (j < 0 || j >= gBoard[0].length) continue
                
                if (i === mineCoord.i && j === mineCoord.j) {
                    gBoard[i][j].isMine = true
                    continue
                }

                gBoard[i][j].minesAroundCount++
            }
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
            var cellClass = 'cell '
            
            if (cell.isMarked) cellStr = FLAG
            else if (cell.isMine) cellStr = MINE
            else if (cell.minesAroundCount === 0) cellStr = EMPTY
            else if (cell.minesAroundCount > 0) {
                cellStr = gBoard[i][j].minesAroundCount
                color = getColor(cellStr)
            } 

            if (!cell.isShown) cellClass += ' hidden-by-font-size outset'          
            strHTML += `<td><span class="${cellClass}" style="color: ${color}"onmousedown="cellClicked(event ,this, ${i}, ${j})">${cellStr}</span></td>`
        }
        strHTML += `</tr>`
    }
    elTable.innerHTML = strHTML
}









