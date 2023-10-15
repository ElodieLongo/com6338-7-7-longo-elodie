let questionsArr = [
  {
    question: 'What is the tallest building in the world?',
    answer: "Burj Khalifa",
    options: [
      "Burj Khalifa",
      "Shanghai Tower",
      "Lotte World Tower",
      "Merdeka"
    ]
  },
  {
    question: 'What is the smallest country in the world?',
    answer: "Vatican City",
    options: [
      "Vatican City",
      "Monaco",
      "San Marino",
      "Andorra"
    ]
  },
  {
    question: 'What is the most populated country in the world?',
    answer: "China",
    options: [
      "China",
      "India",
      "United States",
      "Indonesia"
    ]
  },
  {
    question: 'What is the country with the largest territory?',
    answer: "Russia",
    options: [
      "Russia",
      "Canada",
      "China",
      "United States"
    ]
  },
  {
    question: 'What is the country with the largest mountain area?',
    answer: "Bhutan",
    options: [
      "Bhutan",
      "Tajikistan",
      "Kyrgyzstan",
      "Lesotho"
    ]
  },
];

const hasPlayedBefore = localStorage.getItem('previous-score') !== null;
const quizContainer = document.getElementById('quiz');

// start button
function createStartQuizButton() {
  const startQuizButton = document.createElement('button');
  startQuizButton.textContent = 'Start Quiz!';
  startQuizButton.id = 'start-quiz';
  return startQuizButton;
}

// quiz status
function initializeQuiz() {
  quizContainer.innerHTML = ''; 

  const startQuizButton = createStartQuizButton();
  quizContainer.appendChild(startQuizButton);

  startQuizButton.addEventListener('click', startQuiz);

  if (hasPlayedBefore) {
    const previousScore = localStorage.getItem('previous-score');
    const scoreElement = document.createElement('p');
    scoreElement.textContent = `Previous Score: ${previousScore}%`;
    quizContainer.appendChild(scoreElement);
  }
}

//run quiz
function startQuiz() {
  quizContainer.innerHTML = ''; 
  let currentQuestionIndex = 0;
  let score = 0;
  let timerElement;

  function displayNextQuestion() {
    if (currentQuestionIndex < questionsArr.length) {
      const questionObj = questionsArr[currentQuestionIndex];

      const questionElement = document.createElement('p');
      questionElement.textContent = questionObj.question;
      quizContainer.appendChild(questionElement);

      const optionsDiv = document.createElement('div');
      questionObj.options.forEach((choice) => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;

        choiceButton.addEventListener('click', () => {
          if (choice === questionObj.answer) {
            score++;
          }
          questionElement.remove();
          optionsDiv.remove();
          clearInterval(timerInterval);
          timerElement.remove(); 
          currentQuestionIndex++;
          displayNextQuestion();
        });

        optionsDiv.appendChild(choiceButton);
      });

      quizContainer.appendChild(optionsDiv);
//timer
      timerElement = document.createElement('p');
      let seconds = 30;

      const timerInterval = setInterval(() => {
        timerElement.textContent = `${seconds}`;
        seconds--;
        if (seconds === -1) {
          clearInterval(timerInterval);
          questionElement.remove();
          optionsDiv.remove();
          timerElement.remove();
          currentQuestionIndex++;
          displayNextQuestion();
        }
      }, 1000);

      quizContainer.appendChild(timerElement);
    } else {
      const scorePercentage = Math.round((score / questionsArr.length) * 100);
      const scoreElement = document.createElement('p');
      scoreElement.textContent = `Your Score: ${scorePercentage}%`;
      quizContainer.appendChild(scoreElement);

      
      localStorage.setItem('previous-score', scorePercentage);

      const newStartQuizButton = createStartQuizButton();
      quizContainer.appendChild(newStartQuizButton);

      newStartQuizButton.addEventListener('click', startQuiz);
    }
  }

  displayNextQuestion();
}

if (hasPlayedBefore) {
  const previousScore = localStorage.getItem('previous-score');
  const scoreElement = document.createElement('p');
  scoreElement.textContent = `Previous Score: ${previousScore}%`;
  quizContainer.appendChild(scoreElement);
} else {
  initializeQuiz();
}