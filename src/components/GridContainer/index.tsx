import React from "react";

type Props = {
  children?: React.ReactNode;
};

function GridContainer({ children }: Props) {
  return <div className="border border-teal-400 inline-block">{children}</div>;
}

export default GridContainer;
