var buttonColor = ["green","red","yellow","blue"];
var pattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      start = true;
    }
  });
  
function nextSequence (){
    userClickedPattern = []
    level ++;
    $("#level-title").text(`Level: ${level}`);
    var randomNum = Math.floor(Math.random() * 4); //numero del 0 al 3
    var randomColor = buttonColor[randomNum]; //Color asignado
    //console.log(randomNum, randomColor);
    pattern.push (randomColor);
    $(`# ${randomColor}`).fadeIn(100).fadeOut(100).faseIn(100);
    sound (randomColor);
}

function sound (id){
    var sound = new Audio (`sounds/${id}.mp3`);
    sound.play();
}

function Pressed (color){
    $("#"+color).addClass("pressed");
    setTimeout ((function(){
        $("#"+color).removeClass("pressed");
    }),100);
}


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    sound(userChosenColour);
    Pressed(userChosenColour);
    Check(userClickedPattern.length-1);
});
  
function Check(currentLevel) {
    if (pattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == pattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        sound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
    
        startOver();
    }
}
  
function Pressed(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
  
function startOver() {
    level = 0;
    pattern = [];
    start = false;
}