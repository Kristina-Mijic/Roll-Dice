//Starting modals
let cardsModalsWrapper = document.getElementById('cards-modals-wrapper-id');
let startingModal = document.getElementById('starting-modal');
let inputModal1 = document.getElementById('input-modal-1');
let inputModal2 = document.getElementById('input-modal-2');
let lastCardModal = document.getElementById('last-card-counter');
let counterModal = document.getElementById('counter-modal');

//Buttons on modals
let btnNext1 = document.getElementById('btn-1');
let btnNext2 = document.getElementById('btn-2');
let btnNext3 = document.getElementById('btn-3');

//Player card (active/no-active player)
let player1Card = document.getElementById('player-1-card');
let player2Card = document.getElementById('player-2-card');

//Two cards with players information
let cardsPlayers = document.getElementById('cards-players');
let playerName1 = document.getElementById('player-name-1');
let playerName2 = document.getElementById('player-name-2');

//Buttons on modal where game play
let newGameBtn = document.getElementById('btn-new-game');
let storeBtn = document.getElementById('btn-store-id');
let rollBtn = document.getElementById('btn-roll-id');

//Current and total for player left and player right
let player1Total = document.getElementById('player1-total-id');
let player1Current = document.getElementById('player1-current-id');
let player2Total = document.getElementById('player2-total-id');
let player2Current = document.getElementById('player2-current-id');

//WinnerPlayer:
let bigWinnerText1 = document.getElementById('winner-player1-text');
let bigWinnerText2 = document.getElementById('winner-player2-text');

//Show dice images
let showDiceLeft = document.getElementById('dice-image');
let showDiceRight = document.getElementById('dice-image-p2');

//Are you sure u want exit game - modal
let confirmeNewGameBtn = document.getElementById('confirme-new-game-btn');
let confirmeNewGameModal = document.getElementById('new-game-modal-id');

let player1Score = 0;
let player2Score = 0;
let activePlayer = 1;
let currentDiceSumLeft = 0;
let currentDiceSumRight = 0;
let diceValueLeft = 1;
let diceValueRight = 1;
let winningScore = 12;


btnNext2.addEventListener('click', () => {
  let player1Input = document.getElementById('player1-input').value;
  playerName1.innerHTML = player1Input;
})

btnNext3.addEventListener('click', () => {
  let player2Input = document.getElementById('player2-input').value;
  playerName2.innerHTML = player2Input;
})


nextModal = (currentModal, nextModal,) => {
  currentModal.style.display = 'none';
  nextModal.style.display = 'flex';
};

btnNext1.addEventListener('click', () => {
  nextModal(startingModal, inputModal1);
})

btnNext2.addEventListener('click', () => {
  nextModal(inputModal1, inputModal2);
})

btnNext3.addEventListener('click', () => {
  nextModal(inputModal2, lastCardModal);
  startingCounter()
})

newGameBtn.addEventListener('click', () => {
  nextModal(cardsPlayers, confirmeNewGameModal);
  storeBtn.disable = true;
  rollBtn.disable = true;
})

confirmeNewGameBtn.addEventListener('click', () => {
  nextModal(confirmeNewGameModal, startingModal);
  resetGame()
})


startingCounter = () => {
  let counter = 0;
  let counterArray = [3, 2, 1, 'START'];

  let counterInProgress = () => {
  
    console.log(counterArray[counter])
    counterModal.innerHTML = counterArray[counter]
    counter++

    if(counter > counterArray.length) {
      clearInterval(countIntervalId);
      nextModal(lastCardModal, cardsPlayers)
    }
  }
  let countIntervalId = setInterval(counterInProgress, 1000);
}

// function startCounter() {
//   setTimeout(function () {
//     counterModal.innerHTML = 3
//   }, 1000); 
//   setTimeout(function () {
//     counterModal.innerHTML = 2
//   }, 2000); 
//   setTimeout(function () {
//     counterModal.innerHTML = 1
//   }, 3000);
//   setTimeout(function () {
//     counterModal.innerHTML = 'START';
//   }, 4000);
//   setTimeout(function () {
//     nextModal(lastCardModal, cardsPlayers)
//   }, 5500);
// }

storeBtn.addEventListener('click', () => {
  player1Score += currentDiceSumLeft;
  player2Score += currentDiceSumRight;
  currentDiceSumLeft = 0;
  currentDiceSumRight = 0;

  winnerPlayerId = getWinnerPlayer();

  if(winnerPlayerId != 0) {
    winnerPlayer(winnerPlayerId);
  } else {
    nextPlayer()
  }
  draw()
})

rollBtn.addEventListener('click', () => {
  rollDice()
})

rollDice = () => {
  let diceValue = Math.floor(Math.random() * 5) + 1;

  if(activePlayer === 1) {
    diceValueLeft = diceValue;
    currentDiceSumLeft += diceValueLeft;

    if(diceValue === 1) {
      currentDiceSumLeft = 0;
      nextPlayer()
    }
  } else {
    if(activePlayer === 2) {
      diceValueRight = diceValue;
      currentDiceSumRight += diceValueRight;

      if(diceValue === 1) {
        currentDiceSumRight = 0;
        nextPlayer()
      }
    }
  }
  draw()
}

nextPlayer = () => {
  if(activePlayer === 1) {
    activePlayer = 2
  } else {
    if(activePlayer === 2) {
      activePlayer = 1
    }
  }
}

activePlayer1 = () => {
  setActivePlayer(player1Card);
  setNoActivePlayer(player2Card)
}

activePlayer2 = () => {
  setActivePlayer(player2Card);
  setNoActivePlayer(player1Card)
}

setActivePlayer = (playerCard) => {
  playerCard.classList.add('active-player');
  playerCard.classList.remove('no-active-player');
}

setNoActivePlayer = (playerCard) => {
  playerCard.classList.remove('active-player');
  playerCard.classList.add('no-active-player')
}

draw = () => {
  showDiceLeft.src = `/images/${diceValueLeft}.png`
  showDiceRight.src = `/images/${diceValueRight}.png`

  player1Current.innerHTML = 'CURRENT: ' + currentDiceSumLeft;
  player2Current.innerHTML = 'CURRENT: ' + currentDiceSumRight;

  player1Total.innerHTML = 'TOTAL: ' + player1Score;
  player2Total.innerHTML = 'TOTAL: ' + player2Score

  if(activePlayer === 1) {
    activePlayer1()
  } else {
    activePlayer2()
  }
}

setWinnerPlayer = (playerCard) => {
  playerCard.classList.remove('active-player');
  playerCard.classList.add('winner-player');
  storeBtn.disabled = true;
  rollBtn.disabled = true
}

getWinnerPlayer = () => {
  if(activePlayer === 1 && player1Score >= winningScore) {
    bigWinnerText1.innerHTML = 'WINNER'
    return 1
  } else if(activePlayer === 2 && player2Score >= winningScore) {
    bigWinnerText2.innerHTML = 'WINNER'
    return 2
  }
  return 0
}

winnerPlayer = (winnerPlayerId) => {
  if(winnerPlayerId === 1) {
    setWinnerPlayer(player1Card)
  } else if(winnerPlayerId === 2) {
    setWinnerPlayer(player2Card)
  }
}


resetGame = () => {
  inputModal1.value = "";
  inputModal2.value = "";
  playerName1.innerHTML = "";
  playerName2.innerHTML = "";
  player1Score = 0;
  player2Score = 0;
  activePlayer = 1;
  currentDiceSumLeft = 0;
  currentDiceSumRight = 0;
  diceValueLeft = 1;
  diceValueRight = 1;

  player1Card1.classList.remove('winner-player');
  player2Card2.classList.remove('winner-player');
  playerCard1.classList.remove('active-player');
  playerCard2.classList.remove('active-player');
  storeBtn.disabled = false;
  rollBtn.disabled = false
}
