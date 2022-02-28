import { useEffect, useState } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";

import { nextMove } from '../utils/api';

export default function ChessGame() {

  const [game, setGame] = useState(new Chess());
  const [move, setMove] = useState(null);

  useEffect(() => {
    console.log("move",move);
  }, [move]);

  function safeGameMutate(modify) {

    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    console.log("onDrop");
    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
    });
    console.log(game);
    return true;
  }

  // Send the current board position in fen notation to the backend for analysis
  function analyzePosition() {
    nextMove(game.fen(), setMove, () => 'There was an error analyzing this position');
  }


  return (
    <>
      <div>
        <Chessboard id="BasicBoard" position={game.fen()} onPieceDrop={onDrop} />
      </div>
      <div>
        <text>
          { "Next Best Move is: " + move }
        </text>
      </div>
      <div>
        <button onClick={ analyzePosition }>
          Analyze
        </button>
      </div>
    </>
  );
}