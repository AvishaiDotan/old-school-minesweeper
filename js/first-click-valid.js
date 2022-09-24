'use strict'

// var gFirstClickCoords = {i: 0, j: 0}


// TODO: Debug and implement

// function setFirstClickToValid(coords) {
//     // gFirstClickCoords = {i: coords.i, j: coords.j}
//     updateModelByFirstClick(coords) 
//     renderBoard()
// }

// function updateModelByFirstClick(cellCoords) {
//     for (var i = cellCoords.i - 1; i <= cellCoords.i + 1; i++) {
//         if (i < 0 || i >= gBoard.length) continue

//         for (var j = cellCoords.j - 1; j <= cellCoords.j + 1; j++) {
//             if (j < 0 || j >= gBoard[0].length) continue
            
//             if (gBoard[i][j].isMine) {
//                 gBoard[i][j].isMine = false
//                 deleteMineByCoord({i, j})
//                 subtractMinesAroundCount({i, j})
//                 gLevel.MINES -= 1

//                 renderMinesCounter()
//             }
//         }
//     }
// }

// function deleteMineByCoord(deletedMineCoords) {
//     for (var i = 0; i < gGame.data.minesCoords.length; i++) {
//         if (deletedMineCoords.i === gGame.data.minesCoords[i].i &&
//             deletedMineCoords.j === gGame.data.minesCoords[i].j) {
//                 gGame.data.minesCoords.splice(i, 1)
//             }        
//     }
// }