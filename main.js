//Starting modals
var startingCard = document.getElementById('starting-card');
var inputCard1 = document.getElementById('input-card-1');
var inputCard2 = document.getElementById('input-card-2');
var lastcard = document.getElementById('last-card-counter');
var counterModal = document.getElementById('counter-modal')
var btnNext1 = document.getElementById('btn-1');
var btnNext2 = document.getElementById('btn-2');
var btnNext3 = document.getElementById('btn-3');

//Two cards with players information
var cardsPlayers = document.getElementById('cards-players');
var playerName1 = document.getElementById('player-name-1');
var playerName2 = document.getElementById('player-name-2');

var storeBtn = document.getElementById('btn-store-id');
var rollBtn = document.getElementById('btn-roll-id');


btnNext2.addEventListener('click', () => {
  var player1Input = document.getElementById('player1-input').value;
  playerName1.innerHTML = player1Input;
})

btnNext3.addEventListener('click', () => {
  var player2Input = document.getElementById('player2-input').value;
  playerName2.innerHTML = player2Input;
})


function nextCard(card1, card2,) {
  card1.style.display = "none";
  card2.style.display = "flex";
};

btnNext1.addEventListener('click', () => {
  nextCard(startingCard, inputCard1);
})

btnNext2.addEventListener('click', () => {
  nextCard(inputCard1, inputCard2);
})

btnNext3.addEventListener('click', () => {
  nextCard(inputCard2, lastcard);
  startCounter()
})

function startCounter() {
  setTimeout(function () {
    counterModal.innerHTML = 3
  }, 1000); 
  setTimeout(function () {
    counterModal.innerHTML = 2
  }, 2000); 
  setTimeout(function () {
    counterModal.innerHTML = 1
  }, 3000);
  setTimeout(function () {
    counterModal.innerHTML = 'START';
  }, 4000);
  setTimeout(function () {
    nextCard(lastcard, cardsPlayers)
  }, 5500);
}
