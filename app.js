const totalQuestions = document.querySelector(".total-questions");
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswer = 0;
let attempt = 0;
let interval;

//push the questions into availableQuestions array
function setAvailableQuestions(){
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

// set question number and question and option
function getNewQuestion(){
  // set question number
  questionNumber.innerHTML =
    "Question " + (questionCounter + 1) + " of " + quiz.length;
  // set question text
  // get random question
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;
  // get the position of 'questionIndex' from the availableQuestion Array;
  const index1 = availableQuestions.indexOf(questionIndex);
  // remove the 'questionIndex' from the availableQuestion Array, to eliminate repetition
  availableQuestions.splice(index1, 1);

  // set options
  // get the length of options
  const optionLen = currentQuestion.options.length;
  //push options into availableOptions Array.
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }
  optionContainer.innerHTML = "";
  let animationDelay = 0.15;
  // create options in html.
  for (let i = 0; i < optionLen; i++) {
    // random option.
    const optonIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    // get the position of 'optonIndex' from the availableOptions Array.
    const index2 = availableOptions.indexOf(optonIndex);
    // remove the 'optonIndex' from availableOptions Array, so that the option does not repeat.
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optonIndex];
    option.id = optonIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }

  questionCounter++;
}

// get the results of attempted question.
function getResult(element) {
  const id = parseInt(element.id);
  // get the answer by comparing the id of clicked option
  if (id === currentQuestion.answer) {
    // set color to correct answer option
    element.classList.add("correct");
    // add correct mark to indicator bubble
    updateAnswerIndicator("correct");
    correctAnswer++;
  } else {
    ("answer is wrong");
    //set color to wrong answer option
    element.classList.add("wrong");
    // add wrong mark to indicator bubble
    updateAnswerIndicator("wrong");
    //if answer is wrong show corrected answer in blue simultaneously
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
      if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unclickableOptions();
  stopTimer();
}

// set all the options to unclickable once the user selects an option()
function unclickableOptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
}

function answersIndicator() {
  answerIndicatorContainer.innerHTML = "";
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement("div");
    answerIndicatorContainer.appendChild(indicator);
  }
}
function updateAnswerIndicator(markType) {
  answerIndicatorContainer.children[questionCounter - 1].classList.add(
    markType
  );
}
function next() {
  if (questionCounter === quiz.length) {
    quizOver();
    stopTimer();
  } else {
    getNewQuestion();
    startTimer();
  }
}

function quizOver() {
  // hide Quiz Box
  quizBox.classList.add("hide");
  //show result Box
  resultBox.classList.remove("hide");
  quizResults();
}

//get Quiz results
function quizResults() {
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswer;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswer;
  const percentage = (correctAnswer / quiz.length) * 100;
  resultBox.querySelector(".percentage").innerHTML =
    percentage.toFixed(2) + "%";
  resultBox.querySelector(".total-score").innerHTML =
    correctAnswer + " / " + quiz.length;
}

function resetQuiz() {
  questionCounter = 0;
  correctAnswer = 0;
  attempt = 0;
}

function tryAgain() {
  // hide the resultBox
  resultBox.classList.add("hide");
  //show quizBox
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

function goToHome() {
  // hide results Box
  resultBox.classList.add("hide");
  // show home Box
  homeBox.classList.remove("hide");
  resetQuiz();
}

//#### STARTING POINT ####

function startQuiz() {
  this.startTimer();
  // hide Home Box
  homeBox.classList.add("hide");
  //show quizBox
  quizBox.classList.remove("hide");
  // set questions in availableQuestions array
  setAvailableQuestions();
  // call to getNewQuestion(); function
  getNewQuestion();
  // create indicators of answers
  answersIndicator();
}

function startTimer() {
  let timeLimit = 15;
  remainingTime.innerHTML = timeLimit;
  interval = setInterval(() => {
    timeLimit--;
    if (timeLimit < 10) {
      timeLimit = "0" + timeLimit;
    }
    if (timeLimit < 10) {
      remainingTime.classList.add("less-time");
    }
    remainingTime.innerHTML = timeLimit;
    if (timeLimit == 0) {
      clearInterval(interval);
      timeUp();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

window.onload = function () {
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
};
