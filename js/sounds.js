
'use strict'

const GAME_SOUNDS = {
    BACKGROUND: new Audio(`sounds/background-sound.wav`),
    MAIN_ERROR: new Audio(`sounds//error-sound-effect.mp3`),
    WIN: new Audio(`sounds/winning-sound-effect.mp3`),
    CLICK: new Audio(`sounds/click.wav`),
    LOSE_SOUND: new Audio(`sounds/lose_minesweeper.wav`),
    FLAG: new Audio(`sounds/insert-flag.wav`),
    HINT: new Audio(`sounds/hint.wav`),
    RESET: new Audio(`sounds/reset.wav`),
    EXPAND: new Audio(`sounds/expand-open.wav`),
}

function playBackgroundSound() {
    playSound(GAME_SOUNDS.BACKGROUND)
    GAME_SOUNDS.BACKGROUND.loop = true
}
function stopBackgroundSound() {
    GAME_SOUNDS.BACKGROUND.pause();
}

function playSound(type) {
    type.play()
}

