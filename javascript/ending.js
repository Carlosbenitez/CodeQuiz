const name = document.getElementById('name');
const score = localStorage.getItem('mostRecentScore');



//to save highscores
saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        name: name.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
};