'use client';

import React from 'react';
import Link from 'next/link';

export default function GameMenu() {
  const games = [
    { name: '♟️ Play Chess', href: '/Chess' },
    { name: '✊🖐✌️ Play Rock Paper Scissors', href: '/Rock_paper' },
    { name: '❌⭕ Play Tic Tac Toe', href: '/Tic_tac_toe' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-4xl font-bold mb-10">🎮 Game Center</h1>

      <div className="grid gap-6 w-full max-w-sm">
        {games.map((game, index) => (
          <Link
            key={index}
            href={game.href}
            className="block text-center bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg text-xl font-medium shadow-md transition duration-300"
          >
            {game.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
