let result = '';

let score = JSON.parse(localStorage.getItem('score'))||{wins: 0, Losses: 0, Ties: 0};

updateScore();

function generateComputerMove(){
  const pick = Math.random();
  if(pick < 0.33)
    return 'rock';
  else if(pick < 0.66)
    return 'paper';
  else
    return 'scissors';
}

function playGame(playerMove){
  const computerMove = generateComputerMove();
  if(playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'Tie.';
      score.Ties++;
    }
    else if(computerMove === 'paper'){
      result = 'You loss.';
      score.Losses++;
    }
    else{
      result = 'You win.';
      score.wins++;
    }
  }else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
      result = 'You win.';
      score.wins++;
    }
    else if(computerMove === 'paper'){
      result = 'Tie.';
      score.Ties++;
    }
    else{
      result = 'You loss.';
      score.Losses++;
    }
  }else{
    if(computerMove === 'rock'){
      result = 'You loss.';
      score.Losses++;
    }
    else if(computerMove === 'paper'){
      result = 'You win.';
      score.wins++;
    }
    else{
      result = 'Tie.';
      score.Ties++;
    }
  }
  localStorage.setItem('score', JSON.stringify(score));
  const gameInfoDivElem = document.querySelector('.js-game-info');
  gameInfoDivElem.innerHTML = `<p class = "result">${result}</p>
                              <p>You <img class = "move-img" src="imgs/${playerMove}-emoji.png"> <img class = "move-img"src = "imgs/${computerMove}-emoji.png"> Computer</p>`;
  updateScore();
}
function updateScore(){
  const scoreElem = document.querySelector('.js-score');
  scoreElem.innerHTML = `Wins: ${score.wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
}

const autoPlayButtonElem = document.querySelector('.js-autoPlay-button');

let isAutoPlaying = false;
let autoPlayID;
function autoPlay(){
  if(!isAutoPlaying){
    autoPlayID = setInterval(()=>{playerMove = generateComputerMove();playGame(playerMove);}, 1000);
    isAutoPlaying = true;
  }
  else{
    clearInterval(autoPlayID)
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {playGame('rock')});

document.querySelector('body').addEventListener('keydown', event => {
  if(event.key === 'r')
    playGame('rock');
  else if(event.key === 'p')
    playGame('paper');
  else if(event.key === 's')
    playGame('scissors');
  else if (event.key === 'a')
    autoPlay();
})

document.querySelector('.js-paper-button').addEventListener('click', () => {playGame('paper')});

document.querySelector('.js-scissor-button').addEventListener('click', () => {playGame('scissors')});

document.querySelector('.js-reset-button').addEventListener('click', ()=>{score = {wins: 0, Losses: 0, Ties: 0};
updateScore();});
 
autoPlayButtonElem.addEventListener('click', ()=>autoPlay());