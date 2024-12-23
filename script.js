'use strict';

//the two variables below are just selecting OF THE SCORE of both player one and player 2;

//Selecting the player element section
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');

const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
//Selecting the class for the dice
const diceEL = document.querySelector('.dice');

//The trophy
const trophy0 = document.querySelector('.trophy0');

const trophy1 = document.querySelector('.trophy1');
//Selecting the buttons
//1.New game
const btnNew = document.querySelector('.btn--new');

//2.Hold
const btnHold = document.querySelector('.btn--hold');

//3.Roll Dice
const btnRoll = document.querySelector('.btn--roll');

//modal to open
const btnModal = document.querySelector('.btn--modal');
const howModal = document.querySelector('.howToModal');
const overlay = document.querySelector('.overlay');

const openModal = function () {
  howModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
//close the modal
const btnCloseModal = document.querySelector('.close--modal');

const closeModal = function () {
  howModal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Switching the two elements for player score to zero
score0EL.textContent = 0;
score1EL.textContent = 0;

//this is hiding the dice from the screen
diceEL.classList.add('hidden');
let currentScore = '';
let activePlayer = '';

let playing = '';
let scores = '';

const init = function () {
  scores = [0, 0];

  currentScore = 0;

  activePlayer = 0;

  playing = true;

  //CURRENT SCORES BACK TO ZERO
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  // // scores = 0;
  // scores[0] = 0;
  // scores[1] = 0;
  diceEL.classList.add('hidden');
  trophy0.classList.add('hidden');
  trophy1.classList.add('hidden');
  //removing the winner window after a player wins

  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  // player0EL.classList.toggle('player--active');

  //removing the active classes
  player1EL.classList.remove('player--active');
  player0EL.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // if (activePlayer === 0) {
  //   activePlayer = 1;
  // } else if (activePlayer === 1) {
  //   activePlayer = 0;
  // }

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//Rollng dice functionalty
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    console.log(dice);

    //2. display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    //3. check for rolled 1: if true , switch to next player

    if (dice !== 1) {
      //Add dice to current score
      //currentScore = currentScore + dice;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // current0EL.textContent = currentScore;
    } else {
      //switch to next player

      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to the score of the active player

    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check score if player's score is >= 100

    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.trophy${activePlayer}`)
        .classList.remove('hidden');

      document
        .querySelector(`.trophy${activePlayer}`)
        .classList.remove('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
    //Switch to next player
  } // switchPlayer();
});

//When the new game button is clicked
btnNew.addEventListener('click', init);

//when how to play is clicked
btnModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);

//when overlay is pressed
overlay.addEventListener('click', closeModal);

//when 'esc' is clicked

document.addEventListener('keydown', function (event) {
  console.log(event.key);
  if (event.key == 'Escape' && !howModal.classList.contains('hidden')) {
    closeModal();
  }
});
