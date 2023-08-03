
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){

        $("h1").text("Level " + level)
        nextSequence();
        started = true;
    }
}  
);

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level)

    var randomNumber = Math.round(Math.random()*3)    
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+ randomChosenColour ).fadeOut().fadeIn()
    
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
})

function playSound(name){
    new Audio("sounds/"+name+".mp3").play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100
    )
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      console.log("success");
      if(userClickedPattern.length == gamePattern.length){
        setTimeout(nextSequence(), 1000)
      }
    }
    else{
        new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"),400
        })
        $("h1").text("GAME OVER, press any key to restart")
        console.log("wrong");

        startOver();
    }
  }

function startOver(){
    level = 0;
    gamePattern = [];
    started = false; 
}