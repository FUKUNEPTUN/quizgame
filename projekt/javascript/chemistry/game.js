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
        question: 'Melyik ENDOTERM folyamat az alábbiak közül?',
        choice1: 'a mészégetés folyamata',
        choice2: 'kén oxigénnel való egyesülése',
        choice3: 'az ammónia elemekből történő szintézise',
        choice4: 'egyik sem',
        answer: 1,
    },
    {
        question: 'Melyik állítás NEM IGAZ a halogénekre?',
        choice1: 'Vegyületeikben oxidációs számuk mindig –1.',
        choice2: 'A csoporton belül fentről lefelé nő az atomok mérete.',
        choice3: 'A csoporton belül lefelé csökken az elektronegativitásuk.',
        choice4: 'Az összes igaz',
        answer: 1,
    },
    {
        question: 'A következő vegyületek közül melyik tartalmazza a legtöbb heteroatomot (oxigén,nitrogén)?',
        choice1: 'karbolsac',
        choice2: 'glicin',
        choice3: 'purin',
        choice4: 'nincs különbség',
        answer: 3,
    },
    {
        question: 'Melyik az a sor, amelyben az alapállapotú atomok nem azonos számú párosítatlan elektront tartalmaznak?',
        choice1: 'Au , Fe, S',
        choice2: 'Ne, Mg, Zn',
        choice3: 'C, O, S',
        choice4: 'N, Al, P',
        answer: 4,
    },
    {
        question: 'A fémek reakcióira vonatkozó állítások közül melyik IGAZ?',
        choice1: 'A higany vízzel érintkezve heves reakcióba lép vele.',
        choice2: 'A vasat híg és tömény salétromsavoldat is oldja.',
        choice3: 'A magnézium forró vízben oldódik.',
        choice4: 'Az ezüst tömény kénsavoldatban színtelen, szagtalan gáz fejlődése közben oldódik. ',
        answer: 3,
    },
    {
        question: 'Melyik kémiai elem vegyjele?: "F"',
        choice1: 'foszfor',
        choice2: 'fermium',
        choice3: 'flour',
        choice4: 'vas',
        answer: 3,
    },
    {
        question: 'Melyik kémiai elem vegyjele?: "Ag"',
        choice1: 'argon',
        choice2: 'ezüst',
        choice3: 'arany',
        choice4: 'alumínium ',
        answer: 2,
    },
    {
        question: 'Melyik kémiai elem vegyjele?: "H"',
        choice1: 'hélium',
        choice2: 'holmium',
        choice3: 'higany',
        choice4: 'hidrogén ',
        answer: 4,
    },
    {
        question: 'Melyik kémiai elem vegyjele?: "B"',
        choice1: 'bróm',
        choice2: 'bór',
        choice3: 'berillium',
        choice4: 'bárium ',
        answer: 2,
    },
    {
        question: 'Melyik kémiai elem vegyjele?: "Cr"',
        choice1: 'kobalt',
        choice2: 'kripton',
        choice3: 'klór',
        choice4: 'króm ',
        answer: 4,
    },
    {
        question: 'Melyik kémiai elem vegyjele?: "I"',
        choice1: 'jód',
        choice2: 'titán',
        choice3: 'ittrium',
        choice4: 'irídium',
        answer: 1,
    },
    {
        question: 'Melyik kémiai elem vegyjele?: "Se"',
        choice1: 'kén',
        choice2: 'szilícium',
        choice3: 'sziborgium',
        choice4: 'szelén ',
        answer: 4,
    },
    // {
    //     question: 'Mi az adszorpció?',
    //     choice1: 'Az a reakció, mely során a fémek felületéről kiinduló és a fémek belseje felé haladó kémiai vagy elektrokémiai változások során az adott fémfelület roncsolódik.',
    //     choice2: 'Olyan szerves kémiai reakció, amely során egy többszörös kötést tartalmazó vegyület molekulája melléktermék képződése nélkül egyesül egy másik anyag molekulájával.',
    //     choice3: 'Az a folyamat, amely során a szilárd anyagok a felületükön légnemű vagy oldott anyagokat kötnek meg.',
    //     choice4: 'Kölcsönös reakció mikor két anyag molekulája költsönhatásba lép egymásal és nagy mennyiségű hő keletkezik',
    //     answer: 3,
    // },
    {
        question: 'Melyik az egyetlen, szobahőmérsékleten is folyékony halmazállapotú fém?',
        choice1: 'cirkónium',
        choice2: 'cézium',
        choice3: 'higany',
        choice4: 'gallium',
        answer: 3,
    },
    {
        question: 'Az emberi testben hol található a legtöbb vas?',
        choice1: 'a májban',
        choice2: 'a vérben',
        choice3: 'a gyomorban',
        choice4: 'az agyban',
        answer: 2,
    },
    {
        question: 'Melyik az a halmazállapot-változás, amelyben a szilárd anyag gáz halmazállapotúvá válik folyékony állapot nélkül?',
        choice1: 'szublimáció',
        choice2: 'diffúzió',
        choice3: 'oxidáció',
        choice4: 'redukáció',
        answer: 1,
    },
    {
        question: 'Melyik az az egyetlen betű, amely nem szerepel a periódusos rendszerben?',
        choice1: 'J',
        choice2: 'U',
        choice3: 'X',
        choice4: 'Y',
        answer: 1,
    },
    {
        question: 'Mi a rendszáma a volfrámnak?',
        choice1: '72',
        choice2: '73',
        choice3: '19',
        choice4: '74',
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
        return window.location.assign('/html/chemistry/end.html')
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