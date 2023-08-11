import React from "react";

type Props = {
  children?: React.ReactNode;
  size: string;
};

function Grid({ children, size }: Props) {
  return (
    <div
      className="inline-block relative"
      style={{
        width: size,
        paddingBottom: size,
      }}
    >
      <div className="absolute left-0 right-0 top-0 bottom-0">grid</div>
    </div>
  );
}

export default Grid;
