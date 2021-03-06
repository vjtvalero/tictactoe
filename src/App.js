import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [game, setGame] = useState(Array(9).fill(''));
  const [isX, setIsX] = useState(false);
  const [turnNumber, setTurnNumber] = useState(0);
  const [winner, setWinner] = useState(false);

  const turn = (index) => {
    let g = [...game];
    if (!g[index] && !winner) {
      g[index] = isX ? 'X' : 'O';
      setGame(g);
      setIsX(!isX);
      setTurnNumber(turnNumber + 1);
    }
  };

  const restart = () => {
    setGame(Array(9).fill(''));
    setWinner(false);
    setTurnNumber(0);
  };

  useEffect(() => {
    // check for winner for every turn
    combinations.forEach((c) => {
      if (game[c[0]] === game[c[1]] && game[c[0]] === game[c[2]] && game[c[0]] !== '') {
        setWinner(true);
      }
    });
  }, [game]);

  return (
    <div className="container">
      <p>
        {winner || turnNumber === 9 ? (
          <button className="reset-btn" onClick={restart}>
            Restart
          </button>
        ) : null}
        {winner ? (
          <span>We have a winner: {!isX ? 'X' : 'O'}</span>
        ) : turnNumber === 9 ? (
          <span>It's a tie!</span>
        ) : (
          <br />
        )}
      </p>

      <div className="row">
        <Box index={0} turn={turn} value={game[0]} />
        <Box index={1} turn={turn} value={game[1]} />
        <Box index={2} turn={turn} value={game[2]} />
      </div>
      <div className="row">
        <Box index={3} turn={turn} value={game[3]} />
        <Box index={4} turn={turn} value={game[4]} />
        <Box index={5} turn={turn} value={game[5]} />
      </div>
      <div className="row">
        <Box index={6} turn={turn} value={game[6]} />
        <Box index={7} turn={turn} value={game[7]} />
        <Box index={8} turn={turn} value={game[8]} />
      </div>
    </div>
  );
}

const Box = ({ index, turn, value }) => {
  return (
    <div className="box" onClick={() => turn(index)}>
      {value}
    </div>
  );
};

const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default App;
