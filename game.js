var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var l=0;
var clicks=0;
var start=0;

function nextSequence(){
    
    $("h1").text("Level "+l);
    l++;

    var a=Math.floor((Math.random()*100)%4);
    
    var name = buttonColor[a];
    gamePattern.push(buttonColor[a]);
    
    $("#"+name).fadeOut(100).fadeIn(100);
    playSound(name);
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(() => { $("."+currentColour).removeClass("pressed");; }, 100);
}

function checkAnswer(){
    clicks=0;
    console.log("In");
    for(var i=0;i<l;i++)
    {
        if(userClickedPattern[i]!= gamePattern[i])
        {
            $("h1").text("End");
            break;
        }
    }
    userClickedPattern = [];
    if($("h1").text()!='End')
    {
        setTimeout(nextSequence,1000);
    }
    else
    {
        start=0;
        l=0;
        gamePattern=[];
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000)
        setTimeout(function(){
            $("h1").text("Press A Key to Start");
        },1000)
    
    }
    
}

$(".btn").click(function(event){
    clicks++;
    console.log("clicks="+clicks);
    var userChosenColour=this.classList[1];
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if(clicks==l)
    checkAnswer();
    
});

$(document).keypress(function(event){
    if(event.key=='a' && start==0)
    {
        nextSequence();
        start=1;
    }
    
});