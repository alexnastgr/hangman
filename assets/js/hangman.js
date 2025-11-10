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
