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
    if (gLevel === GAME_LEVELS[0]) amount = 1
    if (gLevel === GAME_LEVELS[1]) amount = 3
    if (gLevel === GAME_LEVELS[2]) amount = 4
    gLives = amount

    //DOM
    renderLives()
}

function renderLives() {
    const elLives = document.querySelector('.lives-container') 

    var strHTML = ''
    for (var i = 0; i < gLives; i++) {
        strHTML += `<span>❤️</span>`
    }

    elLives.innerHTML = strHTML
    elLives.classList.remove('btn-hover')
}

function removeOneLife(cellCoords) {
    playSound(GAME_SOUNDS.FLAG)
    gRemovedLives++

    const lives = document.querySelectorAll('.lives-container span')
    for (var i = 0; i < gRemovedLives; i++) {
        lives[i].classList.add('hidden-by-brightness')
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

function resetLives() {
    gRemovedLives = 0
    gLives = 0

    const elLives = document.querySelector('.lives-container')
    elLives.innerText = 'Add lives'
}



