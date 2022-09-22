'use strict'
const SAFE_CLICKS_AMOUNT = 3
var gRemainingSafeClicks;

var gIsSafeBtnReady = false
var gIsSafeClickOn = false

function initSafeClick(elBtn) {

    if (!gGame.state.isOn || gGame.state.isGameEnd) return
    if (gIsSafeClickOn) return

    if (!gIsSafeBtnReady) {
        firstInit(elBtn)
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
    gIsSafeClickOn = true

    const safeCellCoords = getEmptyCell()
    gBoard[safeCellCoords.i][safeCellCoords.j].isShown = true
    renderBoard()

    setTimeout(() => {
        gIsSafeClickOn = false
        gBoard[safeCellCoords.i][safeCellCoords.j].isShown = false
        renderBoard()
    }, 1000)
}

function firstInit(elBtn) {
    // Model
    gRemainingSafeClicks = SAFE_CLICKS_AMOUNT
    gIsSafeBtnReady = true

    // DOM
    elBtn.innerText = `You Have ${gRemainingSafeClicks} Left...${'🔎'.repeat(gRemainingSafeClicks)}`
}

function resetSafeClick() {
    //Model
    gIsSafeBtnReady = false
    gIsSafeClickOn = false
    gRemainingSafeClicks = 0

    // DOM
    const elBtn = document.querySelector('.safe-click-button')
    elBtn.innerText = `Add Safe-Clicks`
}



