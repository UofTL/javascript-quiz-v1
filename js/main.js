var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
var secondsLeft = (questions.length * 10 + 1);
var timerElement = document.getElementById("timer");
var submitScoreElement = document.querySelector("#submit-score");
var userScoreElement = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");

var questionNumber = -1;
var answer;


function startTimer() {

    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');

    // timer set 
    setTimer();

    // create questions 
    makeQuestions();
}

function setTimer() {

    var countdown = setInterval(function() {
        secondsLeft--;
        timerElement.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

function makeQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer

    questionHead.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for (var q = 0; q < choices.length; q++) {
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[q]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
}

// score history form
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreElement.textContent = "Your Score: " + secondsLeft + ".";
}

startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    addScore();

    window.location.href ="./scores-history.html"
});

function addScore() {
    userNameInput = document.getElementById("userName").value

    // create a new object with name and score keys
    var newScore = {
        name: userNameInput,
        score: secondsLeft
    };

    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push(newScore)
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function hideFeedback() {
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.style.display = 'none'
}

function showFeedback() {
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.removeAttribute('style');
}

answerChoices.addEventListener("click", function(event) {
    var pElement = document.getElementsByClassName("feedback")[0]

    // user's answer
    if (answer === event.target.textContent) {
        pElement.innerHTML = "Correct";
        setTimeout(hideFeedback, 612);
        showFeedback();

    } else {
        pElement.innerHTML = "Incorrect";
        setTimeout(hideFeedback, 612);
        secondsLeft = secondsLeft - 10;
        showFeedback();
    }
    makeQuestions();
});