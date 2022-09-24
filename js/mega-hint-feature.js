'use strict'

var gIsMegaHintUsed = false;
var gIsMegaHintModeActive = false
var gMegaHintCoords = []

function initMegaHint(elBtn) {

    // 
    if (gIsMegaHintModeActive || gIsMegaHintUsed) {
        playSound(GAME_SOUNDS.MAIN_ERROR)
        return
    }

    // Model
    gIsMegaHintModeActive = true

        // DOM
    elBtn.innerText = 'Mega Hint: On'
    return
}

function setMegaHintCoord(coord) {
    gMegaHintCoords.push(coord)

    if (gMegaHintCoords.length === 2) {

        if (gMegaHintCoords[0].i > gMegaHintCoords[1].i) {
            playSound(GAME_SOUNDS.MAIN_ERROR)
            setMegaHintModeToUsed()
            return
        }
        
        showMegaHint()
    }
}

function showMegaHint() {


    // Dom
    for (var i = gMegaHintCoords[0].i; i <= gMegaHintCoords[1].i; i++) {
        for (var j = gMegaHintCoords[0].j; j <= gMegaHintCoords[1].j; j++) {
            gBoard[i][j].isShown = true
        }
    }
    renderBoard()

    setTimeout(resetMegaHint, 2000)
}

function resetMegaHint() {
    for (var i = gMegaHintCoords[0].i; i <= gMegaHintCoords[1].i; i++) {
        for (var j = gMegaHintCoords[0].j; j <= gMegaHintCoords[1].j; j++) {
            gBoard[i][j].isShown = false
        }
    }
    renderBoard()
    setMegaHintModeToUsed()
}

function setMegaHintModeToUsed() {
    // Model
    gIsMegaHintUsed = true
    gIsMegaHintModeActive = false
    
    //DOM
    var elBtn = document.querySelector('.mega-hint-button')
    elBtn.innerText = 'Mega Hint: Used'
}


