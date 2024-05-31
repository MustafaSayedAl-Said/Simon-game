var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  started = true;
  level++;
  $("#level-title").text("Level " + level);
  var randNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randNum];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  userClickedPattern = [];
}
$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(function (event) {
  if (!started && (event.key == "a" || event.key == "A")) {
    nextSequence();
  }
});

function checkAnswer(currentLevel){
    if (currentLevel < gamePattern.length && userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if (currentLevel == gamePattern.length - 1){
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          $("#level-title").text("Game Over, Press A to Restart");
          startOver();
    }
   
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
