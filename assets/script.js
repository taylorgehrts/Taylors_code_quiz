const startBtn = document.getElementById("startbut");
const but1 =document.getElementById("but1");

const startHide = document.getElementById("startHide")
const questHide = document.getElementById("questionHide")
const finishHide = document.getElementById("finishHide")

startBtn.addEventListener("click", startQuiz);
but1.addEventListener("click", selectAnswer)

function startQuiz() {
    startHide.classList.add("hide")
    questHide.classList.remove("hide")

}

function selectAnswer() {
    questHide.classList.add("hide")
    finishHide.classList.remove("hide")

}