let questionsAsked = 0
let score = 0

//Function to hide all the elements from the introduction. This function is called when the user starts the quiz

const hideStartButton = function () {
  let startLink = document.getElementById('start')
  startLink.classList.add('hide')

  let introduction = document.getElementById('introduction')
  introduction.classList.add('hide')
}

const showNextButton = function () {
  let nextLink = document.getElementById('next')
  nextLink.classList.remove('hide')
}

const hideNextButton = function () {
  let nextLink = document.getElementById('next')
  nextLink.classList.add('hide')
}

const clearCanvas = function () {
  let answerContainer = document.querySelector('.answer-container')
  answerContainer.innerHTML = ''

  let questionContainer = document.querySelector('.question-container > span')
  questionContainer.innerHTML = ''
}

const showResults = function () {
  let questionContainer = document.querySelector('.question-container')
  let resultText = document.createElement('span')
  resultText.innerText =
    'Congratulations, you have finished the quiz. You scored ' +
    score +
    ' out of ' +
    questionsAsked

  questionContainer.appendChild(resultText)
}

const randomQuestion = function () {
  hideStartButton()
  clearCanvas()
  hideNextButton()

  if (questionsAsked === 5) {
    showResults()
    return
  }

  questionsAsked++
  console.log(questionsAsked)

  let randomNumber = Math.floor(Math.random() * questions.length)
  let question = questions[randomNumber]

  let allAnswers = []
  allAnswers.push(question.correct_answer)

  for (let i = 0; i < question.incorrect_answers.length; i++) {
    allAnswers.push(question.incorrect_answers[i])
  }

  //Create the DOM Elements to display the QUESTION
  let questionContainer = document.querySelector('.question-container')
  let questionText = document.createElement('span')
  questionText.innerText = question.question
  questionContainer.insertBefore(questionText, questionContainer.firstChild)

  //Create the DOM elements to display the possible answers
  let answerContainer = document.querySelector('.answer-container')
  for (let i = 0; i < allAnswers.length; i++) {
    let answerButton = document.createElement('button')
    answerButton.classList.add('answer-button')
    answerButton.innerText = allAnswers[i]
    answerButton.setAttribute('onclick', 'isAnswerCorrect(event)')
    if (allAnswers[i] === question.correct_answer) {
      answerButton.id = 'correct'
    } else {
      answerButton.id = 'incorrect'
    }
    answerContainer.appendChild(answerButton)
  }
}

function isAnswerCorrect(event) {
  let clickedButton = event.target.id
  let allButtons = document.getElementsByTagName('button')
  showNextButton()

  if (clickedButton === 'correct') {
    event.target.classList.replace('answer-button', 'answer-button-correct')
    score++
  } else {
    event.target.classList.replace('answer-button', 'answer-button-incorrect')
  }
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].setAttribute('disabled', '')
  }
}
