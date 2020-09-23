/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor () {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
     * createPhrases creates all the phrase objects for the gaem
     * @returns {Object[]} returns array of phrase objects
     */
    createPhrases() {
        const phrases = [
            new Phrase("How are you"),
            new Phrase("Apple sauce"),
            new Phrase("Dwight Schrute"),
            new Phrase("Computer"),
            new Phrase("Video Games")
        ];
        return phrases;
    }

    /**
     * startGame hides the overlay, selects a phrase and loads it to the screen
     */
    startGame () {
        const overlay = document.getElementById('overlay');
        overlay.style.visibility = "hidden";
        overlay.classList.remove("win", "lose");
        overlay.classList.add("start");

        //Reset the phrase
        const phraseUl = document.getElementById('phrase').firstElementChild;
        phraseUl.querySelectorAll('*').forEach(phrase => phrase.remove());

        //reset the keyboard
        const keys = document.querySelectorAll(".keyrow > button");
        for (let key of keys) {
            key.disabled = false;
            key.classList.remove("chosen", "wrong");
            key.classList.add("key");
        }

        //reset the hearts
        const heartsLi = document.getElementsByClassName('tries');
        for (let heart of heartsLi) {
            heart.firstElementChild.src = "images/liveHeart.png";
        }

        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * getRandomPhrases picks a random phrase from the phrases array
     * @returns {string} phrase chosen at random
     */
    getRandomPhrase () {
        const phrases = this.phrases;
        return phrases[Math.floor(Math.random() * phrases.length)];
    }

    /**
     * handleInteraction does multiple things:
     * 1. Disables the guessed keyboard button
     * 2. Checks if the player's guess is correct
     *  a. If not correct it adds a class to signify that and removes a life
     *  b. If correct it adds a class to signify that, reveals the matched letters on the screen and checks the win condition
     * @param {Object} e the event object passed when clicking a keyboard button
     */
    handleInteraction (guess) {
        const keys = document.querySelectorAll(".keyrow > button");
        for (let key of keys) {
            if (key.textContent === guess && this.activePhrase !== null){
                key.disabled = true;

                if (!this.activePhrase.checkLetter(guess)){
                    key.classList.add('wrong');
                    this.removeLife();
                } else {
                    key.classList.add('chosen');
                    this.activePhrase.showMatchedLetter(guess);

                    if(this.checkForWin()) {
                        this.gameOver(true);
                    }
                }
                break;
            }
        }
    }

    /**
     * removeLife increments missed guesses by 1 and removes a life from the screen.
     * Also it checks if 5 guess were incorrect and calls gameOver
     */
    removeLife() {
        const heartsLi = document.getElementsByClassName('tries');
        const heart = heartsLi[this.missed].firstElementChild;
        heart.src = "images/lostHeart.png";

        this.missed += 1;
        if (this.missed >= 5) {
            this.gameOver(false);
        }
    }

    /**
     * checkForWin checks if all the letters are showing on the screen
     * @returns {boolean} returns true if all letters are revealed
     */
    checkForWin() {
        const phraseUl = document.getElementById('phrase').firstElementChild;
        const phraseLetters = phraseUl.children;

        for (let phraseLetter of phraseLetters) {
            if (phraseLetter.classList.contains('hide')){
                return false;
            }
        }
        return true;
    }

    /**
     * gameOver checks if the player has won or not and displays an appropriate message
     * @param {boolean} status this tells the function if the player has won or not
     */
    gameOver(status) {
        const overlay = document.getElementById('overlay');
        const gameOverMessage = document.getElementById('game-over-message');
        overlay.style.visibility = "visible";

        if(status) {
            gameOverMessage.textContent = "You Win!";
            overlay.classList.replace("start", "win");
        } else {
            gameOverMessage.textContent = "You Lose!";
            overlay.classList.replace("start", "lose");
        }    
    }
}