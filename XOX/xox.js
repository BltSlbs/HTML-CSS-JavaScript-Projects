const cells = document.querySelectorAll('[data-cell]');
const messageDiv = document.querySelector('[data-message]');
const restartBtn = document.getElementById('restartBtn');

function startGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    messageDiv.textContent = '';
    restartBtn.style.display = 'none';
}
function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
    cell.classList.add('grow-shrink-animated');
    setTimeout(() => {
        cell.classList.remove('grow-shrink-animated');
    }, 300);
    cell.removeEventListener('click', handleClick);
}
function computerMove() {
    const availableCells = [...cells].filter(cell => cell.textContent === '');
    if (availableCells.length > 0) {
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        placeMark(randomCell, 'O');
        if (checkWin('O')) {
            endGame(false, 'O');
        } else if (isDraw()) { 
            endGame(true);
        }
    }
}
function checkWin(currentClass) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}
function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}
function endGame(draw, winner) {
    if (draw) {
        messageDiv.textContent = 'Berabere!';
    } else if (winner === 'X') {
        messageDiv.textContent = 'Kazandın! Ben çok kötü oynadım galiba...';
    } else {
        messageDiv.textContent = 'Haha Ben Kazandım! Ezik, İstersen Tekrar Deneyelim.';
    }

    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
    
    restartBtn.style.display = 'inline-block';
}
function handleClick(event) {
    const cell = event.target;
    const currentClass = 'X';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false, 'X');
    } else if (isDraw()) { 
        endGame(true);
    } else {
        computerMove();
    }
}
restartBtn.addEventListener('click', startGame);
startGame();
