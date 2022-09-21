'use strict'

var gRemovedLives = 0


function addLives() {
    if (gGame.state.isGameEnd) return

    var amount;
    // Model
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
    gRemovedLives++

    const hearts = document.querySelectorAll('.lives-container span')
    for (var i = 0; i < gRemovedLives; i++) {
        hearts[i].classList.add('hidden-by-brightness')
    }
    
    // Model
    gLives--
    gBoard[cellCoords.i][cellCoords.j].isMine = false
    gBoard[cellCoords.i][cellCoords.j].isMarked = true
    gGame.counters.markedCount++
}

