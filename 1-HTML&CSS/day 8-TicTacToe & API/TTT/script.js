let boxes = document.querySelectorAll(".box"); // Select all of the boxes from the HTML
// [box, box, box, box, box, box...]
let currentPlayer = "X"; // Initialize with a starting player
let board = ["", "", "", "", "", "", "", "", ""]; // This board will hold all the positions to check win
let inPlay = true; // Determines if the game is inplay or not
let message = document.getElementById("message"); // Message container to display menu

const startNewGame = () => {
  // Reset the game back to the inital state before play
  boxes.forEach(box => {
    box.innerHTML = "";
    box.style.backgroundColor = "rgb(67, 75, 80)";
  });
  message.innerHTML = "";
  board = ["", "", "", "", "", "", "", "", ""];
  inPlay = true;
  currentPlayer = "X";
};

const isEmptySpace = ind => {
  // Checks whether the board has an "" or X or O
  if (board[ind] === "") {
    return true;
  } else {
    return false;
  }
};

const placeOnBoard = ind => {
  let boardPiece = document.createElement("p"); // create new <p></p>
  boardPiece.innerHTML = currentPlayer; // Set innerHTML of p tag to X or O
  boxes[ind].append(boardPiece); // <div class="box">put board piece</div>
  board[ind] = currentPlayer; // Replace "" with X or O
};

const changePlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};

const checkWin = () => {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let winner = false;
  let winningCombo = [];

  winCombos.forEach(combo => {
    let boardCheck = [board[combo[0]], board[combo[1]], board[combo[2]]]; // ["", "X", ""]

    // let boardCheck = combo.map((index) => {
    //   return board[index]
    // })
    // "XXX" === "XXX"
    if (boardCheck.join("") === currentPlayer.repeat(3)) {
      winningCombo = combo;
      winner = true;
    }
  });

  // if (winner) {
  //   setWinStyle(winningCombo);
  // }

  return winner;
};

const setDrawStyle = () => {
  boxes.forEach(box => {
    box.style.backgroundColor = "rgba(247, 239, 139, 0.4)";
  });
};

const setWinStyle = combo => {
  boxes.forEach((box, index) => {
    if (combo.includes(index)) {
      box.style.backgroundColor = "rgba(122, 241, 122, 0.4)";
    }
  });
};

const checkPlayAgain = () => {
  setTimeout(() => {
    let res = window.confirm("Would you like to play another game?");
    if (res) {
      startNewGame();
    }
  }, 2000);
};

// Loop through each of the HTML Div with box class
boxes.forEach((box, index) => {
  // Adding an event listener to each box
  box.addEventListener("click", e => {
    if (inPlay) {
      // Check if it is an empty space, if it is continue logic else alert user
      if (isEmptySpace(index)) {
        // Fill HTML box and board
        placeOnBoard(index);

        if (!checkWin() && !board.includes("")) {
          inPlay = false;
          message.innerHTML = `It's a draw! Sorry suckers! Try again!`;
          setDrawStyle();
          checkPlayAgain();
        } else if (checkWin()) {
          inPlay = false;
          message.innerHTML = `Player ${currentPlayer} won! Congratulations!`;
          checkPlayAgain();
        }
        /*
          CALL A FUNCTION TO CHECK THE WIN!
        */

        // Change to next player
        changePlayer();
      } else {
        alert("Sorry, this space is taken, choose another space!");
      }
    }
  });
});
