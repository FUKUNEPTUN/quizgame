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
        question: 'Melyik frekvenciát használják a Bluetooth eszközök?',
        choice1: '900GHz',
        choice2: '2.4GHz',
        choice3: '24GHz',
        choice4: '90Ghz',
        answer: 2,
    },
    {
        question: 'Egy olyan számítógépet kell összeállítani, amelyet alapvetően számítógépes játékokhoz fognak használni. A grafikus kártya kiválasztásánál mely szempontokat kell leginkább figyelembe venni?',
        choice1: 'Videokártyához tartozó memória méretet, mert legalább 6 GB kell',
        choice2: 'A videókártya memóriájának típusát',
        choice3: 'A grafikus processzor sebességét',
        choice4: 'Márkáját',
        answer: 3,
    },
    {
        question: 'Melyik kifejezés nem kapcsolható közvetlenül a relációs adatbázisokhoz?',
        choice1: 'Auto increment',
        choice2: 'Redudancia',
        choice3: 'Primary key',
        choice4: 'Enclapsulation',
        answer: 4,
    },
    {
        question: 'Az alábbiak közül mely alkotások tartoznak a szerzői jogi védelem alá??',
        choice1: 'Napi hírek',
        choice2: 'Zeneművek, szöveggel vagy anélkül',
        choice3: 'Jogszabályok',
        choice4: 'Mindhárom helyes',
        answer: 2,
    },
    {
        question: 'Az alábbiak közül melyik csatoló NEM alkalmas merevlemez csatlakoztatására?',
        choice1: 'PATA',
        choice2: 'USB',
        choice3: 'AGP',
        choice4: 'SATA',
        answer: 3,
    },
    {
        question: 'Az alábbi állítások közül döntse el, hogy melyik igaz fixpontos számábrázolásra!',
        choice1: 'A számokat eljőjel, karakterisztika és mantisza segítségével adjuk meg',
        choice2: 'Csak egész szamokat tudunk ábrázolni ezzel a módszerrel',
        choice3: 'Számjegyek száma és a tizedesvessző helye rögzített',
        choice4: 'Az összes állítás hamis',
        answer: 3,
    },
    {
        question: 'Az alábbiak közül melyik az a fájltípus, amelynél nem alkalmazhatunk veszteséges tömörítést?',
        choice1: 'Futttatható állományok',
        choice2: 'Video',
        choice3: 'Kép',
        choice4: 'Audió ',
        answer: 1,
    },
    {
        question: 'Az alábbiak közül melyik NEM az operációs rendszer alapvető feladata?',
        choice1: 'Programfejlesztési felület biztosítása szoftverek kezeléséhez',
        choice2: 'A hardverekhez való hozzáférés vezérlése',
        choice3: 'A fájlok és könyvtárák kezelése',
        choice4: 'egyiksem ',
        answer: 1,
    },
    {
        question: 'Az alábbi alkalmazási rétegbeli protokollok közül melyik NEM tekinthető biztonságosnak?',
        choice1: 'HTTPS',
        choice2: 'Telnet',
        choice3: 'Telnet',
        choice4: 'egyiksem ',
        answer: 2,
    },
    {
        question: 'A felsoroltak közül melyik alkalmas algoritmusok leírásához?',
        choice1: 'Oszlop-diagram',
        choice2: 'Szelekció',
        choice3: 'Venn-diagram',
        choice4: 'Stuktogram ',
        answer: 4,
    },
    {
        question: 'Az alábbiak közül melyik NEM számít különleges adatnak az adatvédelmi törvény szerint?',
        choice1: 'Lakcímre vontakozó adat',
        choice2: 'Bűnügyi személyes adat',
        choice3: 'Faji eredetre vonatkozó adat',
        choice4: 'A nemi életre vagy a nemi irányultságra vonatkozó személyes adatok',
        answer: 1,
    },
    {
        question: 'Az alábbi felsorolásban melyik nem tekinthető erősen típusos nyelvnek?',
        choice1: 'C++',
        choice2: 'Java',
        choice3: 'C#',
        choice4: 'JavaScript ',
        answer: 4,
    },
    {
        question: 'A felhasználó állományainak leghatékonyabb védelme érdekében melyik fájlrendszert érdemes használni az alábbiak közül?',
        choice1: 'DOS',
        choice2: 'NTFS',
        choice3: 'FAT',
        choice4: 'NAS',
        answer: 2,
    },
    {
        question: 'Milyen merevlemez karbantartó műveletet érdemes elvégezni azon a számítógépen, amelyet huzamosabb ideje használnak?',
        choice1: 'vírusírtás',
        choice2: 'lemezformálás',
        choice3: 'töredezettségmentesítés',
        choice4: 'fizikai szennyeződésktől megtisztítás',
        answer: 3,
    },
    {
        question: 'Az alábbi fájltípusok közül melyeknél alkalmaznak veszteségmentes tömörítést?',
        choice1: 'jpg',
        choice2: 'png',
        choice3: 'mp3',
        choice4: 'mp4',
        answer: 2,
    },
    {
        question: 'Számítógépén azt tapasztalja, hogy hangosabb lett, lassabban futtatja a programokat. Melyik alkatrész meghibásodására kell gyanakodnia?',
        choice1: 'processzor hűtő',
        choice2: 'merevlemez',
        choice3: 'videókártya hűtő',
        choice4: 'Táp',
        answer: 1,
    },
    {
        question: 'Hálózati nyomtatás esetén melyik paraméter határozza meg a leginkább nyomtatás gyorsaságát?',
        choice1: 'Megfelelő mennyiségű RAM a nyomtatóban',
        choice2: 'Megfelelően beállított tűzfal',
        choice3: 'nyomtatószerver típusa',
        choice4: 'nyomtatópatron típusa',
        answer: 1,
    },
    {
        question: 'Minek a rövidítése a gif?',
        choice1: 'Graphics Intelligent Format',
        choice2: 'Graphics Internet Format',
        choice3: 'Graphics Integrated Format',
        choice4: 'Graphics Interchange Format',
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
        return window.location.assign('/html/it/end.html')
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