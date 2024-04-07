let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace'){
    confirmation();
  }
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a'){
    autoPlay();
  }
})

document.querySelector('.js-auto-speedup').addEventListener('click', () => {
  speedUp();
})

document.querySelector('.reset-button').addEventListener('click', () => {
  confirmation();
})

document.querySelector('.auto-play').addEventListener('click', () => {
  autoPlay();
});

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});


document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
  playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's'){
    playGame('Scissors');
  }
})

updateScoreElement();

let isAutoPlaying = false;
let intervalID;
let speed = 3000;

function autoPlay(){
  const buttonElement = document.querySelector('.auto-play')
  if(!isAutoPlaying){
      buttonElement.classList.add('auto-play-off')
      intervalID = setInterval( function (){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, speed);
    isAutoPlaying = true;
    document.querySelector('.auto-play').innerHTML = 'Pause Auto Play'
  } else {
    buttonElement.classList.remove('auto-play-off')
    clearInterval(intervalID);
    isAutoPlaying = false;
    document.querySelector('.auto-play').innerHTML = 'Auto Play'
  }

  
}

function playGame(playerMove){
const computerMove = pickComputerMove();

let result  = '';

if (playerMove === 'Scissors'){
    if (computerMove === 'Rock'){
    result = 'You lose.'
  } else if ( computerMove === 'Paper'){
    result = 'You win.'
  } else if (computerMove === 'Scissors')
  {
    result = 'Tie.'
  }
  
} else if (playerMove === 'Rock'){
    if (computerMove === 'Rock'){
    result = 'Tie.'
  } else if ( computerMove === 'Paper'){
    result = 'You lose.'
  } else if (computerMove === 'Scissors')
  {
    result = 'You win.'
  }

} else if (playerMove === 'Paper'){
  if (computerMove === 'Rock'){
    result = 'You win.'
  } else if ( computerMove === 'Paper'){
    result = 'Tie.'
  } else if (computerMove === 'Scissors')
  {
    result = 'You lose.'
  }
}

if (result === 'You win.'){
  score.wins += 1;
} else if (result === 'You lose.'){
  score.losses += 1;
} else if (result === 'Tie.'){
  score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result')
  .innerHTML = result;

document.querySelector('.js-moves')
  .innerHTML = `You <img src="images /${playerMove}-emoji.png" class= "move-icon"> <img src="images /${computerMove}-emoji.png" class= "move-icon" > Computer`;

}



function updateScoreElement (){
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


function pickComputerMove (){
const randomNumber = Math.random();

let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1/3 ) {
computerMove = ('Rock');
} else if (randomNumber >= 1/3 && randomNumber <= 2/3) 
{computerMove = ('Paper');
} else if (randomNumber >= 2/3 && randomNumber <1){
computerMove = ('Scissors');
}

return computerMove;
}

function speedUp (){
  const buttonElement = document.querySelector('.js-auto-speedup')
  if (speed === 3000){
    buttonElement.classList.add('js-auto-speedup-off')
    autoPlay();
    speed /= 2; 
    console.log(speed)
    return autoPlay();
  } else {
    buttonElement.classList.remove('js-auto-speedup-off')
    autoPlay();
    speed = 3000;
    console.log(speed)
    return autoPlay();
  }
};

function confirmation() {

    document.querySelector('.js-check').classList.add('check-decision')

    document.querySelector('.check-decision')
    .innerHTML = `Are you sure you want to reset score? <button class="js-confirm-button js-yes" >Yes</button><button class="js-confirm-button js-no">No</button>`;

    document.querySelector('.js-yes').addEventListener('click', () => {
      resetScore();
      document.querySelector('.js-check').innerHTML = 'Score Reset Successfully';
      document.querySelector('.js-result').innerHTML = 'Let`s Go!';
      document.querySelector('.js-moves').innerHTML = '';
      setTimeout(() => {
        document.querySelector('.js-check').innerHTML = '';
        document.querySelector('.js-check').classList.remove('check-decision');
      }, 3000)
    })

    document.querySelector('.js-no').addEventListener('click', () => {
      document.querySelector('.js-check').innerHTML = '';
      document.querySelector('.js-check').classList.remove('check-decision');
    })
};





function resetScore (){
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
}

