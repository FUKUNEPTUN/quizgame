const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScoreB')

const highScores = JSON.parse(localStorage.getItem('highScoresB'))|| []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore+ " "+"pont"
username.addEventListener('keyup',()=>{
    saveScoreBtn.disabled = !username.value
})
saveHighScore = e =>{

    e.preventDefault()
    const score ={
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score)
    highScores.sort((a,b) =>{
        return b.score - a.score
    } )
    highScores.splice(5)
    localStorage.setItem('highScoresB', JSON.stringify(highScores))
    window.location.assign('/html/biology/index.html')
}
