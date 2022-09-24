'use strict'
var gIsBlackMode = false
var gIsMuted = false

const EMOJI_STATES = {
    success: 1,
    won: 2, 
    lost: 0,
}

function getEmptyCell() {
    var emptyCell = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {

            // Dont Place Mine in the first cell and in his first negs
            if ((i >= gFirstClickCoords.i - 1 && i <= gFirstClickCoords.i + 1) &&
                (j >= gFirstClickCoords.j - 1 && j <= gFirstClickCoords.j + 1)) continue 
                
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) emptyCell.push({i, j})
        }
    }
    return emptyCell[getRandomIntInclusive(0, emptyCell.length - 1)]
}

function displayAllMines() {
    for (var i = 0; i < gGame.data.minesCoords.length; i++) {
        const cell = gBoard[gGame.data.minesCoords[i].i][gGame.data.minesCoords[i].j]
        cell.isShown = true
    }
    renderBoard()
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getColor(num) {
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

function saveBestResultInStorage() {
    const currTime = +gGame.counters.secsPassed
    const currLevel = gLevel.id

    var levelStr = ''
    switch (currLevel) {
        case 0:
            levelStr = `easy`
            break
        case 1:
            levelStr = `medium`
            break
        case 2:
            levelStr = `hard`
            break
    }

    if (!localStorage.getItem(levelStr)) {
        localStorage.setItem(levelStr, currTime);

    } else if (currTime < localStorage.getItem(levelStr)) {
        localStorage.setItem(levelStr, currTime)
    }
}

function renderBackgoundColor(elBtn){

    var elGameContainer = document.querySelector('.game-container')

    gIsBlackMode = !gIsBlackMode

    var bgColor = gIsBlackMode ? 'black' : 'rgb(53, 53, 53)'
    var gameColor = gIsBlackMode ?  'rgb(130, 130, 130)' : 'rgb(191, 191, 191)'
    var btnStr = gIsBlackMode ? 'Default Mode' : 'Dark Mode'
    
    document.body.style.backgroundColor = bgColor
    elGameContainer.style.backgroundColor = gameColor
    elBtn.innerText = btnStr
    
}

function isDuplicate(checkCoords) {
    for (var i = 0; i < gGame.data.minesCoords.length; i++) {
        var comparedCoords = gGame.data.minesCoords[i];
        if ((checkCoords.i === comparedCoords.i) && (checkCoords.j === comparedCoords.j)) return true
    }
    return false
}

