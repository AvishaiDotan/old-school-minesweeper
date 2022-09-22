'use strict'

/* function renderBoardV2() {
    const elTable = document.querySelector('.cells-container')
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            var cellStr;
            var color = ''

            if (cell.isMine) cellStr = MINE
            if (cell.isNeg) {
                cellStr = gBoard[i][j].minesAroundCount
                color = getColor(cellStr)
            } 
            if (cell.minesAroundCount === 0) cellStr = EMPTY
            if (cell.isMarked) cellStr = FLAG

            var cellClass = 'cell '

            if ((!cell.isShown || cell.minesAroundCount === 0) && !cell.isMarked) cellClass += ' hidden-by-font-size'
            if ((!(cell.minesAroundCount === 0 && cell.isShown)) || (cell.minesAroundCount === 0 && cell.isMarked)) cellClass += ' outset'

            
            strHTML += `<td><span class="${cellClass}" style="color: ${color}"onmousedown="cellClicked(event ,this, ${i}, ${j})">${cellStr}</span></td>`
        }
        strHTML += `</tr>`
    }
    elTable.innerHTML = strHTML
} */

function printBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        var str = ''
        for (var j = 0; j < gBoard[0].length; j++) {
            str += gBoard[i][j].isMine + ' '
        }
        console.log(str);
    }
}