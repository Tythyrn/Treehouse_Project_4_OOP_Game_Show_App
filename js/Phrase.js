/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor (phrase) {
        this.phrase = phrase.toLowerCase();;
    }

    /**
     * addPhraseToDisplay takes the phrase of the class and adds it to the screen
     */
    addPhraseToDisplay() {
        const phraseUl = document.getElementById('phrase').firstElementChild;
        for (let character of this.phrase) {
            let li = document.createElement('li');

            if (character !== " "){
                li.classList.add(`hide`, `letter`, `${character}`);
            } else {
                li.classList.add('space');
            }

            li.textContent = character;
            phraseUl.appendChild(li);
        }
    }

    /**
     * checkLetter validates if a player's guess is correct
     * @param {string} guess guess of the player
     * @returns {boolean} returns if the guess was correct or not
     */
    checkLetter (guess) {
        for (let character of this.phrase) {
            if (character === guess) {
                return true;
            }
        }
        return false;
    }

    /**
     * showMatchedLetter reveals all the correct letters based on the player's guess
     * @param {string} guess guess of the player
     */
    showMatchedLetter(guess) {
        const matchedLi = document.getElementsByClassName(guess);
        for (let li of matchedLi) {
            li.classList.replace('hide', 'show');
        }
    } 
}