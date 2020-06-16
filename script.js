// Set variables
var timer = document.querySelector('#timer');
var startButton = document.querySelector('#start-button');
var progressBar = document.querySelector('#progressBar');
var quizFrame = document.querySelector('.quiz-frame');
var highScore = document.querySelector('#highscore');
var scoreboard = document.querySelector('.scoreboard');
var result = document.querySelector('.result');
var score = document.querySelector('#score');
var endScreen = document.querySelector('.end');

// These are the text fields in the quiz fields
var questionText = quizFrame.querySelectorAll('h1')[0]
var introP = quizFrame.querySelectorAll('p')[0]
var answerText = quizFrame.querySelectorAll('div')[0]

// Set starting variables
var questionPosition = 1;
var time = 60;
var scoreValue = 0;

// Create objects with questions
var quizObj = {
    question1: {
        question : "The Lord of the Rings movies are based on a novel by what author?",
        answers : [
            "J.R.R. Tolkien",
            "J.K. Rowling",
            "J.M. Barrie",
            "H.G. Wells"
        ],
        correct : "J.R.R. Tolkien"
    },
    question2: {
        question : "What is the first voice we hear in The Fellowship of the Ring?",
        answers : [
            "Frodo",
            "Gandalf",
            "Bilbo",
            "Galadriel"
        ],
        correct : "Galadriel"
    },
    question3: {
        question : "The only way to destroy the Ring of Power is to throw it into the fires of _________?",
        answers : [
            "Mount Zion",
            "Mount Doom",
            "Mount Mordor",
            "Mount Moria"
        ],
        correct : "Mount Doom"
    },
    question4: {
        question : "While traveling through the mines of Moria, which member of the Fellowship of the Ring is killed by the Balrog?",
        answers : [
            "Boromir",
            "Frodo",
            "Gandalf",
            "Aragorn"
        ],
        correct : "Gandalf"
    },
    question5: {
        question : "What is the name of the Ent who carries Pippin and Merry through Fangorn Forest?",
        answers : [
            "Greybranch",
            "Quickbeam",
            "Treebeard",
            "Skinbark"
        ],
        correct : "Treebeard"
    },
    getQuestion : function(x){
        var question = "";
        switch(x){
            case 1:
                question = quizObj.question1.question;
                break;
            case 2:
                question = quizObj.question2.question;
                break;
            case 3:
                question = quizObj.question3.question;
                break;
            case 4:
                question = quizObj.question4.question;
                break;
            case 5:
                question = quizObj.question5.question;
                break;
        }
        return question;
    },
    getAnswers : function(a, b){
        var answers = "";
        switch(a){
            case 1:
                answers = quizObj.question1.answers[b];
                break;
            case 2:
                answers = quizObj.question2.answers[b];
                break;
            case 3:
                answers = quizObj.question3.answers[b];
                break;
            case 4:
                answers = quizObj.question4.answers[b];
                break;
            case 5:
                answers = quizObj.question5.answers[b];
                break;
        }
        return answers;
    },
    getCorrectAnswers : function(a){
        var correctAnswers = "";
        switch(a){
            case 1:
                correctAnswers = quizObj.question1.correct;
                break;
            case 2:
                correctAnswers = quizObj.question2.correct;
                break;
            case 3:
                correctAnswers = quizObj.question3.correct;
                break;
            case 4:
                correctAnswers = quizObj.question4.correct;
                break;
            case 5:
                correctAnswers = quizObj.question5.correct;
                break;
        }
        return correctAnswers;
    }
};

// Check if there is data in local storage for the score object, if not create an empty one
var scoreObj = JSON.parse(localStorage.getItem('scoreObj'));
if (scoreObj === null){
    var scoreObj = {
        user : [],
        score : []
    }
}  

function startTimer(){
    // Show scoreboard div
    scoreboard.style.opacity = "1";
    // Output time
    timer.textContent = time;
    // Countdown time
        interval = setInterval(function() {
            if (time > 0) {
                time--
                timer.textContent = time;
                // Change progress bar to reflect time
                progressBar.style.width = (time * 1.6) + "%";
            } else {
                endQuiz();
            }
        }, 1000);
}

function setQuestion(){
    if(questionPosition > 5){
        endQuiz();
    } else{
        // Clear quiz frame html
        introP.style.display = "none";
        startButton.style.display = "none";
        quizFrame.innerHTML = "";

        // Set header to question
        questionText = document.createElement('h1');
        questionText.textContent = quizObj.getQuestion(questionPosition);
        quizFrame.append(questionText);

        // Create answer options
        for(var i = 0; i < 4; i++){
            answerOption = document.createElement('a');
            answerOption.classList.add('btn');
            answerOption.classList.add('col-md-5');
            answerOption.classList.add('answer-option');
            answerOption.setAttribute("href","#");
            answerOption.textContent = quizObj.getAnswers(questionPosition,i);
            quizFrame.append(answerOption);
        }
        var answerOption = document.querySelector('.answer-option')
    }
}

function correct(){
    // Run if a correct answer is submitted
    // Show result bar
    result.style.opacity = "1";
    result.textContent = "Correct :)";
    result.style.backgroundColor = "#33FF5E";
    questionPosition++;
    scoreValue++;
    setQuestion();
}

function wrong(){
    // Run if a wrong answer is submitted
    // Show result bar
    result.style.opacity = "1";
    // Output question result and correct answer
    result.textContent = "Wrong :( The correct answer was: " + quizObj.getCorrectAnswers(questionPosition);
    result.style.backgroundColor = "#FF5333";
    // Reduce time
    time -= 10;
    timer.textContent = time;
    // Change progress bar to reflect time
    progressBar.style.width = (time * 1.6) + "%";
    // Increase question position
    questionPosition++;
    setQuestion();
}

function endQuiz(){
    // When quiz has ended
    result.style.opacity = "0";
    scoreboard.style.opacity = "0";
    // Stop timer
    clearInterval(interval);
    // Create HTML output when quiz ends
    var endHTML = "<h1>Quest completed!</h1>";
    endHTML += "<h2>Score: " + time +"</h2>";
    endHTML += "<p>Correct answers: " + scoreValue +" /// Incorrect answers: " + (5 - scoreValue) + "</p>";
    endHTML += "<hr>";
    endHTML += "<p>Please enter your initials:</p>";
    endHTML += "<input type='text' id='initials'>";
    endHTML += "<input type='submit' value='Submit' class='scoreSubmit'>";
    quizFrame.innerHTML = endHTML;
}

function submitScore(){
    scoreObj.user.push(document.querySelector('#initials').value);
    scoreObj.score.push(time);
    localStorage.setItem('scoreObj', JSON.stringify(scoreObj));
    getScore();
}

function getScore(){
    // Clear HTML Frame
    quizFrame.innerHTML = "";

    // Get score object from local storage
    var newScoreObj = JSON.parse(localStorage.getItem('scoreObj'))

    // Output high scores
    if (scoreObj.user.length !== 0){
    for(var i = 0; i < newScoreObj.user.length; i++){
        var highscoreString =  newScoreObj.user[i] + " - " + newScoreObj.score[i];
        var highscoreText = document.createElement('p');
        highscoreText.innerHTML = highscoreString;
        highscoreText.classList.add('highscore-text');
        quizFrame.prepend(highscoreText);
    }
    // Add brackets next to the current user
    var highScoreText = document.querySelectorAll('p')[0]
    highScoreText.innerHTML = ">> " + highScoreText.innerHTML + " <<"
}
    // Create header
    var highScoreHeader = document.createElement('h1');
    highScoreHeader.textContent = "High Scores: ";
    quizFrame.prepend(highScoreHeader);
    console.log(scoreObj.user);

    // Create button to replay game
    var replayLink = document.createElement('a');
    replayLink.textContent = "Replay";
    replayLink.setAttribute("href","#");
    replayLink.classList.add('replay-link');
    replayLink.classList.add('btn');
    quizFrame.append(replayLink);

    // If the score Object has data in it, give option to clear local storage
    if (scoreObj.user.length !== 0){
        var clearLink = document.createElement('a');
        clearLink.textContent = "Clear Scores";
        clearLink.setAttribute("href","#");
        clearLink.classList.add('clear-link');
        clearLink.classList.add('btn');
        quizFrame.append(clearLink);
    }
}

// Start quiz button
startButton.addEventListener("click", function(){
    event.preventDefault();  
    startTimer();
    setQuestion();
})

quizFrame.addEventListener("click", function(e){
    event.preventDefault();
    // Test if the clicked answer matches the correct answer
    if (e.target.classList.value.indexOf('answer-option') !== -1 && e.target.innerHTML === quizObj.getCorrectAnswers(questionPosition)){
        correct();
    } else if (e.target.classList.value.indexOf('answer-option') > 0){
        wrong();
    }
    
    // Submit score button click
    if(e.target.classList.value.indexOf('scoreSubmit') !== -1){
        submitScore();
    }
    
    // Clear scores button click
    if(e.target.classList.value.indexOf('clear-link') !== -1){
        scoreObj.user = [];
        scoreObj.score = [];
        localStorage.setItem('scoreObj', JSON.stringify(scoreObj));
        getScore();
    }

    // Replay button game
    if(e.target.classList.value.indexOf('replay-link') !== -1){
        window.location.reload();
    }
})

highscore.addEventListener("click",function(){
    clearInterval(interval);
    getScore();
})