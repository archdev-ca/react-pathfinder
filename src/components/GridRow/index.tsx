import React from "react";

type Props = {
  children?: React.ReactNode;
};

function GridRow({ children }: Props) {
  return <div>{children}</div>;
}

export default GridRow;
