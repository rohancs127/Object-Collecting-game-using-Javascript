let character = document.getElementById("character");
let gameContainer = document.getElementById("game-container");
let scoreDisplay = document.getElementById("score");
let timeDisplay = document.getElementById("time");
let score = 0;
let gameInterval;
let timeLeft = 60;
let isGameRunning = false;

function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        score = 0;
        scoreDisplay.innerText = score;
        timeLeft = 60;
        timeDisplay.innerText= `1:00`;
        moveCharacter();
        gameInterval = setInterval(updateTime, 1000);
        setInterval(generateFallingObjects, 2000);
    }
}

function moveCharacter(event) {
    if (isGameRunning) {
        const containerWidth = gameContainer.offsetWidth;
        const characterWidth = character.offsetWidth;
        const characterX = character.offsetLeft;

        if (event && event.key === "ArrowLeft" && characterX > 0) {
            character.style.left = characterX - 10 + "px";
        } else if (event && event.key === "ArrowRight" && characterX + characterWidth < containerWidth) {
            character.style.left = characterX + 10 + "px";
        }
    }
}

function generateFallingObjects() {
    if (isGameRunning) {
        const object = document.createElement("div");
        object.className = "falling-object";
        object.style.left = Math.floor(Math.random() * (gameContainer.offsetWidth - 20)) + "px";
        gameContainer.appendChild(object);
        
        let top = 0;
        const objectInterval = setInterval(() => {
            if (top >= gameContainer.offsetHeight) {
                if (object.parentNode) {
                    object.parentNode.removeChild(object);
                }
                clearInterval(objectInterval);
            } else {
                top += 5;
                object.style.top = top + "px";
                checkCollision(object);
            }
        }, 20);
    }
}

function checkCollision(object) {
    const characterX = character.offsetLeft;
    const characterY = character.offsetTop;
    const objectX = object.offsetLeft;
    const objectY = object.offsetTop;

    if (characterX < objectX + 20 && characterX + 50 > objectX && characterY < objectY + 20 && characterY + 50 > objectY) {
        if (object.parentNode) {
            object.parentNode.removeChild(object);
        }
        score += 10;
        scoreDisplay.innerText = score;
    }
}

function updateTime() {
    timeLeft--;
    let timeCount = (timeLeft>9) ? timeLeft: '0'+timeLeft;
    timeDisplay.innerText = `0:${timeCount}`;
    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    alert("Game Over! Your score: " + score);
}

document.addEventListener("keydown", moveCharacter);