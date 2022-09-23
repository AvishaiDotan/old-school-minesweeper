'use strict'

// Hold the count for opened mines that aren't end the game (as for lives functions)
var openedMinesCounter = 0;

function renderMinesCounter() {
    var elDiv = document.querySelector('.left-mines-counter')

    // Handle Exception when counter gets to minus levels set it to 0
    // => happens because of lives functions
    var leftMines = ((gLevel.MINES - openedMinesCounter) >= 0) ? gLevel.MINES - openedMinesCounter : 0
    elDiv.innerText = leftMines
}


function removeMineFromCounter() {
    openedMinesCounter++
}

function addMineFromCounter() {
    openedMinesCounter--
}

function resetMinesCounter() {
    openedMinesCounter = 0
}
