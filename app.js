// GAME FUNCTION:
// -Player must guess a number between a min and max
// - Player gets a certain amount of guesses
// - Notify player of guesses remaining
// - Let player choose to play again

// Guess values
let min = 1,
  max = 10,
  winningNum = getRandNum(min, max);
guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event Listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);
  console.log(guess);

  //   Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    //   Check if won
    if (guess === winningNum) {
      gameOver(true, `${winningNum} is correct, YOU WIN!`, "green");
    } else {
      //   Wrong Number
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        gameOver(
          false,
          `${guess} is wrong, you lost. The correct answer was ${winningNum}`,
          "red"
        );
      } else {
        guessInput.value = "";
        guessInput.style.borderColor = "red";
        setMessage(
          `${guess} is wrong, you have ${guessesLeft} guesses left`,
          "red"
        );
      }
    }
  }
});

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set Message
  setMessage(msg, color);

  guessBtn.value = "Play again";
  guessBtn.className += "play-again";
}

// Get WinnigNumber
function getRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
