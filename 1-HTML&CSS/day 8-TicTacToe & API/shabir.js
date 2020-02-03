let board = ["", "", "", "", "", "", "", "", ""];
let count = 0;
let currentPlayer = "X";
const boxes = document.querySelectorAll(".box");
boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    if (board[index] == "") {
      box.innerHTML = currentPlayer
      board[index] = currentPlayer
      checkWin()
      if (count % 2 == 0) {
        currentPlayer = "O"
      } else {
        currentPlayer = "X"
      }
      count++
    } else {
      alert("Already filled!")
    }
  })
})
let winCombos = [
  [0, 1, 2], // combo 0
  [3, 4, 5], // combo 1
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function checkWin() {
  let result= "";
  winCombos.forEach((combo) => {
    let checkState = [board[combo[0]], board[combo[1]], board[combo[2]]]
    if (checkState.join('') === 'XXX' || checkState.join('') === 'OOO') {
      alert(`${board[combo[0]]} has won!`)
    } else if (!board.includes("") && checkState.join('') !== "XXX" & checkState.join('') !== "OOO") {
        result = "Draw!"
      }
  })
  if (result) {
    alert(result)
  }
}