// Set variables
var timerEl = document.querySelector('#timer');
var startButton = document.querySelector('#start-button');
var quizFrame = document.querySelector('.quiz-frame');
var highScore = document.querySelector('#highscore');
var scoreboard = document.querySelector('.scoreboard');
var questionText = quizFrame.querySelectorAll('h1')[0]
var introP = quizFrame.querySelectorAll('p')[0]
var answerText = quizFrame.querySelectorAll('div')[0]

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
    }
}

function startTimer(){
    scoreboard.style.display = "flex";
    var time = 10;
    timerEl.textContent = time;
        interval = setInterval(function() {
            if (time > 0) {
                time--
                timerEl.textContent = time;
            } else {
              clearInterval(interval);
              alert("Time has run out")
            }
        }, 1000);
}

function setQuestion(){
    // Clear quiz frame html
    introP.style.display = "none";
    startButton.style.display = "none";

    // Set header to question
    questionText.textContent = quizObj.question1.question;

    // Create answer options
    for(var i = 0; i < quizObj.question1.answers.length; i++){
        answerOption = document.createElement('a');
        answerOption.classList.add('btn');
        answerOption.classList.add('col-md-5');
        answerOption.classList.add('answer-option');
        answerOption.setAttribute("href","#");
        answerOption.textContent = quizObj.question1.answers[i];
        quizFrame.append(answerOption);
    }
    var answerOption = document.querySelector('.answer-option')
}

// Start quiz
startButton.addEventListener("click", function(){
    event.preventDefault();
    // startTimer();
    setQuestion();
})

quizFrame.addEventListener("click", function(e){
    event.preventDefault();
    // Test if the clicked answer matches the correct answer
    if (e.target.classList.value.indexOf('answer-option') > 0 && e.target.innerHTML === quizObj.question1.correct){
        alert("correct");
    }
})

