import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Square from "./components/Square";

const INITIAL_GAME_STATE: Array<null | string> = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];
const INITIAL_SCORE: { [key: string]: number } = { X: 0, O: 0 };
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [gameScore, setGameScore] = useState(INITIAL_SCORE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState({ winner: null, status: false });

  useEffect(() => {
    checkForWinner();
  }, [gameState]);

  const checkForWinner = () => {
    if (gameState.filter((state) => state !== null).length < 3)
      return setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes(null)) continue;

      if (a === b && b === c) {
        setGameScore({
          ...gameScore,
          [currentPlayer]: gameScore[currentPlayer] + 1,
        });
        return setGameOver({ ...gameOver, status: true });
      }
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));
    const temp = [...gameState];

    if (gameState[cellIndex]) return;

    temp[cellIndex] = currentPlayer;

    setGameState([...temp]);
  };

  const restart = () => {
    setGameOver({ winner: null, status: false });
    setGameState([...INITIAL_GAME_STATE]);
  };

  return (
    <>
      <div className="splash splash1"></div>
      <div className="splash splash2"></div>
      <div className="splash splash3"></div>
      {gameOver.status && (
        <Modal
          restart={restart}
          message={`Congragulations player ${currentPlayer} has won`}
        />
      )}
      {gameState.filter((state) => state === null).length === 0 && (
        <Modal restart={restart} message="Oops the game ends in draw" />
      )}
      <div className=" h-screen pt-5">
        <h1 className="text-slate-900 font-extrabold text-5xl text-center font-display mb-10 underline">
          Tic Tac Toe
        </h1>
        <h1 className="text-center text-slate-900 font-extrabold font-display text-4xl mb-5">
          Current Player: <span className="text-red-200">{currentPlayer}</span>
        </h1>
        <div>
          <div className="grid grid-cols-3 gap-3 mx-auto w-96">
            {gameState.map((state, index) => (
              <Square
                key={index}
                {...{ player: state, index }}
                onClick={handleClick}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-red-500 rounded-md p-4 mt-5 text-white"
            onClick={restart}
          >
            Reset Game
          </button>
        </div>

        <div className="ml-5">
          <h3 className="mt-5 font-bold text-black text-4xl">
            X: <span className="font-display text-red-300">{gameScore.X}</span>
          </h3>
          <h3 className="mt-5 font-bold text-black text-4xl">
            O: <span className="font-display text-red-300">{gameScore.O}</span>
          </h3>
        </div>
      </div>
    </>
  );
}

export default App;
