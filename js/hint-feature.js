'use strict'
var gHintsAmount = 3


function renderHints() {
    const elHints = document.querySelector('.hints-container')
    var strHTML = ''
    for (var i = 0; i < gHintsAmount; i++) {
        strHTML += `<span onclick="useHint(this)">💡</span>`
    }
    elHints.innerHTML = strHTML
}

function useHint(elHint) {
    if (!gGame.state.isOn || !gHintsAmount || 
        gGame.state.isHintActive || gGame.state.isGameEnd) return


    // MODEL
    gGame.state.isHintActive = true
    gHintsAmount--

    // DOM
    elHint.classList.add('hint-activated')
   
    setTimeout(() => {
        elHint.classList.add('hidden-by-brightness')
        gGame.state.isHintActive = false
    }, 1000)
}

function playHint(cellCoords) {
    gGame.state.isHintActive = false

    expandShown(cellCoords)
    renderBoard()

    setTimeout(() => {
        hideShown(cellCoords)
        renderBoard()}
    , 1000)
}

function expandShown(cellCoords) {
    for (var i = cellCoords.i - 1; i <= cellCoords.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellCoords.j - 1; j <= cellCoords.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            
            if (!gBoard[i][j].isShown) {
                gBoard[i][j].isShown = true
                gGame.counters.shownCount++
            }
        }
    }
}

function hideShown(cellCoords) {
    for (var i = cellCoords.i - 1; i <= cellCoords.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellCoords.j - 1; j <= cellCoords.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue

            if (gBoard[i][j].isShown) {
                gBoard[i][j].isShown = false
                gGame.counters.shownCount--
            }
        }
    }
}

function fullExpand(cellCoords) {

    for (var i = cellCoords.i - 1; i <= cellCoords.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellCoords.j - 1; j <= cellCoords.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue 

            if (!gBoard[i][j].isShown) {

                gBoard[i][j].isShown = true
                gGame.counters.shownCount++
                if (gBoard[i][j].minesAroundCount === 0) fullExpand({i, j})
                
            }
        }
    }
}
