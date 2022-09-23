'use strict'

// Hold the amount of removed lives for rendering and modeling
var gRemovedLives = 0
var gLives;

function addLives() {
    if (gGame.state.isGameEnd) {
        playSound(GAME_SOUNDS.MAIN_ERORR)
        return
    } 

    var amount;
    // Model => amount based on level
    if (gLevel === LEVELS[0]) amount = 1
    if (gLevel === LEVELS[1]) amount = 3
    if (gLevel === LEVELS[2]) amount = 4
    gLives = amount

    //DOM
    renderLives()
}

function renderLives() {
    const elLives = document.querySelector('.lives-container') 

    var strHTML = ''
    for (var i = 0; i < gLives; i++) {
        strHTML += `<span data-i="${i}">❤️</span>`
    }

    elLives.innerHTML = strHTML
}

function removeOneLife(cellCoords) {
    playSound(GAME_SOUNDS.FLAG)
    gRemovedLives++

    const hearts = document.querySelectorAll('.lives-container span')
    for (var i = 0; i < gRemovedLives; i++) {
        hearts[i].classList.add('hidden-by-brightness')
    }
    
    // Model
    gLives--

    gBoard[cellCoords.i][cellCoords.j].isMine = true


    gBoard[cellCoords.i][cellCoords.j].isFlagged = true
    gGame.counters.markedCount++

    // Handle also mines counter
    removeMineFromCounter()
    renderMinesCounter()
}

