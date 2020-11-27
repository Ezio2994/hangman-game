const instructions = document.querySelector('.instructions')
const closeInstructions = document.querySelector('.instructions button')
const topic = document.querySelector('h1 span')
const letters = document.querySelectorAll('article p')
const lettersButtons = document.querySelectorAll('.bottom button')
const hanged = document.querySelector('#imageContainer')
const enterWord = document.querySelector('input')
const checkAnswerButton = document.querySelector('.center button')
const scoreDisplay = document.querySelectorAll('h2 span')
const gameOverSection = document.querySelector('.gameOver')
const playAgain = document.querySelector('.gameOver button')

const words = ['GIRAFFE', 'TIGER', 'EAGLE', 'HIPPOPOTAMUS', 'PYTHON', 'ROCKY', 'BRAVEHEART', 'HARRY POTTER', 'TITANIC', 'THE GODFATHER', 'LONDON', 'MILAN', 'SAN FRANCISCO', 'TOKYO', 'NEW YORK CITY', 'FISH AND CHIPS', 'LASAGNA', 'SUSHI', 'ENGLISH BREAKFAST', 'BANANA BREAD', 'SWIMMING', 'VOLLEYBALL', 'RUGBY', 'FOOTBALL', 'FIELD HOCKEY' ];
let currentWord = '';
let usedWord = [];
let lettersCounter = 0;
let stage = 0;
let rightWord = 0;
let totalLetters = 0;
let totalScore = 0;

closeInstructions.addEventListener('click', () => {
    instructions.style.display = 'none'
})


const chooseWords = () => {
    hanged.innerHTML = `<img src="./imgs/hanged0.png" alt="">`
    lettersCounter = 0;
    stage = 0;
    rightWord = 0;
    totalLetters = 0;
    lettersButtons.forEach(button => button.style.visibility = 'visible')

    let random = Math.floor(Math.random() * 25);
    if (random <= 4) {
        topic.innerHTML = 'Animals'
    } else if (random <= 9) {
        topic.innerHTML = 'Movies'
    } else if (random <= 14) {
        topic.innerHTML = 'Cities'
    } else if (random <= 19) {
        topic.innerHTML = 'Food'
    } else if (random <= 24) {
        topic.innerHTML = 'SPORT'
    }
    currentWord = words[random]
    checkWords()    
}

const checkWords = () => {
    if(usedWord.includes(currentWord)) {
        currentWord = ''
        chooseWords()
    } else {
        usedWord.push(currentWord)
        generateWord()
    }
}

const generateWord = () => {
    for (let index = 0; index < currentWord.length; index++) {
        if (currentWord[index] !== ' ') {
            letters[index].innerHTML = "_"
            letters[index].style.visibility = 'visible'
        } else if (currentWord[index] === ' ') {
            letters[index].innerHTML = "_"
            rightWord++
        }
    }
}

lettersButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentWord !== '' && checkAnswerButton.innerHTML === 'Check answer!') {
            for (let index = 0; index < currentWord.length; index++) {
                if (button.innerHTML === currentWord[index]) {
                    letters[index].innerHTML = button.innerHTML;
                    lettersCounter++
                    rightWord++
                    totalLetters ++
                }
            } checkMissingLetters()
            button.style.visibility = 'hidden'
        }
    })
})

checkMissingLetters = () => {
    if (lettersCounter === 0) {
        stage ++
        hanged.innerHTML = `<img src="./imgs/hanged${stage}.png" alt="">`
    }
    if (stage === 6) {
        gameOverSection.style.display = 'block'
    }
    lettersCounter = 0
    guessedWord()
}

const guessedWord = () => {
    if (rightWord === currentWord.length) {
        totalScore += 5;
        scoreDisplay.forEach(score => score.innerHTML = totalScore)
        checkAnswerButton.innerHTML = 'Next Word!'
    }
}

checkAnswerButton.addEventListener('click', () => {
    if (enterWord.value.toUpperCase() === currentWord || rightWord === currentWord.length) {
        if (checkAnswerButton.innerHTML === 'Check answer!') {
            for (let index = 0; index < currentWord.length; index++) {
                letters[index].innerHTML = currentWord[index];
            }

            if (currentWord.length / 2 > totalLetters ) {
                totalScore += 10;
            } else {
                totalScore += 5;
            }
            console.log(currentWord.length / 2);
            console.log(totalLetters);

            checkAnswerButton.innerHTML = 'Next Word!'
            enterWord.style.visibility = 'hidden'

        } else if (checkAnswerButton.innerHTML === 'Next Word!') {
            letters.forEach(letter => letter.style.visibility = 'hidden')
            enterWord.value = ''
            chooseWords()
            checkAnswerButton.innerHTML = 'Check answer!'
            enterWord.style.visibility = 'visible'
        }
    } else {
        gameOverSection.style.display = 'block'
    } scoreDisplay.forEach(score => score.innerHTML = totalScore)
})

playAgain.addEventListener('click', () => {
    currentWord = '';
    usedWord = [];
    totalScore = 0;
    enterWord.value = ''
    gameOverSection.style.display = 'none'
    scoreDisplay.forEach(score => score.innerHTML = totalScore)
    lettersButtons.forEach(button => button.style.visibility = 'visible')
    letters.forEach(letter => letter.style.visibility = 'hidden')
    hanged.innerHTML = `<img src="./imgs/hanged0.png" alt="">`
    chooseWords()
})

chooseWords()