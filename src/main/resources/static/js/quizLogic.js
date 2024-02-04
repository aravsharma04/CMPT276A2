// Quiz Script

// List of Questions
const questions = [
    {
        question: "Which month has the fewest days?",
        answers: [
            {text: "February", correct: true},
            {text: "December", correct: false},
            {text: "March", correct: false},
            {text: "April", correct: false},
        ]
        },{
        question: "What is the biggest country in North America?",
        answers: [
            {text: "America", correct: false},
            {text: "England", correct: false},
            {text: "Mexico", correct: false},
            {text: "Canada", correct: true},
]
        },{
        question: "Which NBA player currently plays for the Los Angeles Lakers",
        answers: [
            {text: "Stephen Curry", correct: false},
            {text: "Lebron James", correct: true},
            {text: "Jordan Poole", correct: false},
            {text: "Michael Jordan", correct: false},
        ]
        }, {
            question: "Which animal has eight legs",
            answers: [
                {text: "Octopus", correct: true},
                {text: "Horse", correct: false},
                {text: "Elephant", correct: false},
                {text: "Dog", correct: false},
            ]
        }, {
            question: "Which company goes by the slogan 'Just do it!' ",
            answers: [
                {text: "Adidas", correct: false},
                {text: "Puma", correct: false},
                {text: "New Balance", correct: false},
                {text: "Nike", correct: true},
            ]
        }
]

// Variables to hold HTML tags
const questionTag = document.getElementById("question");
const answerTags = document.getElementById("answerBtn");
const prev = document.getElementById("prevBtn");
const next = document.getElementById("nextBtn");
const results = document.getElementById("results");
let chosen = [];

let questionIndex = 0;
let score = 0;

function startQuiz() {
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
    chosen = [];
    questionIndex = 0;
    score = 0;
    next.innerHTML = "Next";
    displayQuestion();
}

// Function to display the question
function displayQuestion() {
    reset();
    let currentQuestion = questions[questionIndex];
    let questionNum = questionIndex + 1;
    questionTag.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerTags.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", chooseAnswer);
        if(chosen[questionIndex] == answer.text){
            button.classList.add("selected");
        }
    });
    if(chosen[questionIndex]){
        next.style.display;
    }
    next.style.display = "block";
    prev.style.display = "block";
}

// Function to reset tag states
function reset() {
    results.style.display = "none";
    next.style.display = "none";
    prev.style.display = "none"; 

    while (answerTags.firstChild) {
        answerTags.removeChild(answerTags.firstChild);
    }
}

// Function to select an answer
function chooseAnswer(e) {
    const selected = e.target;
    const previouslySelected = answerTags.querySelector(".btn.selected");
    if (previouslySelected === selected) {
        selected.classList.remove("selected");
        chosen[questionIndex] = null;
    } else {
        if (previouslySelected) {
            previouslySelected.classList.remove("selected");
        }
    }
    selected.classList.add("selected");
    const isCorrect = selected.dataset.correct == "true";
    if (isCorrect) {
        selected.classList.add("correct");
    } else {
        selected.classList.add("incorrect");
    }
    Array.from(answerTags.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add("correct");
        }
    });
    chosen[questionIndex] = selected.innerHTML;
}

// Function to display the results
function displayScore() {
    reset();
    score = 0;
    chosen.forEach((chosenAnswer, index) => {
        const question = questions[index];
        const correctAnswer = question.answers.find(answer => answer.correct).text;
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionElement.appendChild(questionText);

        question.answers.forEach(answer => {
            const answerElement = document.createElement("p");
            answerElement.textContent = answer.text;

            if (answer.correct) {
                answerElement.classList.add("correct-answer");
            } else if (chosenAnswer === answer.text) {
                answerElement.classList.add("wrong-answer");
            }

            questionElement.appendChild(answerElement);
        });

        results.appendChild(questionElement);

        if (chosenAnswer === correctAnswer) {
            score++;
        }
    });
    questionTag.innerHTML = `You scored ${score} out of ${questions.length}!`;
    next.innerHTML = "Play Again?";
    next.style.display = "block";
    results.style.display = "block";
}

// Function to go to the next question
function goNext() {
    if (chosen[questionIndex] !== undefined) {
        questionIndex++;
        if (questionIndex < questions.length) {
            if (chosen.length == 4) {
                next.innerHTML = "Submit";
            }
            displayQuestion();
        } else {
            displayScore();
        }
    } else {
        alert("Please select an answer");
    }
}

// Function to go to the previous question
function goPrevious() {
    next.innerHTML = "Next";
    if (questionIndex > 0) {
        questionIndex--;
        displayQuestion();
        if (answeredQuestions[questionIndex] !== undefined) {
            chooseAnswer(answeredQuestions[questionIndex]);
        }
    }
}

next.addEventListener("click", () => {
    if (questionIndex < questions.length) {
        goNext();
    } else {
        startQuiz();
    }
});

prev.addEventListener("click", goPrevious);

// Start Quiz
startQuiz();