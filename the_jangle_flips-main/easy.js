const images = [
    'pic1.jpeg', 'pic1.jpeg',
    'pic2.jpeg', 'pic2.jpeg',
    'pic3.jpeg', 'pic3.jpeg',
    'pic4.jpeg', 'pic4.jpeg',
    'pic5.jpeg', 'pic5.jpeg',
    'pic6.jpeg', 'pic6.jpeg',
];

let flippedCards = [];
let matchedCards = [];
let moveCounter = 0;
let timer;
let timeLimit = 60;
let count = 0;

const gameBoard = document.getElementById('game-board');
const moveCounterElement = document.getElementById('move-counter');
const timeRemainingElement = document.getElementById('time-remaining');
const restartButton = document.getElementById('restart-button');
const scoreElement = document.getElementById('score-counter');

// Add sound effect files
const matchSound = new Audio('match.mp3'); // Replace with the path to your match sound file
const noMatchSound = new Audio('noMatch.mp3'); // Replace with the path to your no-match sound file
const touchSound = new Audio('touch.mp3'); // Replace with the path to your touch sound file
const winSound = new Audio('win.mp3'); // Replace with the path to your win sound file


// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create the card elements
function createBoard() {
    const shuffledImages = shuffle(images);
    for (let i = 0; i < shuffledImages.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = shuffledImages[i];

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerHtml = '<img src="main-pic.jpeg" alt="Card Front Image">'; // Placeholder content, can be an image or design

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const img = document.createElement('img');
        img.src = shuffledImages[i];
        img.alt = 'Memory Card';
        cardBack.appendChild(img);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        gameBoard.appendChild(card);

        card.addEventListener('click', flipCard);
    }
    startTimer(); //start the timer when the board is created
}

// start the timer

function startTimer() {
    let timeLeft = timeLimit;
    updateTimerDisplay(timeLeft);
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

// Update the timer display
function updateTimerDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const secondes = (timeLeft / 60).toFixed(2);
    timeRemainingElement.textContent = `Time Remaining: ${secondes < 10 ? '0' : ""}${secondes}`;
}

// Handle Time Out

function handleTimeOut() {
    const choice = confirm(`Time's up!  Do you want to try again?`);
    if (choice) {
        restartGame();
    } else {
        alert(`Game Over`);
        gameBoard.innerHTML = ''; // clear the game board
    }
}+


// Flip the card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        touchSound.play(); // play touch sound
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moveCounter++;
            moveCounterElement.textContent = moveCounter;

            const [firstCard, secondCard] = flippedCards;

            if (firstCard.dataset.image === secondCard.dataset.image) {
                matchedCards.push(firstCard, secondCard);
                count ++;
                scoreElement.textContent = count;
                matchSound.play(); // Play match sound
                flippedCards = [];

                if (matchedCards.length === images.length) {
                    clearInterval(timer);
                    setTimeout(() => showPopup(count), 500);
                }
            } else {
                noMatchSound.play(); // Play no-match sound
                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    flippedCards = [];
                }, 1000);
            }
        }
    }
}

// Restart the game
function restartGame() {
    clearInterval(timer); // New: Clear the timer when restarting
    gameBoard.innerHTML = '';
    moveCounter = 0;
    moveCounterElement.textContent = moveCounter;
    flippedCards = [];
    matchedCards = [];
    createBoard();
}

restartButton.addEventListener('click', restartGame);

// Initialize the game board
createBoard();

// Function to show popup
function showPopup(score) {
    document.getElementById('popupMessage').innerText = 'Congratulations! Your score is: ' + score;
    document.getElementById('popupOverlay').style.display = 'block';
    document.getElementById('popupBox').style.display = 'block';
    winSound.play(); // win sound effect
    showFireworks();
}

// Function to close popup
function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('popupBox').style.display = 'none';
    restartGame();
}

// Function to show fireworks
function showFireworks() {
    const container = document.getElementById('fireworksContainer');
    for (let i = 0; i < 10; i++) {
        createFirework(container);
    }
}

function createFirework(container) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    firework.style.left = `${x}%`;
    firework.style.top = `${y}%`;
    container.appendChild(firework);
    setTimeout(() => {
        container.removeChild(firework);
    }, 1000);
}

// Home page link
document.getElementById('home-button').addEventListener('click', () => {
    window.location.href = "index.html";
});  

// For one step back
document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = "secondPage.html";
});  

// add sound effect

// document.addEventListener('DOMContentLoaded', () => {
//     const backgroundMusic = document.getElementById('background-music');

//     if (localStorage.getItem('isPlaying') === 'true') {
//         backgroundMusic.play().catch(() => {
//             // Ignore errors
//         });
//     }

//     // Add your game logic here

//     // Game over logic
//     // Example:
//     // document.getElementById('game-over').addEventListener('click', () => {
//     //     localStorage.setItem('isPlaying', 'false');
//     // });
// });



