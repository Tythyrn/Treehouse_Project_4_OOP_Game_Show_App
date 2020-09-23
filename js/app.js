/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const startButton = document.getElementById('btn__reset');
const keyboard = document.getElementById('qwerty');
let game;

/**
 * Starts the game when the user clicks the start button.  Also, acts as a reset to the game
 */
startButton.addEventListener('click', function () {
    game = new Game();
    game.startGame();
});

/**
 * Event listener for when the keyboard buttons are clicked
 */
keyboard.addEventListener('click', function (event) {
    if(event.target.classList.contains('key')){
        game.handleInteraction(event.target.textContent);
    }
});

/**
 * Event listener to check for key presses
 */
document.addEventListener('keyup', function (event) {
    let letters = /^[A-Za-z]+$/;
    if(event.key.match(letters)){
        game.handleInteraction(event.key);
    }
});