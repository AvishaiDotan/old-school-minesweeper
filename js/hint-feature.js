'use strict'

// Holder for the hints amount
var gHintsAmount = 3


function renderHints() {
    const elHints = document.querySelector('.hints-container')

    var strHTML = ''
    for (var i = 0; i < gHintsAmount; i++) {
        strHTML += `<span class="btn-hover" onclick="useHint(this)">💡</span>`
    }

    elHints.innerHTML = strHTML
}


function useHint(elHint) {
    // Handle exception's
    if (!gGame.state.isOn || !gHintsAmount || 
        gGame.state.isHintActive || gGame.state.isGameEnd) {
        playSound(GAME_SOUNDS.MAIN_ERROR)
        return
    }
    
    
    // MODEL
    gGame.state.isHintActive = true
    gHintsAmount--

    // DOM
    elHint.classList.add('hint-activated')
    elHint.classList.remove('btn-hover')
   
    // Reset hint state after 1000 ms
    setTimeout(() => {
        elHint.classList.add('hidden-by-brightness')
        gGame.state.isHintActive = false
    }, 1000)
}

function playHint(cellCoords) {
    playSound(GAME_SOUNDS.HINT)
    

    // False immediately after pressing a cell and also after 1 sec
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
                // Set new key for defining expand cells
                gBoard[i][j].hasExpanded = true
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

            // Only 'hasExpanded' cells being closed again
            if (gBoard[i][j].hasExpanded) {
                gBoard[i][j].isShown = false
                // Remove added key
                delete gBoard[i][j].hasExpanded
                gGame.counters.shownCount--
            }
        }
    }
}

function resetHints() {
    gHintsAmount = 3
    renderHints()
}


