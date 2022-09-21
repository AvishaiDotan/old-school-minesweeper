function startTimer() {
    const currTime = Date.now()
    gGame.intervals.timerInterval = setInterval(renderTimer, 31, currTime)
}

function renderTimer(currTime) {
    // Model
    gGame.counter.secsPassed = ((Date.now() - currTime) / 1000).toFixed(3)
    // DOM
    const elTimer = document.querySelector('.timer')
    elTimer.innerText = gGame.secsPassed
}

function resetTimer() {
    // DOM
    const elTimer = document.querySelector('.timer')
    elTimer.innerText = '0.000'
}

function clearTimerInterval() {
    // Model
    clearInterval(gGame.timerInterval)
    gGame.intervals.timerInterval = 0
}
