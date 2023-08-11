import React from "react";

type Props = {
  children?: React.ReactNode;
  size: number;
};

function Grid({ children, size }: Props) {
  return (
    <div
      className="inline-block relative"
      style={{
        width: `calc((100vh - 400px) * ${size})`,
        paddingBottom: `calc((100vh - 400px) * ${size})`,
      }}
    >
      <div className="absolute left-0 right-0 top-0 bottom-0 border border-teal-400">
        grid
      </div>
    </div>
  );
}

export default Grid;
