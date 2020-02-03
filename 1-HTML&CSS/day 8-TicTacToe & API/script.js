let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let boxes = document.querySelectorAll(".box");


let isEmptySpace = ind => {
  if (board[ind] === "") {
    return true;
  } else return false
};

let locationOnBoard = ind => {
  let newString = document.createElement("p");
  newString.innerHTML = currentPlayer;
  boxes[ind].append(newString);
  board[ind] = currentPlayer;
};

let changePerson = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

boxes.forEach((box,index) => {
  box.addEventListener("click", () => {
    if (isEmptySpace(index)) {
      locationOnBoard(index);
      changePerson();
    } else {
      alert("CHOOSE ANOTHER PLACE !")
    }
    winnerWho();
  });
});

let winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function winnerWho () {
  winCombos.forEach((combo) => {
    let checkState = [board[combo[0]],board[combo[1]],board[combo[2]]];
    if (checkState.join("") === "XXX" || checkState.join("") === "OOO"){
      alert("Winner!")
    };
  });
}

winCombos[0][]
let winnerWho = () => {
  // let count = 0;
  for (let i = 0; i < winCombos.length; i++) {
    for (let j=0; j < 3; j++) {
      let count = 0;
      if (board[winCombos[i][j]] == "X") {
        count ++;
        if (count === 3) console.log("winner")
      }
      // console.log(winCombos[0][j])
      // if (board[j] === "X") {
      //   count ++;
      //   if (count ===3) alert("X win!")
      // }
//     }
//   }
// }