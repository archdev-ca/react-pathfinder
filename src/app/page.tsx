"use client";
import Grid from "@/components/Grid";
import GridContainer from "@/components/GridContainer";
import GridRow from "@/components/GridRow";
import { GridAddress } from "@/interfaces";
import React from "react";

export default function Home() {
  const [gridSize, setGridSize] = React.useState(10);
  const [startCell, setStartCell] = React.useState<GridAddress | null>(null);
  const [endCell, setEndCell] = React.useState<GridAddress | null>(null);
  let gridArray = [...Array(gridSize).keys()];
  let dim = 1 / gridSize;
  return (
    <main className="container mx-auto py-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Grid Size</label>
          <input type="number" />
        </div>
      </div>
      <GridContainer>
        {gridArray.map((_, i1) => {
          return (
            <GridRow key={i1}>
              {gridArray.map((_, i2) => {
                return (
                  <Grid
                    key={i2}
                    size={dim}
                    row={i1}
                    col={i2}
                    onClick={() => {}}
                  />
                );
              })}
            </GridRow>
          );
        })}
      </GridContainer>
    </main>
  );
}
