'use strict'

function saveBestResultInStorage() {
    const currTime = +gGame.counters.secsPassed
    const currLevelId = gLevel.id

    var levelStr = getLevelNameById(currLevelId)


    if (!localStorage.getItem(levelStr)) {
        localStorage.setItem(levelStr, currTime);

    } else if (currTime < localStorage.getItem(levelStr)) {
        localStorage.setItem(levelStr, currTime)
    }
}

function renderBestResult() {

    const elSpan = document.querySelector('.best-score')
    const currLevelId = gLevel.id
    var bestScoreStr = ''

    var levelStr = getLevelNameById(currLevelId)

    if (!localStorage.getItem(levelStr)) {
        bestScoreStr = 'No scorer yet...'
    } else {
        bestScoreStr = localStorage.getItem(levelStr)

    }

    elSpan.innerText = bestScoreStr 
}

function getLevelNameById(id) {
    switch (id) {
        case 0:
            return `easy`
            break
        case 1:
            return `medium`
        case 2:
            return `hard`
        
    }
}
