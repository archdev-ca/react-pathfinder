import React from "react";

type Props = {
  children?: React.ReactNode;
};

function GridRow({ children }: Props) {
  return <div style={{ fontSize: 0 }}>{children}</div>;
}

export default GridRow;
