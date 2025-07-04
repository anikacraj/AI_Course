"use client";
import React, { useState, useEffect, useCallback } from 'react';

const ChessGame = () => {
  // Chess piece symbols
  const pieces = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
  };

  // Initial board setup
  const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ];

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [isThinking, setIsThinking] = useState(false);

  const isWhitePiece = (piece) => piece && piece === piece.toUpperCase();
  const isBlackPiece = (piece) => piece && piece === piece.toLowerCase();
  const isValidPosition = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;

  const isOpponentPiece = (piece, playerColor) => {
    if (!piece) return false;
    return playerColor === 'white' ? isBlackPiece(piece) : isWhitePiece(piece);
  };

  const isSameColorPiece = (piece, playerColor) => {
    if (!piece) return false;
    return playerColor === 'white' ? isWhitePiece(piece) : isBlackPiece(piece);
  };

  const generatePieceMoves = (row, col, boardState) => {
    const piece = boardState[row][col];
    if (!piece) return [];

    const color = isWhitePiece(piece) ? 'white' : 'black';
    const moves = [];
    const pieceType = piece.toLowerCase();

    const addMove = (r, c) => {
      if (!isValidPosition(r, c)) return false;
      const target = boardState[r][c];
      if (!target) {
        moves.push([r, c]);
        return true;
      } else if (isOpponentPiece(target, color)) {
        moves.push([r, c]);
        return false;
      }
      return false;
    };

    switch (pieceType) {
      case 'p': // Pawn
        const direction = color === 'white' ? -1 : 1;
        const startRow = color === 'white' ? 6 : 1;
        
        // Forward moves
        if (!boardState[row + direction]?.[col]) {
          moves.push([row + direction, col]);
          if (row === startRow && !boardState[row + 2 * direction]?.[col]) {
            moves.push([row + 2 * direction, col]);
          }
        }
        
        // Diagonal captures
        [-1, 1].forEach(dc => {
          const newRow = row + direction;
          const newCol = col + dc;
          if (isValidPosition(newRow, newCol) && isOpponentPiece(boardState[newRow][newCol], color)) {
            moves.push([newRow, newCol]);
          }
        });
        break;

      case 'r': // Rook
        [[0,1], [0,-1], [1,0], [-1,0]].forEach(([dr, dc]) => {
          for (let i = 1; i < 8; i++) {
            if (!addMove(row + dr * i, col + dc * i)) break;
          }
        });
        break;

      case 'n': // Knight
        [[-2,-1], [-2,1], [-1,-2], [-1,2], [1,-2], [1,2], [2,-1], [2,1]].forEach(([dr, dc]) => {
          addMove(row + dr, col + dc);
        });
        break;

      case 'b': // Bishop
        [[-1,-1], [-1,1], [1,-1], [1,1]].forEach(([dr, dc]) => {
          for (let i = 1; i < 8; i++) {
            if (!addMove(row + dr * i, col + dc * i)) break;
          }
        });
        break;

      case 'q': // Queen
        [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]].forEach(([dr, dc]) => {
          for (let i = 1; i < 8; i++) {
            if (!addMove(row + dr * i, col + dc * i)) break;
          }
        });
        break;

      case 'k': // King
        [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]].forEach(([dr, dc]) => {
          addMove(row + dr, col + dc);
        });
        break;
    }

    return moves;
  };

  const getAllValidMoves = (color, boardState) => {
    const moves = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = boardState[row][col];
        if (piece && isSameColorPiece(piece, color)) {
          const pieceMoves = generatePieceMoves(row, col, boardState);
          pieceMoves.forEach(([toRow, toCol]) => {
            moves.push({ from: [row, col], to: [toRow, toCol] });
          });
        }
      }
    }
    return moves;
  };

  const isKingCaptured = (color, boardState) => {
    const king = color === 'white' ? 'K' : 'k';
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (boardState[row][col] === king) {
          return false;
        }
      }
    }
    return true;
  };

  const evaluateBoard = (boardState) => {
    const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 };
    let score = 0;
    
    let whiteKingExists = false;
    let blackKingExists = false;
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = boardState[row][col];
        if (piece) {
          const value = pieceValues[piece.toLowerCase()];
          if (piece === 'K') whiteKingExists = true;
          if (piece === 'k') blackKingExists = true;
          score += isWhitePiece(piece) ? -value : value;
        }
      }
    }
    
    if (!whiteKingExists) score += 10000;
    if (!blackKingExists) score -= 10000;
    
    return score;
  };

  const minimax = (boardState, depth, isMaximizing, alpha, beta) => {
    if (depth === 0) {
      return { score: evaluateBoard(boardState) };
    }

    const color = isMaximizing ? 'black' : 'white';
    const moves = getAllValidMoves(color, boardState);

    if (moves.length === 0) {
      return { score: 0 };
    }

    let bestMove = null;
    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (const move of moves) {
      const [fromRow, fromCol] = move.from;
      const [toRow, toCol] = move.to;
      
      const newBoard = boardState.map(row => [...row]);
      newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = null;

      const result = minimax(newBoard, depth - 1, !isMaximizing, alpha, beta);
      
      if (isMaximizing) {
        if (result.score > bestScore) {
          bestScore = result.score;
          bestMove = move;
        }
        alpha = Math.max(alpha, result.score);
      } else {
        if (result.score < bestScore) {
          bestScore = result.score;
          bestMove = move;
        }
        beta = Math.min(beta, result.score);
      }

      if (beta <= alpha) break;
    }

    return { score: bestScore, move: bestMove };
  };

  const makeAIMove = useCallback(() => {
    if (currentPlayer !== 'black' || gameStatus !== 'playing') return;

    setIsThinking(true);
    
    setTimeout(() => {
      const result = minimax(board, 3, true, -Infinity, Infinity);
      
      if (result.move) {
        const [fromRow, fromCol] = result.move.from;
        const [toRow, toCol] = result.move.to;
        
        const newBoard = board.map(row => [...row]);
        newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
        newBoard[fromRow][fromCol] = null;
        
        setBoard(newBoard);
        setCurrentPlayer('white');
        
        if (isKingCaptured('white', newBoard)) {
          setGameStatus('black-wins');
        } else if (isKingCaptured('black', newBoard)) {
          setGameStatus('white-wins');
        }
      }
      
      setIsThinking(false);
    }, 500);
  }, [board, currentPlayer, gameStatus]); 

  useEffect(() => {
    if (currentPlayer === 'black' && gameStatus === 'playing') {
      makeAIMove();
    }
  }, [currentPlayer, gameStatus, makeAIMove]);

  const handleSquareClick = (row, col) => {
    if (currentPlayer !== 'white' || gameStatus !== 'playing' || isThinking) return;

    const piece = board[row][col];

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);

      if (isValidMove) {
        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = newBoard[selectedRow][selectedCol];
        newBoard[selectedRow][selectedCol] = null;

        setBoard(newBoard);
        setSelectedSquare(null);
        setValidMoves([]);
        
        if (isKingCaptured('black', newBoard)) {
          setGameStatus('white-wins');
          return;
        } else if (isKingCaptured('white', newBoard)) {
          setGameStatus('black-wins');
          return;
        }
        
        setCurrentPlayer('black');
      } else {
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else if (piece && isWhitePiece(piece)) {
      const moves = generatePieceMoves(row, col, board);
      setSelectedSquare([row, col]);
      setValidMoves(moves);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('white');
    setSelectedSquare(null);
    setValidMoves([]);
    setGameStatus('playing');
    setIsThinking(false);
  };

  const getSquareClass = (row, col) => {
    let className = (row + col) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-700';
    
    if (selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col) {
      className += ' ring-4 ring-green-500 bg-green-300';
    } else if (validMoves.some(([r, c]) => r === row && c === col)) {
      className += ' bg-blue-300';
    }

    return className;
  };

  const getPieceStyle = (piece) => {
    if (isWhitePiece(piece)) {
      return { color: '#ffffff', textShadow: '1px 1px 2px #000000' };
    }
    return {};
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Chess Game</h1>
          <div className="text-xl font-semibold text-gray-600">
            {gameStatus === 'playing' ? (
              <>
                {currentPlayer === 'white' ? 'Your Turn' : 'AI Thinking...'}
                {isThinking && <span className="ml-2 animate-spin">🤔</span>}
              </>
            ) : gameStatus === 'black-wins' ? (
              '🤖 AI Wins! King Captured!'
            ) : gameStatus === 'white-wins' ? (
              '🎉 You Win! King Captured!'
            ) : (
              "It's a Draw!"
            )}
          </div>
        </div>

        <div className="grid grid-cols-8 gap-0 border-4 border-amber-900 rounded-lg overflow-hidden mb-6 mx-auto w-fit">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-16 h-16 flex items-center justify-center text-4xl cursor-pointer hover:scale-105 transition-transform ${getSquareClass(rowIndex, colIndex)}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {piece && (
                  <span style={getPieceStyle(piece)}>
                    {pieces[piece]}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {gameStatus !== 'playing' && (
          <div className="text-center">
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              New Game
            </button>
          </div>
        )}

        <div className="text-center text-sm text-gray-600 mt-4">
          <p>You play as White (bottom). Click a piece to select, then click a highlighted square to move.</p>
          <p className="mt-1 font-semibold text-red-600">Game ends only when a King is captured!</p>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;