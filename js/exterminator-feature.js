'use strict'

// TODO: Debug and implement


// var gIsExterminatorModeActive = true

// function runExterminator() {

//     if (!gGame.state.isOn) {
//         playSound(GAME_SOUNDS.MAIN_ERROR)
//         return
//     }

//     gIsExterminatorModeActive = false

//     var numOfExterminations = getNumOfExterminations()

//     // Update mines Counter
//     gLevel.MINES -= numOfExterminations
    

//     for (var i = 0; i < numOfExterminations; i++) {
        
//         // Prevent Extermination of opened mine => as for using lives feature
//         var randomMineIdx = getRandomNotShownMineIdx()
        
//         // Model
//         var randomMineCoords = gGame.data.minesCoords.splice(randomMineIdx, 1)[0]
//         subtractMinesAroundCount(randomMineCoords)

//         var randomMine = gBoard[randomMineCoords.i][randomMineCoords.j]
//         randomMine.isMine = false
 
//     }

//     renderBoard()
//     renderMinesCounter()
// }

// function getNumOfExterminations() {
//     if (gLevel === GAME_LEVELS[0]) return 1
//     return 3
// }

// function getRandomNotShownMineIdx() {
//     var randomMineIdx = getRandomIntInclusive(0, gGame.data.minesCoords.length - 1)
//     var randomMineCoords = gGame.data.minesCoords[randomMineIdx]
//     var randomMine = gBoard[randomMineCoords.i][randomMineCoords.j]
//     while (randomMine.isShown) {
//         var randomMineIdx = getRandomIntInclusive(0, gGame.data.minesCoords.length - 1)
//         var randomMineCoords = gGame.data.minesCoords[randomMineIdx]
//         var randomMine = gBoard[randomMineCoords.i][randomMineCoords.j]
//     }

//     return randomMineIdx
// }

// function subtractMinesAroundCount(mineIdx) {
//     for (var i = mineIdx.i - 1; i <= mineIdx.i + 1; i++) {
//         if (i < 0 || i >= gBoard.length) continue

//         for (var j = mineIdx.j - 1; j <= mineIdx.j + 1; j++) {
//             if (j < 0 || j >= gBoard[0].length) continue
//             if (i === mineIdx.i && j === mineIdx.j) continue

//             gBoard[i][j].minesAroundCount--
//         }
//     }
// }


