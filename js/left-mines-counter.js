'use strict'

var opendMines = 0;

function renderMinesCounter() {
    var elDiv = document.querySelector('.left-mines-counter')
    var leftMines = ((gLevel.MINES - opendMines) >= 0) ? gLevel.MINES - opendMines : 0
    elDiv.innerText = leftMines
}

function addOpenMine() {
    opendMines++
}

function removeOpenMine() {
    opendMines--
}
