//Button Elements
const startBtn = document.getElementById("startbut");
const but1 = document.getElementById("but1");
//Document elements
const startHide = document.getElementById("startHide");
const questHide = document.getElementById("questionHide");
const finishHide = document.getElementById("finishHide");
var timeLeft = document.querySelector(".timeLeft");

//Event listeners
startBtn.addEventListener("click", startQuiz);
but1.addEventListener("click", selectAnswer);

//global variables
var secondsLeft = 60;


//start quiz function
function startQuiz() {
    startHide.classList.add("hide");
    questHide.classList.remove("hide");
    countDown();

}
//answer function
function selectAnswer() {
    //if answer is wrong do this
    secondsLeft-=5;


}

//timer function
function countDown() {
    var timeInterval = setInterval(function () {
        secondsLeft--;
        timeLeft.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timeInterval);
            questHide.classList.add("hide");
            finishHide.classList.remove("hide");
        }
    },
        1000);

}




