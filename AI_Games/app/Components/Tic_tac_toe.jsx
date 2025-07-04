'use client';

import { useState, useEffect } from 'react';

const initialBoard = Array(9).fill(null);

const checkWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes(null) ? null : 'Draw';
};

const heuristic = (board) => {
  const winner = checkWinner(board);
  if (winner === 'O') return 10;
  if (winner === 'X') return -10;
  if (winner === 'Draw') return 0;
  return null;
};

const minimax = (board, depth, isMaximizing) => {
  const score = heuristic(board);
  if (score !== null) return score;

  const symbol = isMaximizing ? 'O' : 'X';
  let best = isMaximizing ? -Infinity : Infinity;

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = symbol;
      const evalScore = minimax(board, depth + 1, !isMaximizing);
      board[i] = null;
      best = isMaximizing
        ? Math.max(best, evalScore)
        : Math.min(best, evalScore);
    }
  }
  return best;
};

const findBestMove = (board) => {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = 'O';
      let moveVal = minimax(board, 0, false);
      board[i] = null;

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }

  return bestMove;
};

export default function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const result = checkWinner(board);
    if (result) setWinner(result);
    if (turn === 'O' && !result) {
      const bestMove = findBestMove([...board]);
      if (bestMove !== -1) {
        const newBoard = [...board];
        newBoard[bestMove] = 'O';
        setTimeout(() => {
          setBoard(newBoard);
          setTurn('X');
        }, 500);
      }
    }
  }, [turn, board]);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setTurn('O');
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setTurn('X');
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl font-extrabold text-blue-400 mb-6">🤖 Tic Tac Toe (AI)</h1>

      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 text-3xl font-bold bg-gray-800 rounded-xl shadow-md hover:bg-gray-700 transition-all duration-200 flex items-center justify-center hover:scale-105"
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-green-400 mb-2">
            {winner === 'Draw' ? "🤝 It's a Draw!" : `🏆 Winner: ${winner}`}
          </h2>
          <button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl mt-2 font-semibold transition hover:scale-105"
          >
            🔁 Play Again
          </button>
        </div>
      )}
    </div>
  );
}
