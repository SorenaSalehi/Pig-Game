"use sctrict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];

//let playing = true;
//this statement will be used to start or stop the game, so that we can disable the button when the game is over
//like this statement we can use so  much in our code

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  //1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  //2. Display the dice
  diceEl.classList.remove("hidden");
  diceEl.src = `../img/dice-${dice}.png`;
  if (dice !== 1) {
    //3. Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //3. Switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  score[activePlayer] += currentScore; //add current score to active player score
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  if (score[activePlayer] >= 100) {
    //check if player won the game
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.toggle("player--winner");
    diceEl.classList.add("hidden");
    btnRoll.disabled = true;
    btnHold.disabled = true;
  } else {
    //switch to next player
    switchPlayer();
  }
});

//new game
btnNew.addEventListener("click", function () {
  diceEl.classList.add("hidden");
  btnRoll.disabled = false;
  btnHold.disabled = false;
  activePlayer = 0;
  score = [0, 0];
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
});
