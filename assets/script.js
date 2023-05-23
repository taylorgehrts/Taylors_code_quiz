//Button Elements
const startBtn = document.getElementById("startbut");
var answerButtons = document.querySelectorAll(".answerBtn");
//new
//var submit = document.getElementById("submit");

//Document elements
const startHide = document.getElementById("startHide");
const questHide = document.getElementById("questionHide");
const finishHide = document.getElementById("finishHide");
const highScoreHide = document.getElementById("highScoreHide");
const outComeHide = document.getElementById('outComeHide');
var timeLeft = document.querySelector(".timeLeft");
var questionText = document.querySelector(".question");
var outCome = document.querySelector(".outcome");
//new
var scoreElement = document.getElementById("score");
var initialsInput = document.getElementById("initials");
var submitForm = document.getElementById("submit-form");
var submittedInitials = localStorage.getItem("initialsText")
var highScoreBtn = document.getElementById("highScoreBtn")


var score = 0;
var initailStore = [];
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

// Function for submit// new
//event listner for submit button
submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var initialsText = initialsInput.value.trim();
    //return if nothing entered
    if (initialsText === "") {
        return;
    }
    initailStore.push(initialsText);
    initialsInput.value = "";
    localStorage.setItem("initials", initialsText);
    finishHide.classList.add("hide");
    highScoreHide.classList.remove("hide");
    highScoreScreen()
});
function highScoreScreen() {
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

  highScoreBtn.addEventListener('click', function(event) {
    highScoreScreen();
    questHide.classList.add("hide");
    finishHide.classList.add("hide");
    outComeHide.classList.add("hide");
    startHide.classList.add('hide');
    highScoreHide.classList.remove('hide');
  })


  
  
//todo
//style

