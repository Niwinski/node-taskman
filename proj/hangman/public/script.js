const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMsg = document.getElementById("final-message");

const bodyParts = document.querySelectorAll(".figure-part");

const words = ["hello", "application", "foobar", "wizard"];

let selectedWord = words[0];

let correctLetters = ["h", "l", "o", "a", "p"];
let wrongLetters = [];

function updateWrongLetters() {
    wrongLetters.sort();
    wrongLettersEl.innerText = wrongLetters.toString();
    bodyParts.forEach((e, index) => {
        e.style.display = index < wrongLetters.length ? "flex" : "none";
    });
    if (wrongLetters.length == bodyParts.length) {
        // you lost!
        finalMsg.innerText = "You lost!";
        popup.style.display = "flex";
    }
}

function showNotification(ch) {
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

function displayWord() {
    console.log(selectedWord.split(""));
    wordEl.innerHTML = selectedWord
        .split("")
        .map((l) => `<span class="letter">${correctLetters.includes(l) ? l : " "}</span>`)
        .join("");
    const guessedWord = wordEl.innerText.replace(/\n/g, "");

    if (guessedWord === selectedWord) {
        finalMsg.innerText = "Congratulations! you won!";
        popup.style.display = "flex";
    }
}

window.addEventListener("keydown", (e) => {
    const ch = e.key.toLowerCase();
    if (ch >= "a" && ch <= "z") {
        if (correctLetters.includes(ch) || wrongLetters.includes(ch)) {
            showNotification();
        } else {
            if (selectedWord.includes(ch)) {
                correctLetters.push(ch);
            } else {
                wrongLetters.push(ch);
                // draw another shape.
                updateWrongLetters(ch);
            }
            displayWord();
        }
    }
});

function initGame() {
    selectedWord = "booyeah";

    correctLetters = [];
    wrongLetters = [];

    updateWrongLetters();

    displayWord();
}
// restart game
playAgainBtn.addEventListener("click", () => {
    initGame();
    popup.style.display = "none";
});

initGame();
