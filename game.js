const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'What is 2 + 2?',
    Choice1: '2',
    Choice2: '4',
    Choice3: '6',
    Choice4: '8',
    answer: 2,
  },
  {
    question: 'What is 8 + 2',
    Choice1: '25',
    Choice2: '4',
    Choice3: '10',
    Choice4: '28',
    answer: 10,
  },
  {
    question: 'What is 92 + 8?',
    Choice1: '100',
    Choice2: '4',
    Choice3: '60',
    Choice4: '180',
    answer: 100,
  },
  {
    question: 'What is 24 + 20?',
    Choice1: '26',
    Choice2: '44',
    Choice3: '66',
    Choice4: '48',
    answer: 44,
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

// Start Game Function
startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/end.html')
  }

  questionCounter ++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS} `
  progressBarFull.style.width = `$ {(questionCounnter/MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)
  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)

      getNewQuestion()
    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()