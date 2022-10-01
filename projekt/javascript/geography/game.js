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
//kérdések
let questions = [
    {
        question: 'Hány amerikai állammal határos a Mississippi?',
        choice1: '12',
        choice2: '10',
        choice3: '13',
        choice4: '11',
        answer: 2,
    },
    {
        question: 'Melyik sziget nem a Karib-tengeren található?',
        choice1: 'Kajmán-szigetek',
        choice2: 'Galapagos-szigetek',
        choice3: 'Jamaica',
        choice4: 'Barbados',
        answer: 1,
    },
    {
        question: 'Melyik a legmagasabban fekvő tó?',
        choice1: 'Bajkál-tó ',
        choice2: 'Gurudogmar-tó',
        choice3: 'Tso Lahmo-tó',
        choice4: 'Titicaca-tó',
        answer: 4,
    },
    {
        question: 'Melyik a világ leghosszabb folyója?',
        choice1: 'Jangce',
        choice2: 'Amazonas',
        choice3: 'Nílus',
        choice4: 'Duna',
        answer: 2,
    },
    {
        question: 'Melyik országot NEM érinti a Tisza?',
        choice1: 'Ukrajna',
        choice2: 'Horvátország',
        choice3: 'Szerbia',
        choice4: 'Magyarország ',
        answer: 2,
    },
    {
        question: 'A föld területének hány százalékát borítja óceán?',
        choice1: '60',
        choice2: '45',
        choice3: '70',
        choice4: '80',
        answer: 3,
    },
    {
        question: 'Hol található a Mariana-árok?',
        choice1: 'Csendes-óceáns',
        choice2: 'Indiai-óceán',
        choice3: 'Atlanti-óceán',
        choice4: 'Bering-tenger',
        answer: 1,
    },
    {
        question: 'Hol található a Bajkál-tó?',
        choice1: 'Mongólia',
        choice2: 'Kazahsztán',
        choice3: 'Oroszország',
        choice4: 'Tádzsikisztán ',
        answer: 3,
    },
    {
        question: 'Melyik tenger tó valójában?',
        choice1: 'Arab-tenger',
        choice2: 'Adriai-tenger',
        choice3: 'Fekete-tenger',
        choice4: 'Kaszpi-tenger',
        answer: 4,
    },
    {
        question: 'Melyik országban található a világ legmagasabb vízesése, az Angel?',
        choice1: 'Peru',
        choice2: 'Brazília',
        choice3: 'Ecuador',
        choice4: 'Venezuela ',
        answer: 4,
    },
    {
        question: 'Mi a hivatalos nyelv Brazíliában?',
        choice1: 'Portugál',
        choice2: 'Spanyol',
        choice3: 'Olasz',
        choice4: 'Argentín',
        answer: 1,
    },
    {
        question: 'Mi a hivatalos nyelv a Bahama-szigeteken?',
        choice1: 'Portugál',
        choice2: 'Francia',
        choice3: 'Spanyol',
        choice4: 'Angol ',
        answer: 4,
    },
    {
        question: 'Melyik NEM hivatalos nyelv Svájcban?',
        choice1: 'Francia',
        choice2: 'Angol',
        choice3: 'Olasz',
        choice4: 'Német ',
        answer: 2,
    },
    {
        question: 'Melyik nyelvet beszélik a legtöbben a világon népesség szerint?',
        choice1: 'Hindi',
        choice2: 'Spanyol',
        choice3: 'Kínai',
        choice4: 'Angol',
        answer: 3,
    },
    {
        question: 'Fővárosa Iraknak:',
        choice1: 'Baku',
        choice2: 'Bagdad',
        choice3: 'Damaszkusz',
        choice4: 'Rijad',
        answer: 2,
    },
    {
        question: 'Fővárosa Litvániának:',
        choice1: 'Vilnius',
        choice2: 'Tallinn',
        choice3: 'Riga',
        choice4: 'Oslo',
        answer: 1,
    },
    {
        question: 'Fővárosa Izlandnak:',
        choice1: 'Riga',
        choice2: 'Oslo',
        choice3: 'Reykjavik',
        choice4: 'Groningen',
        answer: 3,
    },
    {
        question: 'Fővárosa Ghánának:',
        choice1: 'Jaoundé',
        choice2: 'Lagos',
        choice3: 'Dakar',
        choice4: 'Accra',
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5 //ennyi kérdés lehet max
startGame = () => {
    questionCounter = 0
    score = 0
    avaibleQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if (avaibleQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) /*Ha eléri a max kérdést akkor átdob az end.html-re*/ {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/html/geography/end.html')
    }
    /*egyébb esetben*/
    questionCounter++ //ezzel számoljuk hanyadik kérdésnél járunk
    progressText.innerText = `${questionCounter} / ${MAX_QUESTIONS}` //kiírjuk hogy mennyiből hanyadik kérdésnél járunk 
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%` //a progressbar töltöttségét számoljuk ki és változtatjuk
    const questionsIndex = Math.floor(Math.random() * avaibleQuestions.length) //random kérdés
    console.log(avaibleQuestions)

    currentQuestion = avaibleQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    avaibleQuestions.splice(questionsIndex, 1)//A már szerepelt kérdések eltávolítása
    acceptingAnswers = true
}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

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
        }, 700)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score

}
startGame()