const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');
const colorBoxes = document.querySelectorAll('.color-box');
const newRoundBtn = document.querySelector('#newRoundBtn');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');
var easy = document.querySelectorAll('.easy');
var streakdisplay = document.querySelector('.streak');
var firstWinDisplay = document.querySelector('.first-win');
// var left = document.querySelector('.left');

var currentStreak = 0;
var bestStreak = 0;
var pickCorrectColor = 0;
var color = [];
var num = 6;
var originallives = 3;
var lives = originallives;

var player = document.querySelector(".name");
var username = window.prompt("Your Name");
player.textContent = username;

var heart = document.querySelector(".heart");
var heartsText = "❤️❤️❤️"
heart.textContent = heartsText;

function webLoad() { // to load the following functions whenever website is opened/refreshed
    onLoad();
    displayContent();
    colorGenerate();
    setGame();
}

function onLoad() {  //to load the previous data if any
    var temp = localStorage.getItem('highestBestStreak');
    if (temp != null) {
        bestStreak = parseInt(temp);  //js returns string so parseInt() is used to convert it to int
    }
    else {
        bestStreak = 0;
    }
}

function displayContent() {
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}

function colorGenerate() {
    var a = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var c = Math.floor(Math.random() * 256);
    return `rgb(${a}, ${b}, ${c})`;
}

function generateColor(num) {
    const arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(colorGenerate());
    }
    return arr;
}

function pickGenerator() {
    const index = Math.floor(Math.random() * color.length);
    return color[index];
}

function setGame() {
    color = generateColor(num);
    pickCorrectColor = pickGenerator();
    colorDisplay.textContent = pickCorrectColor;
    for (var i = 0; i < color.length; i++) {
        colorBoxes[i].style.backgroundColor = color[i];
    }
}

webLoad();

function heartsUpdate(lives) {
    heartsText = "";
    for (var i = 1; i <= lives; i++) {
        heartsText += "❤️";
    }
    heart.textContent = heartsText;
}


function winGuess(event) {
    var tempBox = event.target;
    if (lives > 0) {
        if (pickCorrectColor === tempBox.style.backgroundColor) {
            messageDisplay.textContent = "YOU WON!!!.";
            currentStreak++;
            currentStreakDisplay.textContent = currentStreak;
            webLoad();
            lives = originallives;
            heartsUpdate(lives);
            if (currentStreak > bestStreak) {
                bestStreakDisplay.textContent = currentStreak;
                localStorage.setItem('highestBestStreak', currentStreak);

                // 5. Header Text Becomes Bold on New Best Streak
                colorDisplay.style.fontWeight = 'bold';
                colorDisplay.style.color = 'red';
            }
            else {
                bestStreakDisplay.textContent = bestStreak;
                localStorage.setItem('highestBestStreak', bestStreak);
            }


            //-------------------------------- 2. "Streak!" Message When Streak ≥ 3..---------------------------
            if (currentStreak >= 3) {
                streakdisplay.innerHTML = "STREAK!!";
                streakdisplay.style.color = 'green';
                streakdisplay.style.fontSize = '3rem';
            }
            else {
                streakdisplay.innerHTML = "";
            }


            // --------------------------------4. Show "First Win!" on First Correct Answer---------------------
            if (currentStreak === 1) {
                firstWinDisplay.innerHTML = "First Win!";
                firstWinDisplay.style.color = 'green';
                firstWinDisplay.style.fontSize = '3rem';
                firstWinDisplay.style.fontStyle = 'italic';
                firstWinDisplay.style.fontWeight = 'bold';
            }
            else {
                firstWinDisplay.innerHTML = "";
            }




            //-------------------------------- 1. Correct Color Glows When Clicked....---------------------------
            tempBox.style.border = "7px solid black";
            setTimeout(() => {
                tempBox.style.border = "none";
            }, 700);

        }
        else {

            // ---------------------------6. Wrong Box Shakes When Clicked---------------------------------
            tempBox.classList.add('shake');

            messageDisplay.textContent = "TRY AGAIN!!";
            lives--;
        }
        heartsUpdate(lives);
    }

    if (lives === 0) {
        messageDisplay.textContent = "YOU HAVE LOST ALL YOUR LIVES";
        streakdisplay.innerHTML = "";
    }

}

colorBoxes.forEach((box) => {
    box.addEventListener('click', winGuess);
});

newRoundBtn.addEventListener('click', () => {
    webLoad();
    currentStreak = 0;
    currentStreakDisplay.textContent = currentStreak;
    lives = originallives;
    heartsUpdate(lives);
    messageDisplay.textContent = "Pick a color!";
    streakdisplay.innerHTML = "";
    firstWinDisplay.innerHTML = "";
})

resetStreakBtn.addEventListener('click', () => {
    localStorage.clear();
    bestStreak = 0;
    bestStreakDisplay.textContent = bestStreak;
    currentStreak = 0;
    currentStreakDisplay.textContent = currentStreak;
    messageDisplay.textContent = "Pick a color!";
    streakdisplay.innerHTML = "";
    firstWinDisplay.innerHTML = "";
})

easyBtn.addEventListener('click', () => {
    num = 3;
    originallives = 1;
    lives = originallives;
    heartsUpdate(lives);
    messageDisplay.textContent = "Pick a color!";
    webLoad();
    firstWinDisplay.innerHTML = "";

    // ------------------------------3. Easy Mode Button Turns Green When Selected---------------------------
    easyBtn.style.backgroundColor = 'lightgreen';

    easy.forEach((e) => {
        e.style.display = 'none';
    });
})

hardBtn.addEventListener('click', () => {
    num = 6;
    originallives = 3;
    lives = originallives;
    heartsUpdate(lives);
    webLoad();
    firstWinDisplay.innerHTML = "";

    easyBtn.style.backgroundColor = '#454748';

    messageDisplay.textContent = "Pick a color!";
    easy.forEach((e) => {
        e.style.display = 'block';
    });
})