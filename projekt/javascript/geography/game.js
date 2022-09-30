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
        question: 'Melyik állat úszik a legmélyebbre az óceánban?',
        choice1: 'cetcápa',
        choice2: 'Cuvier-féle csőröscet',
        choice3: 'nagy fehércápa',
        choice4: 'macskacápa',
        answer: 2,
    },
    {
        question: 'Melyik állat ujjlenyomata hasonlít az emberéhez a legjobban?',
        choice1: 'koala',
        choice2: 'óriáspanda',
        choice3: 'csimpánz',
        choice4: 'orángután',
        answer: 1,
    },
    {
        question: 'Melyik a leggyorsabban úszó élőlény?',
        choice1: 'delfin',
        choice2: 'pörölyfejű cápa',
        choice3: 'fóka',
        choice4: 'vitorláshal',
        answer: 4,
    },
    {
        question: 'Hány éves volt Jonathan, az óriásteknős?',
        choice1: '92',
        choice2: '187',
        choice3: '18',
        choice4: '126',
        answer: 2,
    },
    {
        question: 'Melyik a világ legerősebb élőlénye testméretéhez képest',
        choice1: 'hangya',
        choice2: 'oroszlán',
        choice3: 'orrszarvúbogár',
        choice4: 'gorilla ',
        answer: 1,
    },
    {
        question: 'Melyik állatnak hallható a hangja még 850kmről is?',
        choice1: 'kékbálna',
        choice2: 'bőgőmajom',
        choice3: 'hiéna',
        choice4: 'elefántbikáknak a bőgése',
        answer: 1,
    },
    {
        question: 'A lapos-, szabálytalan és rövid csontokban, valamint a hosszú csöves csontok végeiben melyik csontvelő található?',
        choice1: 'vörös csontvelő',
        choice2: 'sárga csontvelő',
        choice3: 'a kettő ugyanott helyezkedik el',
        choice4: 'egyiksem ',
        answer: 1,
    },
    {
        question: 'Melyek az immunrendszer sejtes elemei?',
        choice1: 'fehérvérsejtek',
        choice2: 'vörösvérsejtek',
        choice3: 'mindkettő',
        choice4: 'egyiksem ',
        answer: 1,
    },
    {
        question: 'Az agy melyik része felel a figyelésért, gondolkozásért?',
        choice1: 'halántéktáji lebeny',
        choice2: 'homloktáji lebeny',
        choice3: 'tarkótáji lebeny',
        choice4: 'egyiksem ',
        answer: 2,
    },
    {
        question: 'Hány lebenyből állnak összesen a tüdők?',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5 ',
        answer: 4,
    },
    {
        question: 'Mekkora a vér áramlási sebessége az aortákban?',
        choice1: '30-50cm/mp',
        choice2: '15-20/mp',
        choice3: '30-50cm/p',
        choice4: '5-10cm/mp ',
        answer: 1,
    },
    {
        question: 'Hány kromoszómapár található az ember testi sejtjeiben?',
        choice1: '22',
        choice2: '20',
        choice3: '21',
        choice4: '23 ',
        answer: 4,
    },
    {
        question: 'Mi történik a nagyerekkel a szívlökés során?',
        choice1: 'összehúzódnak',
        choice2: 'kitágulnak',
        choice3: 'megszűnnek létezni',
        choice4: 'elzárulnak ',
        answer: 2,
    },
    {
        question: 'Hány kötőszövete van az emberi szemnek?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 3,
    },
    {
        question: 'Az a folyamat, melyben az oldószer két, féligáteresztő membránnal elválasztott, különböző koncentrációjú oldat között áramlik.',
        choice1: 'redukció',
        choice2: 'ozmózis',
        choice3: 'diffúzió',
        choice4: 'katarzis',
        answer: 2,
    },
    {
        question: 'Mindenhol előforduló prokarióta mikoorganizmusok változatos csoportja, mindegyik tagja egyetlen olyan sejtből áll, melyben hiányzik a sejtmaghártya és a sejtfal sajátos összetételű.',
        choice1: 'bakteriofág',
        choice2: 'baktérium',
        choice3: 'parazita',
        choice4: 'vírus',
        answer: 1,
    },
    {
        question: 'Összetett szénhidrát, szőlőcukorból felépülő poliszacharid, mely a növények sejtfalának legnagyobb részét teszi ki. Egyike a természetben leggyakrabban előforduló szerves anyagoknak.',
        choice1: 'cellulóz',
        choice2: 'szacharóz',
        choice3: 'amilopektin',
        choice4: 'kockacukor',
        answer: 1,
    },
    {
        question: 'Két vagy több különböző faj egyedeinek szoros együttélése, melyben mindkét fél előnyökhöz jut.',
        choice1: 'altruizmus',
        choice2: 'kommenzalizmus',
        choice3: 'kapitalizmus',
        choice4: 'szimbiózis',
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
        return window.location.assign('/html/end.html')
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