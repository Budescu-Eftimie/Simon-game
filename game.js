const buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var playerPattern = [];

let gameOn = false;
let level = 0;

$(document).keydown(function () {
  if (!gameOn) {
    $("h1").text("Level " + level);
    nextSequence();
    gameOn = true;
  }
});

$("button").click(function () {
  let playerChoice = this.id;
  playerPattern.push(playerChoice);

  animatePress("#" + playerChoice);
  playSound(playerChoice);
  checkAnswer(playerPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === playerPattern[currentLevel]) {
    console.log("succes");
    if (gamePattern.length === playerPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    //2. Call restart() if the user gets the sequence wrong.
    restart();
  }
}

function nextSequence() {
  playerPattern = [];
  level++;
  $("h1").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(() => {
    $(currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function restart() {
  level = 0;
  gameOn = false;
  gamePattern = [];
}
