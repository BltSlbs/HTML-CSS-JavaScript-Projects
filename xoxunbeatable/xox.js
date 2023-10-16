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

function placeMark(cell, player) {
    cell.textContent = player;
    cell.classList.add('grow-shrink-animated');
    setTimeout(() => {
        cell.classList.remove('grow-shrink-animated');
    }, 300);
}

function checkWinner(board) {
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

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a].textContent && board[a].textContent === board[b].textContent && board[a].textContent === board[c].textContent) {
            return board[a].textContent;
        }
    }
    return null;
}

function isDraw(board) {
    return [...board].every(cell => cell.textContent === 'X' || cell.textContent === 'O');
}

function minimax(board, depth, isMaximizing) {
    const winner = checkWinner(board);

    if (winner !== null) {
        return winner === 'X' ? -10 + depth : 10 - depth;
    }

    if (isDraw(board)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        board.forEach((cell, idx) => {
            if (!cell.textContent) {
                cell.textContent = 'O';
                const score = minimax([...cells], depth + 1, false);
                cell.textContent = '';
                bestScore = Math.max(score, bestScore);
            }
        });
        return bestScore;
    } else {
        let bestScore = Infinity;
        board.forEach((cell, idx) => {
            if (!cell.textContent) {
                cell.textContent = 'X';
                const score = minimax([...cells], depth + 1, true);
                cell.textContent = '';
                bestScore = Math.min(score, bestScore);
            }
        });
        return bestScore;
    }
}

function computerMove() {
    let bestScore = -Infinity;
    let move;

    cells.forEach((cell, idx) => {
        if (!cell.textContent) {
            cell.textContent = 'O';
            const score = minimax([...cells], 0, false);
            cell.textContent = '';
            if (score > bestScore) {
                bestScore = score;
                move = cell;
            }
        }
    });

    placeMark(move, 'O');
    if (checkWinner([...cells]) === 'O') {
        endGame(false, 'O');
    } else if (isDraw([...cells])) { 
        endGame(true);
    }
}

function endGame(draw, winner) {
    if (draw) {
        messageDiv.textContent = 'Berabere!';
    } else {
        messageDiv.textContent = winner === 'X' ? 'Kazandın! Tekrar denemek ister misin?' : 'Ben kazandım! Tekrar deneyelim mi?';
    }
    restartBtn.style.display = 'inline-block';
}

function handleClick(event) {
    const cell = event.target;
    placeMark(cell, 'X');

    if (checkWinner([...cells]) === 'X') {
        endGame(false, 'X');
    } else if (isDraw([...cells])) { 
        endGame(true);
    } else {
        computerMove();
    }
}

restartBtn.addEventListener('click', startGame);
startGame();
