import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard); // State to hold the board
  const [xIsNext, setXIsNext] = useState(true); // State to track current player
  const [winner, setWinner] = useState(null); // State to track winner

  // Function to handle click on a square
  const handleClick = (index) => {
    // If there's a winner or the square is already filled, return early
    if (winner || board[index]) return;

    // Create a copy of the current board state
    const newBoard = [...board];

    // Set the current square to X or O based on the current player
    newBoard[index] = xIsNext ? 'X' : 'O';

    // Update the board state and toggle the player
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    // Check for winner after each move
    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  // Function to determine if there's a winner
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

  // Function to reset the game
  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
  };

  // Render the game board
  const renderBoard = () => (
    <div className="board">
      {board.map((square, index) => (
        <div key={index} className="square" onClick={() => handleClick(index)}>
          {square}
        </div>
      ))}
    </div>
  );

  // Render the game status
  const renderStatus = () => {
    if (winner) {
      return <div>Winner: {winner}</div>;
    } else {
      return <div>Next player: {xIsNext ? 'X' : 'O'}</div>;
    }
  };

  // Render the entire game UI
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      {renderStatus()}
      {renderBoard()}
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default App;
