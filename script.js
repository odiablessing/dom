'use strict';

// Selecting Elements
const playerEls = document.querySelectorAll('.player');
const scoreEls = document.querySelectorAll('.score');
const currentEls = document.querySelectorAll('.current-score');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let gameData;

// Initialize Game
const initializeGame = () => {
  gameData = {
    scores: [0, 0],
    currentScore: 0,
    activePlayer: 0,
    playing: true
  };

  scoreEls.forEach(el => (el.textContent = 0));
  currentEls.forEach(el => (el.textContent = 0));
  diceEl.classList.add('hidden');
  playerEls.forEach(el => el.classList.remove('player--winner', 'player--active'));
  playerEls[0].classList.add('player--active');
};

initializeGame();

// Switch Player
const switchActivePlayer = () => {
  currentEls[gameData.activePlayer].textContent = 0;
  gameData.currentScore = 0;
  gameData.activePlayer = gameData.activePlayer === 0 ? 1 : 0;
  playerEls.forEach(el => el.classList.toggle('player--active'));
};
// Dice Roll
btnRoll.addEventListener('click', () => {
  if (gameData.playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      gameData.currentScore += dice;
      currentEls[gameData.activePlayer].textContent = gameData.currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

// Hold Score
btnHold.addEventListener('click', () => {
  if (gameData.playing) {
    gameData.scores[gameData.activePlayer] += gameData.currentScore;
    scoreEls[gameData.activePlayer].textContent = gameData.scores[gameData.activePlayer];

    if (gameData.scores[gameData.activePlayer] >= 100) {
      gameData.playing = false;
      diceEl.classList.add('hidden');
      playerEls[gameData.activePlayer].classList.add('player--winner');
      playerEls[gameData.activePlayer].classList.remove('player--active');
    } else {
      switchActivePlayer();
    }
  }
});

// New Game
btnNew.addEventListener('click', initializeGame);