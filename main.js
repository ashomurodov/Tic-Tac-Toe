const xyBox = document.querySelectorAll(".box");
const Xbox = document.getElementById("X");
const Obox = document.getElementById("O");
const message = document.querySelector(".message");
const container = document.querySelector(".container");
const messageBox = document.querySelector(".message-box");
const gamerTurn = document.querySelector(".gamerTurn");
const newGame = document.getElementById("NewGame");
const refresh = document.getElementById("refresh");
const xScores = document.querySelector(".xScores");
const oScores = document.querySelector(".oScores");
const nextRound = document.getElementById("nextRound");
const roundCounter = document.querySelector(".roundCounter");
const winnerWindow = document.querySelector(".winnerWindow");
const winnerPlayerText = document.querySelector(".winnerPlayer");
let number,
  gaming,
  selected,
  xScore,
  oScore,
  roundCount,
  roundEnd,
  winnerPlayer;

let xWin = "🥳 X player win this game 🥳";
let oWin = "🥳 O player win this game 🥳";
let draw = "Hech kim yuta olmadi ☹️";
function init() {
  xScore = 0;
  oScore = 0;
  roundCount = 1;
  xScores.textContent = `X - ${xScore}`;
  oScores.textContent = `O - ${oScore}`;
  roundCounter.textContent = `Round-${roundCount}`;
  container.classList.remove("hidden");
  messageBox.classList.remove("hidden");
  winnerWindow.classList.add("hidden");
  clear();
}

init();

newGame.addEventListener("click", init);
refresh.addEventListener("click", init);
nextRound.addEventListener("click", nextRoundGame);

function selectedOX(num, choise) {
  if (!roundEnd && !selected) {
    selected = true;
    number = num;
    message.textContent = `Your Choice is ${choise}`;
    gamerTurn.textContent = `${choise} - o'yinchining navbati!`;
  }
}

Xbox.addEventListener("click", () => {
  selectedOX(0, "X");
  console.log(number);
});

Obox.addEventListener("click", () => {
  selectedOX(1, "O");
  console.log(number);
});

document.addEventListener("keyup", (e) => {
  console.log(e.key);
  if (e.keyCode == 79) {
    // 79 is O keycode
    selectedOX(1, "O");
  } else if (e.keyCode == 88) {
    // 88 is X keycode
    selectedOX(0, "X");
  } else if (e.key == "Escape") {
    init();
  }
});

const X = "X";
const O = "O";

xyBox.forEach((item, idx) => {
  item.addEventListener("click", () => {
    console.log(gaming);
    if (number % 2 == 0 && item.textContent == "" && gaming && selected) {
      item.textContent = "X";
      gamerTurn.textContent = "O - o'yinchining navbati!";
      number++;
      message.textContent = `Good luck! 😊`;
      checkWinner(X);
      //   avtoFill();
    } else if (
      item.textContent == "" &&
      number % 2 !== 0 &&
      gaming &&
      selected
    ) {
      item.textContent = "O";
      gamerTurn.textContent = "X - o'yinchining navbati!";
      number++;
      message.textContent = `Good luck! 😊`;
      checkWinner(O);
      //   avtoFill();
    } else if (selected == false) {
      message.textContent = "Iltimos o'yinchi pozitsiyangizni tanlang!!!";
    } else if (item.textContent !== "" && gaming) {
      //   message.textContent = `Keyingi Raundga o'ting!!!`;
      message.textContent = `Bitta katakka bir marta bosing!`;
    } else {
      message.textContent = `Keyingi Raundga o'ting!!!`;
    }
  });
});

const winnerPositons = [
  [0, 1, 2], // true
  [0, 3, 6], // true
  [3, 4, 5], // true
  [6, 7, 8], // true
  [2, 5, 8], // true
  [1, 4, 7], // true
  [0, 4, 8], // true
  [2, 4, 6], // true
];

function checkWinner(XO) {
  for (let [p1, p2, p3] of winnerPositons) {
    if (
      xyBox[p1].textContent == XO &&
      xyBox[p2].textContent == XO &&
      xyBox[p3].textContent == XO
    ) {
      gamerTurn.textContent = `${XO} o'yinchi yutdi 🥳`;
      if (XO == "X") {
        xScore += 1;
        xScores.textContent = `X - ${xScore}`;
      } else {
        oScore += 1;
        oScores.textContent = `O - ${oScore}`;
      }
      checkAllRoundsWinner();
      gaming = false;
      roundEnd = true;
      break;
    } else {
      checkDraw();
    }
  }
}

function checkDraw() {
  let counter = 0;
  xyBox.forEach((item) => {
    if (item.textContent !== "") {
      counter++;
    }
  });

  if (counter == 9 && roundEnd == false) {
    gamerTurn.textContent = "Afsuski hech kim yuta olmadi ☹️";
  }
}

function clear() {
  selected = false;
  roundEnd = false;
  gaming = true;
  message.textContent = "O'yinchi pozitsiyangizni tanlang";
  gamerTurn.textContent = "😴";
  xyBox.forEach((item) => (item.textContent = ""));
}

function nextRoundGame() {
  if (roundEnd == true) {
    clear();
    roundCount++;
    roundCounter.textContent = `Round-${roundCount}`;
  }
}

function checkAllRoundsWinner() {
  console.log(roundCount);
  if (roundCount == 3 || xScore == 2 || oScore == 2) {
    winnerPlayer = xScore > oScore ? xWin : xScore == oScore ? draw : oWin;
    console.log(winnerPlayer);
    winnerPlayerText.textContent = winnerPlayer;
    container.classList.add("hidden");
    messageBox.classList.add("hidden");
    winnerWindow.classList.remove("hidden");
  }
}

// let randomNumber;

// function avtoFill() {
//   let notFilledBoxIdx = [];
//   randomNumber = Math.trunc(Math.random() * notFilledBoxIdx.length);
//   xyBox.forEach((item, idx) => {
//     if (item.textContent == "") {
//       notFilledBoxIdx.push(idx);
//     }
//   });
//   xyBox[notFilledBoxIdx[randomNumber]].textContent =
//     number % 2 == 0 ? "X" : "O";
//   checkWinner();
//   console.log(notFilledBoxIdx[randomNumber]);
//   number++;
// }
