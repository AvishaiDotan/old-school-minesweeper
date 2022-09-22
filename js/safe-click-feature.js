'use strict'
const SAFE_CLICKS_AMOUNT = 3
var gRemainingSafeClicks;

var gIsSafeBtnReady = false

function initSafeClick(elBtn) {

    if (!gGame.state.isOn || gGame.state.isGameEnd) return
    if (gGame.state.isSafeClickActive) return

    if (!gIsSafeBtnReady) {
        firstSafeClickInit(elBtn)
        return
    }

    if (!gRemainingSafeClicks) return

    // Model
    gRemainingSafeClicks--

    // DOM
    elBtn.innerText = `You Have ${gRemainingSafeClicks} Left...${'🔎'.repeat(gRemainingSafeClicks)}`

    // Functionlity
    if (gRemainingSafeClicks >= 0) playSafeClick()
}

function playSafeClick() {
    gGame.state.isSafeClickActive = true

    const safeCellCoords = getEmptyCell()
    gBoard[safeCellCoords.i][safeCellCoords.j].isShown = true
    renderBoard()

    setTimeout(() => {
        gGame.state.isSafeClickActive = false
        gBoard[safeCellCoords.i][safeCellCoords.j].isShown = false
        renderBoard()
    }, 1000)
}

function firstSafeClickInit(elBtn) {
    // Model
    gRemainingSafeClicks = SAFE_CLICKS_AMOUNT
    gIsSafeBtnReady = true

    // DOM
    elBtn.innerText = `You Have ${gRemainingSafeClicks} Left...${'🔎'.repeat(gRemainingSafeClicks)}`
}

function resetSafeClick() {
    //Model
    gIsSafeBtnReady = false
    gGame.state.isSafeClickActive = false
    gRemainingSafeClicks = 0

    // DOM
    const elBtn = document.querySelector('.safe-click-button')
    elBtn.innerText = `Add Safe-Clicks`
}



