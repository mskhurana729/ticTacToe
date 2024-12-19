//so we want to create a tic tac toe game
//A tic tac toe has nine boxes in which 2 players use X and O symbols to play the game.
//to win a player has to get his symbol 3 times together diagonally horizontally or vertically

//for starting we will create our game in console and for that we need 2d structure which has 3 columns and 3 rows

// we will create a Game board factory function which will have  a gameboard array in which we will store the rows and columns of the board
// we will create a players object which will have players info and their symbol

const GameBoard = (function () {
  const gameBoard = [];

  function Cell() {
    let symbol = "";
    let player = "";
    return { symbol, player };
  }

  const players = {
    player1: {
      symbol: "X",
    },
    player2: {
      symbol: "O",
    },
  };
  //this function will check if a row has same symbol or a column has all same symbols or if diagonals have same symbol
  const checkIfSomeoneWon = function (gameBoard) {
    let someBodyWon = false;
    // console.log(gameBoard.length);
    // for (let i = 0; i < gameBoard.length; i++) {
    //     for (let j = 0; j < gameBoard[i].length; j++) {

    //     }
    // }

    if (
      //row check
      (gameBoard[0][1] === gameBoard[0][2] &&
        gameBoard[0][2] === gameBoard[0][0]) ||
      (gameBoard[1][1] === gameBoard[1][2] &&
        gameBoard[1][2] === gameBoard[1][0]) ||
      (gameBoard[2][1] === gameBoard[2][2] &&
        gameBoard[2][2] === gameBoard[2][0]) ||
      //column check
      (gameBoard[0][0] === gameBoard[1][0] &&
        gameBoard[1][0] === gameBoard[2][0]) ||
      (gameBoard[0][1] === gameBoard[1][1] &&
        gameBoard[1][1] === gameBoard[2][1]) ||
      (gameBoard[0][2] === gameBoard[1][2] &&
        gameBoard[1][2] === gameBoard[2][2]) ||
      //diagonal check
      (gameBoard[0][0] === gameBoard[1][1] &&
        gameBoard[1][1] === gameBoard[2][2]) ||
      (gameBoard[0][2] === gameBoard[1][1] &&
        gameBoard[1][1] === gameBoard[2][0])
    ) {
      someBodyWon = true;
    }

    console.log(someBodyWon);
  };

  //for starting we will fill all the columns with random symbol and then will check if anybody won and to do that we will have to check if a row has same symbol or a column has all same symbols or if diagonals have same symbol and we will do that by running a for loop for all the cells

  //   const playRound = function () {
  //     for (let i = 0; i < 9; i++) {}

  //     console.log(randomSymbol);
  //   };

  const createGameBoard = (function () {
    for (let i = 0; i < 3; i++) {
      gameBoard[i] = [];
      for (let j = 0; j < 3; j++) {
        let randomSymbol = Math.floor(Math.random() * 10) % 2 ? "X" : "O";
        gameBoard[i].push(randomSymbol);
        // gameBoard[i].push(Cell());
      }
    }
    checkIfSomeoneWon(gameBoard);
  })();

  return { gameBoard };
})();
console.log(GameBoard);
