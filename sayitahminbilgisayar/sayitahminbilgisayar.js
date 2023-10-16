let lowerBound = 1;
let upperBound = 100;
let computerGuess = Math.floor((lowerBound + upperBound) / 2);
let attemptCount = 1;

document.getElementById("computerGuess").textContent = computerGuess.toString();

function isHigher() {
    if (computerGuess >= 100) {
        document.getElementById("feedback").innerText = "Neden 1-100 arası sayı tutmadın!";
        return;
    }
    lowerBound = computerGuess + 1;
    attemptCount++;
    updateGuess();
}

function isLower() {
    if (computerGuess <= 1) {
        document.getElementById("feedback").innerText = "Neden 1-100 arası sayı tutmadın!";
        return;
    }
    upperBound = computerGuess - 1;
    attemptCount++;
    updateGuess();
}

function isCorrect() {
    document.getElementById("feedback").innerText = ` ${attemptCount}. denememde doğru buldum. Bence gayet iyiydim ne dersin?`;
}

function updateGuess() {
    computerGuess = Math.floor((lowerBound + upperBound) / 2);
    document.getElementById("computerGuess").textContent = computerGuess.toString();
}
