const GameBoard = (function () {
  let gameBoard = [];
  const cells = document.querySelectorAll(".cell");
  let gameFinish = false;

  const players = {
    player1: {
      symbol: "X",
      name: "",
    },
    player2: {
      symbol: "O",
      name: "",
    },
  };

  let activePlayer = players.player1;

  function Cell() {
    let symbol = "";
    let player = "";
    return { symbol, player };
  }
  const setPlayers = function (player1, player2) {
    players.player1.name = player1;
    players.player2.name = player2;
  };

  //this function will check if a row has same symbol or a column has all same symbols or if diagonals have same symbol
  const checkIfSomeoneWon = function (player) {
    let someBodyWon = false;

    if (
      //this checks if all the cells have same symbol and that the cells are not empty
      //row check
      (gameBoard[0][1].symbol === gameBoard[0][2].symbol &&
        gameBoard[0][2].symbol === gameBoard[0][0].symbol &&
        gameBoard[0][0].symbol) ||
      (gameBoard[1][1].symbol === gameBoard[1][2].symbol &&
        gameBoard[1][2].symbol === gameBoard[1][0].symbol &&
        gameBoard[1][0].symbol) ||
      (gameBoard[2][1].symbol === gameBoard[2][2].symbol &&
        gameBoard[2][2].symbol === gameBoard[2][0].symbol &&
        gameBoard[2][0].symbol) ||
      //column check
      (gameBoard[0][0].symbol === gameBoard[1][0].symbol &&
        gameBoard[1][0].symbol === gameBoard[2][0].symbol &&
        gameBoard[2][0].symbol) ||
      (gameBoard[0][1].symbol === gameBoard[1][1].symbol &&
        gameBoard[1][1].symbol === gameBoard[2][1].symbol &&
        gameBoard[2][1].symbol) ||
      (gameBoard[0][2].symbol === gameBoard[1][2].symbol &&
        gameBoard[1][2].symbol === gameBoard[2][2].symbol &&
        gameBoard[2][2].symbol) ||
      //diagonal check
      (gameBoard[0][0].symbol === gameBoard[1][1].symbol &&
        gameBoard[1][1].symbol === gameBoard[2][2].symbol &&
        gameBoard[2][2].symbol) ||
      (gameBoard[0][2].symbol === gameBoard[1][1].symbol &&
        gameBoard[1][1].symbol === gameBoard[2][0].symbol &&
        gameBoard[2][0].symbol)
    ) {
      someBodyWon = true;
      renderGame.displayWinner(player);
      return someBodyWon;
    }
    {
      checkIfTie();
    }
  };

  const playRound = function (cell) {
    if (!cell.textContent && !gameFinish) {
      renderGame.displayPlayerSymbol(cell, activePlayer.symbol);
      gameBoard[cell.dataset.i][cell.dataset.j].symbol = activePlayer.symbol;
      gameFinish = checkIfSomeoneWon(activePlayer.name);

      activePlayer =
        activePlayer === players.player1 ? players.player2 : players.player1;
      console.log(activePlayer);
    }
  };

  const checkIfTie = function () {
    let isTie = true;
    cells.forEach((cell) => {
      if (!cell.textContent) {
        isTie = false;
      }
    });
    if (isTie) {
      renderGame.displayTie();
    }
    return isTie;
  };

  const resetGame = function () {
    gameBoard = [];
    createGameBoard();

    activePlayer = players.player1;
    console.log(activePlayer);
    gameFinish = false;

    cells.forEach((cell) => {
      renderGame.displayPlayerSymbol(cell, "");
    });

    players.player1.name = "";
    players.player2.name = "";

    renderGame.resetWinnerContainer();
  };

  const createGameBoard = function () {
    for (let i = 0; i < 3; i++) {
      gameBoard[i] = [];
      for (let j = 0; j < 3; j++) {
        gameBoard[i].push(Cell());
      }
    }
  };
  createGameBoard();

  return { gameBoard, playRound, setPlayers, resetGame };
})();
const eventBinder = (function () {
  const cells = document.querySelectorAll(".cell");
  const startGameBtn = document.querySelector(".startGameBtn");
  const restartGameBtn = document.querySelector(".restartGameBtn");
  const winnerContainer = document.querySelector(".winnerContainer");
  const gameContainer = document.querySelector(".gameContainer");
  const playerNamesForm = document.querySelector(".playerNamesForm");
  const player1Input = document.querySelector("#player1");
  const player2Input = document.querySelector("#player2");

  const playRoundEvent = (function () {
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        GameBoard.playRound(cell);
      });
    });
  })();

  const startGameBtnEvent = (function () {
    startGameBtn.addEventListener("click", (e) => {
      let player1Name = document.querySelector("#player1").value;
      let player2Name = document.querySelector("#player2").value;

      GameBoard.setPlayers(player1Name, player2Name);

      gameContainer.style.display = "grid";
      winnerContainer.style.display = "block";
      restartGameBtn.style.display = "block";
      playerNamesForm.style.display = "none";
    });
  })();

  const restartGameBtnEvent = (function () {
    restartGameBtn.addEventListener("click", () => {
      GameBoard.resetGame();

      player1Input.value = "";
      player2Input.value = "";

      gameContainer.style.display = "none";
      winnerContainer.style.display = "none";
      restartGameBtn.style.display = "none";
      playerNamesForm.style.display = "flex";
    });
  })();
})();

const renderGame = (function () {
  const winnerContainer = document.querySelector(".winnerContainer");

  const displayPlayerSymbol = function (cell, symbol) {
    cell.textContent = symbol;
  };
  const displayWinner = function (player) {
    winnerContainer.textContent = `${player} Wins!`;
  };

  const displayTie = function () {
    winnerContainer.textContent = `It's a Tie`;
  };
  const resetWinnerContainer = function () {
    winnerContainer.textContent = "";
  };

  return {
    displayWinner,
    displayPlayerSymbol,
    displayTie,
    resetWinnerContainer,
  };
})();
