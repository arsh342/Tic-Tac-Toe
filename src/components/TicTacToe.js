import React, { useState } from 'react';
import './TicTacToe.css';

const Square = ({ value, onClick }) => (
  <button
    className="tic-tac-toe-square"
    onClick={onClick}
  >
    {value}
  </button>
);

const Board = ({ squares, onClick }) => (
  <div className="tic-tac-toe-board">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = (i) => {
    if (gameOver || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    
    const winner = calculateWinner(newSquares);
    if (winner) {
      setMessage(`Player ${winner} wins!`);
      setGameOver(true);
    } else if (newSquares.every(square => square !== null)) {
      setMessage("It's a draw!");
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
    setMessage('');
  };

  const status = gameOver ? message : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="tic-tac-toe-container">
      <h1 className="tic-tac-toe-title">Tic-Tac-Toe</h1>
      <div className="tic-tac-toe-status">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <button 
        onClick={resetGame} 
        className="tic-tac-toe-reset"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;