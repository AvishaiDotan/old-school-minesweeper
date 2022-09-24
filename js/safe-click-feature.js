'use strict'

//Globals
const SAFE_CLICKS_AMOUNT = 3

// Counter for left safe clicks
var gRemainingSafeClicks;
var gIsSafeBtnReady = false

function initSafeClick(elBtn) {

    // Safe click isnt enabled in start and in end of game => PREVENT CRASH
    // TODO: change Hover btn style
    if (!gGame.state.isOn || gGame.state.isGameEnd) {
        playSound(GAME_SOUNDS.MAIN_ERROR)
        return
    }

    if (gGame.state.isSafeClickActive) return

    // Special first init
    if (!gIsSafeBtnReady) {
        firstSafeClickInit(elBtn)
        return
    }


    if (!gRemainingSafeClicks) {
        playSound(GAME_SOUNDS.MAIN_ERROR)
        return
    } 

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

    // Play error sound when there are no safe clicks coords => show that cell
    if (!safeCellCoords) {
        playSound(GAME_SOUNDS.MAIN_ERROR)
        gGame.state.isSafeClickActive = false
        return
    } else {
        gBoard[safeCellCoords.i][safeCellCoords.j].isShown = true
        renderBoard()
    }

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



