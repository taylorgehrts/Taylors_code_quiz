const startBtn = document.getElementById("startbut");
const startHide = document.getElementById("startHide")
const questHide = document.getElementById("questionHide")
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startHide.classList.add("hide")
    questHide.classList.remove("hide")

}

function selectAnswer() {

}