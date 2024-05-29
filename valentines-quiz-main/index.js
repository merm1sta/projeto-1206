const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");

let currentQuestionIndex = 0;
let totalCorrect = 0;

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  displayNextQuestion();
}

function displayNextQuestion() {
  resetState();
  
  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  $questionText.textContent = questions[currentQuestionIndex].question;
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer.text;
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
    }
    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
  $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct");
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect"); 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true;

    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });
  
  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor(totalCorrect * 100 / totalQuestions);
  
  let message = "";

  switch (true) {
    case (performance >= 90):
      message = "QUE ISSO, LEK, TMJ";
      break;
    case (performance >= 70):
      message = "Voando alto";
      break;
    case (performance >= 50):
      message = "45' do primeiro tempo";
      break;
    default:
      message = "Xoxinha demais";
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick="location.href='/valentines-day-main/valentine.html'" 
      class="button"
    >
      Clique aqui para prosseguir
    </button>
  `;
}

const questions = [
  {
    question: "Qual é o meu filme favorito do universo dos super-heróis?",
    answers: [
      { text: "Batman vs Superman", correct: false },
      { text: "Avengers: Endgame", correct: false },
      { text: "Logan", correct: true },
      { text: "Mulher-Maravilha", correct: false }
    ]
  },
  {
    question: "Qual é o meu jogador de futebol preferido?",
    answers: [
      { text: "Lionel Messi", correct: true },
      { text: "Cristiano Ronaldo", correct: false },
      { text: "Neymar JR", correct: false },
      { text: "Emanuel Figueiredo", correct: false }
    ]
  },
  {
    question: "Qual é o nome do bairro onde eu nasci?",
    answers: [
      { text: "Coxipó", correct: true },
      { text: "Santa Isabel", correct: false },
      { text: "Coophamil", correct: false },
      { text: "Cidade Alta", correct: false }
    ]
  },
  {
    question: "Julgue a afirmação a seguir como Verdadeiro ou Falso: Eu já quebrei um osso.",
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: "Quem são os meus personagens preferidos em B99 e The Office?",
    answers: [
      { text: "Gina e Michael Scott", correct: false },
      { text: "Santiago e Pam", correct: true },
      { text: "Terry e Dwight", correct: false },
      { text: "Peralta e Jim", correct: false }
    ]
  },
  {
    question: "Quando foi nosso primeiro encontro?",
    answers: [
      { text: "1 de julho", correct: false },
      { text: "13 de abril", correct: true },
      { text: "19 de maio", correct: false },
      { text: "30 de dezembro", correct: false }
    ]
  },
  {
    question: "São quantos anos de diferença entre eu e a Jessica?",
    answers: [
      { text: "14 anos", correct: false },
      { text: "18 anos", correct: false },
      { text: "15 anos", correct: false },
      { text: "16 anos", correct: true }
    ]
  },
  {
    question: "E entre eu e a Jaque?",
    answers: [
      { text: "10 anos", correct: false },
      { text: "12 anos", correct: false },
      { text: "11 anos", correct: true },
      { text: "13 anos", correct: false }
    ]
  },
  {
    question: "Fui tia do Muriloca com quantos anos?",
    answers: [
      { text: "10 anos", correct: false },
      { text: "11 anos", correct: true },
      { text: "12 anos", correct: false },
      { text: "9 anos", correct: false }
    ]
  },
  {
    question: "Você me ama?",
    answers: [
      { text: "Não, sua estúpida", correct: false },
      { text: "...", correct: false },
      { text: "Até que dá para o gasto", correct: false },
      { text: "Sim, lek, tmj", correct: true }
    ]
  }
];
