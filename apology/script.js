const cells = document.querySelectorAll('.cell');
let turn = 'X';
let board = Array(9).fill('');
const statusDiv = document.getElementById('game-status');
const resetBtn = document.getElementById('reset');

function checkWinner(b, t) {
    const win = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return win.some((pattern) => pattern.every(idx => b[idx] === t));
}

function boardFull(b) {
    return b.every(cell => cell !== '');
}

function handleClick(e, idx) {
    if (board[idx] !== '' || statusDiv.textContent.includes('wins')) return;
    board[idx] = turn;
    e.target.textContent = turn;
    if (checkWinner(board, turn)) {
        statusDiv.textContent = `Player ${turn} wins!`;
    } else if (boardFull(board)) {
        statusDiv.textContent = "It's a draw!";
    } else {
        turn = turn === 'X' ? 'O' : 'X';
        statusDiv.textContent = `Player ${turn}'s turn`;
    }
}

cells.forEach((cell, idx) => {
    cell.addEventListener('click', (e) => handleClick(e, idx));
});

resetBtn.onclick = () => {
    board = Array(9).fill('');
    cells.forEach(cell => cell.textContent = '');
    turn = 'X';
    statusDiv.textContent = `Player X's turn`;
};

// Initialize
statusDiv.textContent = `Player X's turn`;
