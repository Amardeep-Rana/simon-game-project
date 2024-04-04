var generatedArr= [];
var userArr= [];

// generating new squence
function randomNo(){
    userArr = [];
    var randomNo = Math.floor(Math.random()*4);
    generatedArr.push(randomNo);
    setTimeout(() => {
        animateBtn(randomNo);
        playSound($($(".btn-simon")[randomNo]).attr("id"))
    }, speedingTime());
  
}

function speedingTime(){
    var i = 2010;
    if(i>500){
        return i-100;
    }else{
        return i;
    }
}

// adding click eventlisner to push value of button to user response array(userArr) and calling checkAnswer to check answer
$(".btn-simon").on("click",function(){
    var a = $(this).attr("class")
    var b = a.charAt(a.length-1);
    userArr.push(b);
    console.log(userArr);
    animateBtn(b);
    playSound($(this).attr("id"))
    checkAnswer(userArr.length-1);   
})




var started = false;
var level = 0;

// adding keypress eventlisner to start game from starting
$(document).keypress(keypressToStart);

function keypressToStart(){
    if (!started) {
      $(".press-text").text("Level " + level);
      started = true;
      generatedArr=[];
      // userArr = [];
      randomNo();
    }
}
$(".startmobilebtn").on("click", function(){
    keypressToStart();
    $(".startmobilebtn").hide()
})

// checking answer(userArr) to the generated squence(generatedArr). 
var level = 1;
var gameon;
function checkAnswer(lastPartOfuserArr){
    if(userArr[lastPartOfuserArr]==generatedArr[lastPartOfuserArr]){
        gameon = true;
        if(userArr.length==generatedArr.length){                            // checking if a 'level' is over
            level++;
            randomNo();
            setTimeout(() => {
                $(".press-text").text("Level " + level);
            }, 1000);
        }
    }else{
        gameon=false;
        ifWrong()
    }
}

// if anwer is wrong then below funtion will be called
function ifWrong(){
    playSound("wrong");
    $("body").addClass("redbackground");
    setTimeout(() => {
        $("body").removeClass("redbackground");
    }, 300);
    $(".press-text").text("Game Over, Press Any Key to Restart");
    level=1;
    started=false;
    $(".startmobilebtn").show()

}

// animating buttons
function animateBtn(key){
    var a = key * 1;
    $(".btn-simon").eq(a).addClass("pressed");
    setTimeout(() => {
        $(".btn-simon").eq(a).removeClass("pressed");
        
    }, 100);
}

$(".closebtn").on("click", function(){

    $(".closebtn").addClass("closebtnclick");
    setTimeout(() => {
        $(".closebtn").removeClass("closebtnclick");
        
    }, 100);
    $("#instruction").fadeOut();
    $(".startbtn").fadeOut();

})
$(".instruct").on("click", function(){
    $("#instruction").fadeIn();
    $(".startbtn").fadeIn();
})

// adding sounds to buttons
function playSound(element){
    var play = new Audio("sounds/"+element+".mp3")
    play.play();
}


var smallScreen = window.matchMedia("(max-width: 880px)");
if (smallScreen.matches){
    $(".startmobilebtn").show()
    $(".press-text").text("Press 'start' to play");
}