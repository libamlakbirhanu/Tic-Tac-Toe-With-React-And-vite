import React from "react";

type Props = {
  player?: null | String;
  index: Number;
  onClick: (event: any) => void;
};

function Square({ index, player, onClick }: Props) {
  const scale = player ? "scale-100" : "scale-0";
  const textColor = player === "X" ? "text-yellow-400" : "text-fuchsia-500";
  const hoverStyle = "transition duration-500 hover:scale-105 transform";

  return (
    <div
      data-cell-index={index}
      className={`h-36 border-solid border-4 border-slate-400 font-display text-7xl text-center flex justify-center items-center cursor-pointer ${hoverStyle}`}
      onClick={(event) => onClick(event)}
    >
      <span
        data-cell-index={index}
        className={`transform transition-all duration-150 ease-out ${scale} ${textColor}`}
      >
        {player}
      </span>
    </div>
  );
}

export default Square;
