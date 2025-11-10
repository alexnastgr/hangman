import { Letters } from "./letters.js";

let hangID = 0; // hangman vector ID
let usedLts = []; // used letters

/**
 *  DOM Elements initializer
 */
const lettersArea = document.getElementById("letters");
const hiddenWord = document.getElementById("hiddenword");

const createLetter = (letter) => {
  const btn = document.createElement("buttton");
  btn.textContent = letter;
  btn.classList.add("letter");
  lettersArea.append(btn);
};

Letters.forEach((letter) => {
  createLetter(letter);
});

const randomWord = () => {
  fetch("./words.json")
    .then((response) => response.json())
    .then((words) => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
    })
    .catch((err) => console.error("Error loading words:", err));
};

randomWord();
