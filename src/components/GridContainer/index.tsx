import React from "react";

type Props = {
  children?: React.ReactNode;
};

function GridContainer({ children }: Props) {
  return <div>{children}</div>;
}

export default GridContainer;
