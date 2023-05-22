//Button Elements
const startBtn = document.getElementById("startbut");
var answerButtons = document.querySelectorAll(".answerBtn");

//Document elements
const startHide = document.getElementById("startHide");
const questHide = document.getElementById("questionHide");
const finishHide = document.getElementById("finishHide");
var timeLeft = document.querySelector(".timeLeft");
var questionText = document.querySelector(".question");
var outCome = document.querySelector(".outcome")
//Questions//
var quizQuestions = [
    {
        Question: "string objects are contained in what?",
        answers: {
            a: "Parenthesses",
            b: "Curly Brakets",
            c: "Quotes",
            d: "Square Brakets"
        },
        correctAnswer: "c"
    },

    {
        Question: "Arrays in Javascript can contain what?",
        answers: {
            a: "strings",
            b: "Booleans",
            c: "Numbers",
            d: "All of the above"
        },
        correctAnswer: "d"
    },

    {
        Question: "Commenly used data types do Not include?",
        answers: {
            a: "Strings",
            b: "Alerts",
            c: "Numbers",
            d: "Bolleans"
        },
        correctAnswer: "b"
    },
    {
        Question: "Which keyword is used to declare a variable in JavaScript?",
        answers: {
            a: "var",
            b: "let",
            c: "const",
            d: "int"
        },
        correctAnswer: "a"
    },

    {
        Question: "Which function is used to display a message in a dialog box?",
        answers: {
            a: "alert()",
            b: "prompt()",
            c: "console.log()",
            d: "confirm()"
        },
        correctAnswer: "a"
    },
    {
        Question: "What is the correct way to write an if statement in JavaScript?",
        answers: {
            a: "if i = 5 then",
            b: "if i == 5",
            c: "if (i === 5)",
            d: "if (i = 5)"
        },
        correctAnswer: "c"
    },
    {
        Question: "Which method is used to remove the last element from an array?",
        answers: {
            a: "push()",
            b: "splice()",
            c: "pop()",
            d: "slice()"
        },
        correctAnswer: "c"
    },
    {
        Question: "Which method is used to get the length of a string?",
        answers: {
            a: "length()",
            b: "size()",
            c: "count()",
            d: "charAt()"
        },
        correctAnswer: "a"
    },
    {
        Question: "What is the correct way to write a function in JavaScript?",
        answers: {
            a: "function = myFunction()",
            b: "function: myFunction()",
            c: "function myFunction()",
            d: "myFunction = function() {}"
        },
        correctAnswer: "c"
    }



]
//get random question//
function getRandomQuestion() {
    var randomIndex = Math.floor(Math.random() * quizQuestions.length);
    return quizQuestions[randomIndex];
}


// //write question and answers to html//
function displayQuestion(question) {
    questionText.innerHTML = question.Question;
    var answerKeys = Object.keys(question.answers);

    for (var i = 0; i < answerButtons.length; i++) {
        var answerBtn = answerButtons[i];
        var answerKey = answerKeys[i];
        answerBtn.innerHTML = question.answers[answerKey];
        answerBtn.setAttribute("data-answer", answerKey);
    }
}

//Event listeners
startBtn.addEventListener("click", startQuiz);
answerButtons.forEach(button => {
    button.addEventListener("click", selectAnswer);
});

//global variables
var currentQuestionIndex = 0;
var secondsLeft = 60;
var timeInterval;


//start quiz function
function startQuiz() {
    startHide.classList.add("hide");
    questHide.classList.remove("hide");
    countDown();

    var randomQuestion = getRandomQuestion();
    displayQuestion(randomQuestion);

}
//answer function
function selectAnswer(event) {
    var selectedAnswer = event.target.getAttribute("data-answer");
    var currentQuestion = quizQuestions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
        // Answer is correct
        outCome.textContent = "Correct";
    } else {
        // Answer is wrong, deduct time
        if (secondsLeft > 5) {
            secondsLeft -= 5;
        } else {
            // Time is up, end the quiz
            endQuiz();
            return;
        }
        outCome.textContent = "Wrong";
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        // Display the next question
        var nextQuestion = quizQuestions[currentQuestionIndex];
        displayQuestion(nextQuestion);
    } else {
        // No more questions, end the quiz
        endQuiz();
    }
}


// Timer function
function countDown() {
    var timeInterval = setInterval(function () {
        timeLeft.textContent = secondsLeft;

        if (secondsLeft < 1) {
            clearInterval(timeInterval);
            endQuiz();
            return;
        }
        secondsLeft--;
    }, 1000);
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timeInterval);
    questHide.classList.add("hide");
    finishHide.classList.remove("hide");
}


