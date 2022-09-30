const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
highScoresList.innerHTML =
highScores.map(score=>{
    return`<li class="high-score" style="font-family: 'Bungee Spice', cursive;;font-size: 2.0rem; margin-bottom: 1.5rem;">${score.name} - ${score.score}</li>`
}).join('')
