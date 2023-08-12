"use client";
import Grid from "@/components/Grid";
import GridContainer from "@/components/GridContainer";
import GridRow from "@/components/GridRow";
import { AddressMap, GridAddress } from "@/interfaces";
import React from "react";

export default function Home() {
  const [gridSize, setGridSize] = React.useState(10);
  const [startNode, setStartNode] = React.useState<GridAddress | null>(null);
  const [endNode, setEndNode] = React.useState<GridAddress | null>(null);
  const [obstacles, setObstacles] = React.useState<AddressMap>({});

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
                    isStartNode={
                      startNode && startNode[0] === i1 && startNode[1] === i2
                        ? true
                        : false
                    }
                    isEndNode={
                      endNode && endNode[0] === i1 && endNode[1] === i2
                        ? true
                        : false
                    }
                    isObstacle={Boolean(obstacles[`${i1}:${i2}`])}
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
