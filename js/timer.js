'use strict'

var gTimerInterval = null

function startTimer() {
    const currTime = Date.now()
    gTimerInterval = setInterval(renderTimer, 31, currTime)
}

function renderTimer(currTime) {
    const elTimer = document.querySelector('.timer')
    // Model
    gGame.counters.secsPassed = ((Date.now() - currTime) / 1000).toFixed(3)
    // DOM
    elTimer.innerText = gGame.counters.secsPassed
}

function resetElTimer() {
    // DOM
    const elTimer = document.querySelector('.timer')
    elTimer.innerText = '0.000'
}

function clearTimerInterval() {
    // Model
    clearInterval(gTimerInterval)
    gTimerInterval = 0
}