
let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let highestScore = 0;

let h2 = document.querySelector('h2');

let btns = ["yellow", "red", "purple", "green"];

// Start the game on key press
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

// Flash effect for game sequence
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Level up function
function levelUp() {
    userSeq = [];
    level++;
    if (level > highestScore) {
        highestScore = level;
    }
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Fixed the issue (should be 4, not 3)
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

// Flash effect for user click
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

// Check the user input sequence
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over 😟!<br> Your score was <b>${level}</b> <br> Press any key to start.<br> Highest Score ${highestScore}👑`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

// Button press event
function btnPress(event) {
    let btn = event.target; // Correctly getting the clicked button
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Adding event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {  // Fixed missing 'let' in loop
    btn.addEventListener("click", btnPress);
}

// Reset function
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
