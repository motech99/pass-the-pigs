"use strict";

// ---  MAIN SCREEN CODE ---

// Selecting elements
const start = document.querySelector("#title-starter-page");
const startButton = start.querySelector("a");

// Variables
let ex = 10;
let intervalId = 0;

// Animation function
function swing(element) {
  function update(time) {
    const x = Math.sin(time / 1231) * ex;
    const y = Math.sin(time / 1458) * ex;

    element.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;

    requestAnimationFrame(update);
  }

  update(0);
}

// Invoking the animation function
swing(start);

// Event listeners
start.addEventListener("mouseover", () => {
  ex = 20;
  intervalId = setInterval(() => {
    startButton.style.color = "pink";
  }, 250);
});

start.addEventListener("mouseout", () => {
  ex = 10;
  clearInterval(intervalId);
  startButton.style.color = "white";
});

//  ---  MAIN SCREEN CODE ---

//  ---  CODE AFTER MAIN SCREEN ---
const hideStarterPage = document.getElementById("title-starter-page");
const bodyBackground = document.querySelector("body");
const mainMenu = document.querySelector("main");

hideStarterPage.addEventListener("click", function () {
  hideStarterPage.classList.add("hidden");
  mainMenu.classList.remove("hidden");
});

/*----- selecting elements -----*/
const player1SectionEl = document.querySelector(".player-1-section");
const player2SectionEl = document.querySelector(".player-2-section");
const player1HeadingEl = document.querySelector(".player-1-heading");
const player2HeadingEl = document.querySelector(".player-2-heading");
const player1ScoreEl = document.querySelector(".player-score-count");
const player2ScoreEl = document.querySelector(".player-2-score-count");
const player1CurrentScoreEl = document.querySelector(
  ".player-1-current-score-count"
);
const player2CurrentScoreEl = document.querySelector(
  ".player-2-current-score-count"
);
const player1BottomEl = document.querySelector(".player-1-bottom");
const player2BottomEl = document.querySelector(".player-2-bottom");
const diceEl = document.querySelector(".dice");
const rollButton = document.querySelector(".roll-btn");
const holdButton = document.querySelector(".hold-btn");
const newGameButton = document.querySelector(".new-game-btn");

/*----- constants -----*/
const DICE_LOOKUP = {
  dice1: { img: "imgs/dice-1.png", points: 0 },
  dice2: { img: "imgs/dice-2.png", points: 2 },
  dice3: { img: "imgs/dice-3.png", points: 3 },
  dice4: { img: "imgs/dice-4.png", points: 4 },
  dice5: { img: "imgs/dice-5.png", points: 5 },
  dice6: { img: "imgs/dice-6.png", points: 6 },
};

const player1 = {
  sectionEl: player1SectionEl,
  headingEl: player1HeadingEl,
  scoreEl: player1ScoreEl,
  currentScoreEl: player1CurrentScoreEl,
};

const player2 = {
  sectionEl: player2SectionEl,
  headingEl: player2HeadingEl,
  scoreEl: player2ScoreEl,
  currentScoreEl: player2CurrentScoreEl,
};

/*----- initialising current player-----*/
let currentPlayer = player1;
let bothplayers = [player1, player2];
/*----- Starting conditions -----*/
player1ScoreEl.textContent = 0;
player2ScoreEl.textContent = 0;
player1CurrentScoreEl.textContent = 0;
player2CurrentScoreEl.textContent = 0;
diceEl.classList.add("hidden");

/*----- Winning function -----*/
function winner() {
  rollButton.style.visibility = "hidden";
  holdButton.style.visibility = "hidden";
  diceEl.style.visibility = "hidden";
  player1CurrentScoreEl.style.visibility = "hidden";
  player2CurrentScoreEl.style.visibility = "hidden";
  player1BottomEl.style.visibility = "hidden";
  player2BottomEl.style.visibility = "hidden";

  player1ScoreEl.style.visibility = "visible";
  player2ScoreEl.style.visibility = "visible";
  currentPlayer.headingEl.style.visibility = "visible";
}

/*----- New Game function -----*/
function newGame() {
  rollButton.style.visibility = "visible";
  holdButton.style.visibility = "visible";
  diceEl.style.visibility = "visible";
  player1CurrentScoreEl.style.visibility = "visible";
  player2CurrentScoreEl.style.visibility = "visible";
  player1BottomEl.style.visibility = "visible";
  player2BottomEl.style.visibility = "visible";
}
/*----- Reset function -----*/
function resetValues() {
  player1.headingEl.textContent = "player 1";
  player2.headingEl.textContent = "player 2";
  player1.scoreEl.textContent = 0;
  player2.scoreEl.textContent = 0;
  player1.currentScoreEl.textContent = 0;
  player2.currentScoreEl.textContent = 0;
}

/*----- disable/Enable Buttons function -----*/
function disableButtons() {
  rollButton.disabled = true;
  holdButton.disabled = true;
}

function enableButtons() {
  rollButton.disabled = false;
  holdButton.disabled = false;
}
/*----- Rolling dice functionality -----*/

function getRandomDICE() {
  const dice = Object.keys(DICE_LOOKUP);
  // made it harder to play the game as
  // there is a HIGHER chance of landing on 1
  if (Math.random() < 0.3) {
    return dice[0];
  } else {
    const randomIdx = Math.floor(Math.random() * (dice.length - 1)) + 1;
    return dice[randomIdx];
  }
}

/*----- Roll Button functionality -----*/
rollButton.addEventListener("click", function () {
  diceEl.classList.remove("hidden");
  currentPlayer.sectionEl.classList.add("current-turn-effect");

  const randomDice = getRandomDICE();
  const diceImg = DICE_LOOKUP[randomDice].img;
  diceEl.src = diceImg;
  const rolledDice = DICE_LOOKUP[randomDice].points;
  currentPlayer.currentScoreEl.textContent =
    Number(currentPlayer.currentScoreEl.textContent) + rolledDice;

  const resetDice = DICE_LOOKUP.dice1.img;

  if (diceImg === resetDice) {
    currentPlayer.currentScoreEl.textContent = 0;
    currentPlayer.sectionEl.classList.remove("current-turn-effect");
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentPlayer.sectionEl.classList.add("current-turn-effect");
  }
});

/*----- Hold Button functionality -----*/
holdButton.addEventListener("click", function () {
  currentPlayer.scoreEl.textContent =
    Number(currentPlayer.scoreEl.textContent) +
    Number(currentPlayer.currentScoreEl.textContent);
  currentPlayer.currentScoreEl.textContent = 0;

  if (parseInt(currentPlayer.scoreEl.textContent) >= 100) {
    currentPlayer.headingEl.textContent = "WINNER!";
    winner();
    disableButtons();
  } else {
    currentPlayer.sectionEl.classList.remove("current-turn-effect");
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentPlayer.sectionEl.classList.add("current-turn-effect");
  }
});
/*----- Hold Button functionality -----*/
newGameButton.addEventListener("click", function () {
  newGame();
  enableButtons();
  currentPlayer.sectionEl.classList.remove("current-turn-effect");
  currentPlayer.scoreEl.textContent = 0;
  if (currentPlayer.headingEl.textContent === "WINNER!") {
    resetValues();
    currentPlayer = player1;
  } else {
    resetValues();
    currentPlayer = player1;
  }
});
