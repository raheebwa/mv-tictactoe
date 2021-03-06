const Player = name =>{
    return {name}
}

let Player1 = Player('Jeff');
let Player2 = Player('Rama')
const squares = document.querySelectorAll('.squares')
const form = document.querySelector('.form')
const replay = document.querySelector('.replay')
let name1 = document.querySelector('.player1')
let name2 = document.querySelector('.player2')
let counter = 0
let result = document.querySelector('.result')

const game = (() => {
  let gameboard = [];

  const check = () => {
    if(gameboard[0] == gameboard[1] && gameboard[0]== gameboard[2]) {
      return gameboard[0]
      } 
      if(gameboard[1] == gameboard[7] && gameboard[4]== gameboard[1]) {
        return gameboard[1]
        } 
        if(gameboard[2] == gameboard[5] && gameboard[2]== gameboard[8]) {
          return gameboard[8]
          } 
          if(gameboard[0] == gameboard[3] && gameboard[3]== gameboard[6]) {
            return gameboard[3]
            } 
      return false
  }

  const check2 = () => {
    if(gameboard[3] == gameboard[4] && gameboard[3]== gameboard[5]) {
      return gameboard[3]
      } 
      if(gameboard[6] == gameboard[7] && gameboard[6]== gameboard[8]) {
        return gameboard[6]
        } 
        if(gameboard[0] == gameboard[4] && gameboard[0]== gameboard[8]) {
          return gameboard[0]
          } 
          if(gameboard[2] == gameboard[4] && gameboard[2]== gameboard[6]) {
            return gameboard[2]
            } 
      return false
  }

  
  const clearboard = () => {
    gameboard = []
  }
  
  const play = (tool, position) => {
     gameboard[position] = tool
  };
  return {
   check,check2, clearboard, play
  };
})();

const display = (() => {
  const endGame = () => {
    squares.forEach(button => {
      button.disabled = true
    })
  }
  const startNew = () => {
    endGame();
    form.style.display = 'block'
    replay.style.display = 'none'
      }
      const start = () => {

        if(name1.value != '' && name2.value != '') {
          Player1 = Player(name1.value)
          Player2 = Player(name2.value)
          return true
        }
        return false
      }
  return {
    endGame, start, startNew
  }
})();

const Umpire = (() => {
  const startGame = () => {
    form.style.display = 'none'
    squares.forEach(square => {
      square.addEventListener('click', () => {
        if (square.textContent == '') {
          document.querySelector('.warn').style.display = 'none'
          counter % 2 == 0? square.textContent = 'X' : square.textContent = 'O'
          counter += 1
          game.play(square.textContent , parseInt(square.id - '1',10))
        Umpire.sayResult() || counter == 9 ? display.endGame() : null
        }
    })
    })    
  }
  const sayResult = () => {
    result.innerHTML =''
    replay.style.display = 'block'
    if (game.check() == 'X' || game.check2() == 'X') {
      result.innerHTML = `Congratulations ${Player1.name}, You are the winner`
      return true
    } else if(game.check() == 'O' || game.check2() == 'O') {
      result.innerHTML = `Congratulations ${Player2.name}, You are the winner`
      return true
    }
    counter == 9? result.innerHTML = `This is a tie between ${Player1.name} and ${Player2.name},feel free to replay` : null
    return false
  }
const restartGame = () => {
  counter = 0;
  replay.style.display = 'none';
  game.clearboard();
  squares.forEach(square => {
    square.textContent = ''
    square.disabled = false
    display.start()? Umpire.startGame() : null
  })
}
  return {
     restartGame, sayResult ,startGame
  }
  })();

  
