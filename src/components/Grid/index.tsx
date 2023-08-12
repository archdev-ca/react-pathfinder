import React from "react";

type Props = {
  children?: React.ReactNode;
  size: number;
  row: number;
  col: number;
  onClick: () => void;
  isStartNode: boolean;
  isEndNode: boolean;
  isObstacle: boolean;
};

function Grid({ children, size, isStartNode, isEndNode, isObstacle }: Props) {
  return (
    <div
      className="inline-block relative"
      style={{
        width: `calc((100vh - 400px) * ${size})`,
        paddingBottom: `calc((100vh - 400px) * ${size})`,
      }}
    >
      <div className="absolute left-0 right-0 top-0 bottom-0 border border-teal-400 text-teal-400 text-sm flex justify-center items-center">
        {isStartNode ? "start" : null}
        {isEndNode ? "end" : null}
        {isObstacle ? "x" : null}
      </div>
    </div>
  );
}

export default Grid;
