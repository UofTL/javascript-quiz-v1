var restartBtn = document.querySelector("button.restartBtn"),
    clearBtn = document.querySelector("button.clearBtn"),
    // get the user history 
    highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
    scoreList = document.getElementById("score-list");

highScores.sort(function(a, b) {
    return b.score - a.score
})

// display the scores
for (var s = 0; s < highScores.length; s++) {
    var newLi = document.createElement("li")
    newLi.textContent = highScores[s].name + " - " + highScores[s].score
    scoreList.appendChild(newLi)
}

// option keep or clear history
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    history.back()
});
restartBtn.addEventListener("click", function() {
    history.back();
});