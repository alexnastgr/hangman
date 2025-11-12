import { Letters } from "./letters.js";

let hangID = 1; // Current hangman step

// ------------------------
// DOM Elements
// ------------------------
const lettersArea = document.getElementById("letters");
const hangmanVect = document.getElementById("hangman");
const hiddenWord = document.getElementById("hiddenword");

// ------------------------
// Game State
// ------------------------
let currentWord = "";
let lettersArray = [];
let displayArray = [];


/**
 * Render the hidden word
 */
const renderHiddenWord = () => {
  hiddenWord.textContent = displayArray.join(" ");
};


/**
 * Select a random word from the JSON file
 */
const loadRandomWord = async () => {
  try {
    const response = await fetch("./words.json");
    const words = await response.json();

    currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    lettersArray = currentWord.split("");

    displayArray = lettersArray.map((ltr, idx) =>
      idx === 0 || idx === lettersArray.length - 1 ? ltr : "_"
    );

    renderHiddenWord();
  } catch (err) {
    console.error("Error loading words:", err);
  }
};


/**
 * Creates a clickable letter button
 */
const createLetterButton = (letter) => {
  const btn = document.createElement("button");
  btn.textContent = letter;
  btn.classList.add("letter");

  btn.addEventListener("click", () => handleGuess(letter, btn));

  lettersArea.appendChild(btn);
};



/**
 * Check if player has won
 */
const checkWinCondition = () => {
  if (!displayArray.includes("_")) {
    alert(`You won! The word was: ${currentWord}`);
  }
};




/**
 * Handle a letter guess
 */
const handleGuess = (letter, btn) => {
  btn.disabled = true;

  let correctGuess = false;

  lettersArray.forEach((ltr, idx) => {
    if (ltr === letter) {
      displayArray[idx] = letter;
      correctGuess = true;
    }
  });

  renderHiddenWord();

  if (!correctGuess) {
    hangID++;
    hangmanVect.dataset.step = hangID;
    console.log("Wrong guess, hangman state:", hangID);
  }

  checkWinCondition();
};


/**
 * Initialize all letter buttons
 */
const initLetterButtons = () => {
  Letters.forEach(createLetterButton);
};


/**
 * Initialize the game
 */
const initGame = () => {
  initLetterButtons();
  loadRandomWord();
};


initGame();
