const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let avaibleQuestions = []
let questions = [
    {
        question: '1+1',
        choice1:'2',
        choice2:'4',
        choice3:'8',
        choice4:'16',
        answer:2,
    },
    {
        question: 'kérdés2',
        choice1:'2',
        choice2:'4',
        choice3:'8',
        choice4:'16',
        answer:2,
    },
    {
        question: 'kérdés3',
        choice1:'2',
        choice2:'4',
        choice3:'8',
        choice4:'16',
        answer:2,
    },
    {
        question: 'kérdés4',
        choice1:'2',
        choice2:'4',
        choice3:'8',
        choice4:'16',
        answer:2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4
startGame = () =>{
    questionCounter = 0
    score = 0
    avaibleQuestions =[...questions]
    getNewQuestion()
}
getNewQuestion =()=>{
    if (avaibleQuestions.length == 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)
        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width
}
