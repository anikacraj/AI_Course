'use client';

import { useState } from 'react';
import { motion } from 'framer-motion'; // optional for animations

const choices = ['Rock', 'Paper', 'Scissors'];

const getWinningMove = (move) => {
  switch (move) {
    case 'Rock': return 'Paper';
    case 'Paper': return 'Scissors';
    case 'Scissors': return 'Rock';
    default: return 'Rock';
  }
};

const predictNextMove = (history) => {
  if (history.length === 0) return choices[Math.floor(Math.random() * 3)];
  const freq = { Rock: 0, Paper: 0, Scissors: 0 };
  history.forEach(move => freq[move]++);
  const mostFrequent = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
  return getWinningMove(mostFrequent);
};

export default function RockPaperScissorsAI() {
  const [playerHistory, setPlayerHistory] = useState([]);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [aiChoice, setAiChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [finalWinner, setFinalWinner] = useState('');

  const play = (choice) => {
    if (gameOver) return;
    const newHistory = [...playerHistory, choice];
    const aiMove = predictNextMove(newHistory);
    setPlayerChoice(choice);
    setAiChoice(aiMove);
    setPlayerHistory(newHistory);

    let roundResult = '';
    let newScore = { ...score };

    if (choice === aiMove) {
      roundResult = "It's a draw!";
    } else if (
      (choice === 'Rock' && aiMove === 'Scissors') ||
      (choice === 'Paper' && aiMove === 'Rock') ||
      (choice === 'Scissors' && aiMove === 'Paper')
    ) {
      roundResult = 'You win!';
      newScore.player += 1;
    } else {
      roundResult = 'AI wins!';
      newScore.ai += 1;
    }

    setResult(roundResult);
    setScore(newScore);
    setRound(round + 1);

    if (newScore.player === 2 || newScore.ai === 2) {
      setGameOver(true);
      setFinalWinner(newScore.player === 2 ? '🎉 You won the match!' : '🤖 AI won the match!');
    }
  };

  const resetGame = () => {
    setPlayerHistory([]);
    setPlayerChoice(null);
    setAiChoice(null);
    setResult('');
    setScore({ player: 0, ai: 0 });
    setRound(1);
    setGameOver(false);
    setFinalWinner('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-400 tracking-tight">
        🧠 Rock Paper Scissors AI
      </h1>

      <p className="mb-4 text-xl font-medium">🎯 Round {round} / Best of 3</p>

      <div className="flex gap-4 mb-8">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => play(choice)}
            disabled={gameOver}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition disabled:opacity-50"
          >
            {choice}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4 text-center">
        <div className="bg-gray-800 p-4 rounded-lg w-40">
          <p className="text-sm text-gray-400">Your Choice</p>
          <p className="text-2xl">{playerChoice || '-'}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg w-40">
          <p className="text-sm text-gray-400">AI Choice</p>
          <p className="text-2xl">{aiChoice || '-'}</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={result}
        className="text-2xl font-semibold text-yellow-300 mb-6"
      >
        {result}
      </motion.div>

      <div className="bg-gray-700 rounded-xl p-6 w-72 text-center shadow-md mb-4">
        <div className="text-lg font-bold mb-2">🏆 Score</div>
        <p>👤 Player: {score.player}</p>
        <p>🤖 AI: {score.ai}</p>
      </div>

      {gameOver && (
        <div className="text-center mt-4">
          <h2 className="text-3xl font-bold text-green-400 mb-3">{finalWinner}</h2>
          <button
            onClick={resetGame}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg shadow-md transform hover:scale-105 transition"
          >
            🔁 Play Again
          </button>
        </div>
      )}
    </div>
  );
}
