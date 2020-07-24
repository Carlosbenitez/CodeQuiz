//constant variables
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

//all the questions
//worked with study group for these questions
let questions = [
    {
        question: "What tag starts a paragraph of text in HTML?",
        choice1: "<p>",
        choice2: "<br>",
        choice3: "<head>",
        choice4: "<body>",
        answer: 1
    },
    {
        question: "What is CSS used for?",
        choice1: "Making webpages more interactive.",
        choice2: "Debugging the code.",
        choice3: "Seasoning your favorite chicken.",
        choice4: "Styling and formatting webpages.",
        answer: 4
    },
    {
        question: "What is used to add a link?",
        choice1: "linker",
        choice2: "html",
        choice3: "href",
        choice4: "css",
        answer: 3
    },
    {
        question: "How do you check code on a webpage?",
        choice1: "Highlight the entire screen.",
        choice2: "The inspect feature on Chrome.",
        choice3: "Check who hosts the page.",
        choice4: "Ctrl C, Ctrl V.",
        answer: 2
    },
    {
        question: "Where is the best place for a stylesheets?",
        choice1: "In the <head> tag.",
        choice2: "Inside the javascript.",
        choice3: "Next to a <p> tag.",
        choice4: "Outside the <body> tag.",
        answer: 1
    },
];


const right = 1;
const maxQuestions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};


//function to get new question
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("ending.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;

    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


//for when selecting answers
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "right" : "wrong";

        if (classToApply === "right") {
            incrementScore(right);
        }

        selectedChoice.parentElement.classList.add(classToApply);


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();