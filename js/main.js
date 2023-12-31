"use strict";

/*----- MAIN SCREEN CODE -----*/

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

/*----- MAIN SCREEN CODE -----*/
const hideStarterPage = document.getElementById("title-starter-page");
const mainMenu = document.querySelector("main");

hideStarterPage.addEventListener("click", function () {
  hideStarterPage.classList.add("hidden");
  mainMenu.classList.remove("hidden");
});
/*----- CODE AFTER MAIN SCREEN -----*/

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
  dice1: { img: "./images/dice-1.png", points: 0 },
  dice2: { img: "./images/dice-2.png", points: 2 },
  dice3: { img: "./images/dice-3.png", points: 3 },
  dice4: { img: "./images/dice-4.png", points: 4 },
  dice5: { img: "./images/dice-5.png", points: 5 },
  dice6: { img: "./images/dice-6.png", points: 6 },
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
  diceEl.style.visibility = "hidden";
  player1CurrentScoreEl.style.visibility = "visible";
  player2CurrentScoreEl.style.visibility = "visible";
  player1BottomEl.style.visibility = "visible";
  player2BottomEl.style.visibility = "visible";

  // Reset button state
  rollButton.disabled = false;
  rollButton.classList.remove("disabled");
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

/*----- Dice Image reset function -----*/
function diceImgReset() {
  diceEl.style.visibility = "visible";
}

/*----- Dice Image reset function -----*/
function diceImgScoreReset() {
  diceEl.src = "./images/dice-0.png";

  // Hide the dice element immediately if the game is won
  if (currentPlayer.headingEl.textContent === "WINNER!") {
    diceEl.style.visibility = "hidden";
  } else {
    diceEl.style.visibility = "visible";
  }
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
  if (Math.random() < 0.25) {
    return dice[0];
  } else {
    const randomIdx = Math.floor(Math.random() * (dice.length - 1)) + 1;
    return dice[randomIdx];
  }
}

/*----- Update the disabled state of the holdButton -----*/
function updateHoldButtonState() {
  if (parseInt(currentPlayer.currentScoreEl.textContent) <= 0) {
    holdButton.disabled = true;
  } else {
    holdButton.disabled = false;
  }
}

/*----- Flag variable to track the reset state-----*/
let isResetting = false;

/*----- Roll Button functionality -----*/
rollButton.addEventListener("click", function () {
  if (isResetting) {
    return;
  }
  diceImgReset();
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
    
    updateHoldButtonState();

    isResetting = true; 
    rollButton.disabled = true;
    rollButton.classList.add("disabled");

    setTimeout(function () {
      diceImgScoreReset();
      isResetting = false;
      rollButton.disabled = false;
      rollButton.classList.remove("disabled");
    }, 1000);
  }
});

/*----- Hold Button functionality -----*/
holdButton.addEventListener("click", function () {
  if (isResetting) {
    return; // Exit the function if the dice is still resetting
  }
  diceImgReset();
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
  updateHoldButtonState();

  isResetting = true; 
  rollButton.disabled = true;
  rollButton.classList.add("disabled");

  setTimeout(function () {
    diceImgScoreReset();
    isResetting = false;
    rollButton.disabled = false;
    rollButton.classList.remove("disabled");
  }, 1000);
});

updateHoldButtonState();

// MutationObserver for currentScoreEl elements
const observerConfig = { childList: true, subtree: true };
const observerCallback = function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      updateHoldButtonState();
    }
  }
};

const currentPlayerObserver = new MutationObserver(observerCallback);
const opponentPlayerObserver = new MutationObserver(observerCallback);

currentPlayerObserver.observe(player1CurrentScoreEl, observerConfig);
opponentPlayerObserver.observe(player2CurrentScoreEl, observerConfig);
/*----- New Game functionality -----*/
/*----- Hold Button functionality -----*/
newGameButton.addEventListener("click", function () {
  newGame();
  enableButtons();
  currentPlayer.sectionEl.classList.remove("current-turn-effect");
  currentPlayer.scoreEl.textContent = 0;

  if (currentPlayer.headingEl.textContent === "WINNER!") {
    currentPlayer.headingEl.textContent = "player 1"; // Reset the heading
    resetValues();
    currentPlayer = player1;
    diceEl.style.visibility = "hidden"; // Hide the dice element immediately
  } else {
    currentPlayer.headingEl.textContent = "player 2"; // Reset the heading
    resetValues();
    currentPlayer = player1;
    diceImgScoreReset(); // Reset dice image (regardless of winner state)
    diceEl.style.visibility = "visible"; // Show the dice element
  }

  updateHoldButtonState();
});



/*----- Initial setup -----*/
updateHoldButtonState();