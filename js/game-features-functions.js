// TODO: BETTER SOLUTION
function setFirstClickToValid(coords) {
    // var hintState = (gGame.isHintActive) ? true : false

    // if (!gGame.isOn) {
        gFirstClickCoords = {i: coords.i, j: coords.j}
        initGame()
        // gGame.isHintActive = hintState
    // } 
}

function useHint(elHint) {

    if (!gGame.hints) return
    if (gGame.isHintActive) return

    gGame.isHintActive = true
    elHint.classList.add('hint-activated')
    gGame.hints--
   

    setTimeout(() => {
        elHint.classList.add('hidden-object')
    }, 5000)
}

function playHint(cellCoords) {
    gGame.isHintActive = false
    expandShown(cellCoords)
    renderBoard()

    setTimeout(() => {
        hideNegs(cellCoords)
        renderBoard()}
    , 1000)
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