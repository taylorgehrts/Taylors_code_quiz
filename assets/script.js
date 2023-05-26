//Button Elements
const startBtn = document.getElementById("startbut");
var answerButtons = document.querySelectorAll(".answerBtn");

//Global Document elements
const startHide = document.getElementById("startHide");
const questHide = document.getElementById("questionHide");
const finishHide = document.getElementById("finishHide");
const highScoreHide = document.getElementById("highScoreHide");
const outComeHide = document.getElementById('outComeHide');
var timeLeft = document.querySelector(".timeLeft");
var questionText = document.querySelector(".question");
var outCome = document.querySelector(".outcome");
var scoreElement = document.getElementById("score");
var initialsInput = document.getElementById("initials");
var submitForm = document.getElementById("submit-form");
var goBack = document.getElementById("goBack");
var tryAgain = document.getElementById("tryAgain");
var submittedInitials = localStorage.getItem("initialsText");
var highScoreBtn = document.getElementById("highScoreBtn");

//score numbert and initial array
var score = 0;
var initailStore = [];

//global variables
var currentQuestionIndex = 0;
var secondsLeft = 60;
var timeInterval;

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

//Event listeners for start and answer buttons
startBtn.addEventListener("click", startQuiz);
answerButtons.forEach(button => {
    button.addEventListener("click", selectAnswer);
});

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
        outCome.style.color = "green";
        score++;
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
        outCome.style.color = "red";
    }
    //Move to next question
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        // Display the next question
        var nextQuestion = quizQuestions[currentQuestionIndex];
        displayQuestion(nextQuestion);
    } else {
        // No more questions, end the quiz
        secondsLeft = 0;
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
    outComeHide.classList.add("hide");
    scoreElement.innerHTML = score;
}


//event listner for initial and score submit button
submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var initialsText = initialsInput.value.trim();
    //return if nothing entered
    if (initialsText === "") {
        return;
    }
    // Check if initialsText has more than two letters
    if (initialsText.length > 2) {
        // If initialsText has more than two letters, display an error message
        alert("please only enter 2 characters")
        return;
    }
    initailStore.push(initialsText.toUpperCase());
    initialsInput.value = "";
    localStorage.setItem("initials", initialsText);
    finishHide.classList.add("hide");
    highScoreHide.classList.remove("hide");
    highScoreScreen()
});
//event listner for go back button
goBack.addEventListener("click", function (event) {
    event.preventDefault();
    location.reload();
});

//event listner for try again
tryAgain.addEventListener("click", function (event) {
    event.preventDefault();
    location.reload();
});

//high score function including all local storage
function highScoreScreen() {
    // make highscores button inactive while on the highscore screen
    highScoreBtn.disabled = true;
    var highScoreList = document.querySelector("#highScore-container ol");
    var clearBtn = document.getElementById("clearScoresBtn");

    // Clear existing list items if the button is clicked
    clearBtn.addEventListener("click", function () {
        highScoreList.innerHTML = "";
        initailStore = [];
        score = 0;
        localStorage.removeItem("highScores");
    });


    // Retrieve existing high scores from local storage
    var storedHighScores = localStorage.getItem("highScores");

    // Parse existing high scores from local storage if they exist
    var highScores = storedHighScores ? JSON.parse(storedHighScores) : [];

    // Sort high scores in descending order based on the score value
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });

    // Append stored high scores to the high score list if they exist
    if (highScores.length > 0) {
        highScores.forEach(function (item) {
            var listItem = document.createElement("li");
            listItem.textContent = item.initials + " - " + item.score;
            highScoreList.appendChild(listItem);
        });
    }

    // Append current initials and score to the high score list
    if (initailStore.length > 0 && score > 0) {
        var currentItem = {
            initials: initailStore.join(", "),
            score: score
        };
        highScores.push(currentItem);

        // Sort the updated high scores array again
        highScores.sort(function (a, b) {
            return b.score - a.score;
        });

        highScoreList.innerHTML = ""; // Clear the list before re-adding sorted items

        highScores.forEach(function (item) {
            var listItem = document.createElement("li");
            listItem.textContent = item.initials + " - " + item.score;
            highScoreList.appendChild(listItem);
        });

        // Store updated high scores in local storage
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }
}
// high scores button
highScoreBtn.addEventListener('click', function (event) {
    // make highscores button inactive while on the highscore screen
    highScoreBtn.disabled = true;
    highScoreScreen();
    questHide.classList.add("hide");
    finishHide.classList.add("hide");
    outComeHide.classList.add("hide");
    startHide.classList.add('hide');
    highScoreHide.classList.remove('hide');

})

