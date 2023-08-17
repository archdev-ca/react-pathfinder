"use client";
import GridCell from "@/components/GridCell";
import GridContainer from "@/components/GridContainer";
import GridRow from "@/components/GridRow";
import { ObstacleMap, GridAddress } from "@/interfaces";
import solveAAsterisk from "@/lib/aAsterisk";
import React from "react";

export default function Home() {
  const [gridSize, setGridSize] = React.useState(10);
  const [startNode, setStartNode] = React.useState<GridAddress | null>([0, 0]);
  const [endNode, setEndNode] = React.useState<GridAddress | null>([8, 9]);
  const [obstacles, setObstacles] = React.useState<ObstacleMap>({
    "2:1": true,
    "2:2": true,
    "2:3": true,
  });

  const handleClickSolve = () => {
    if (gridSize && startNode && endNode) {
      console.log("solveAAsterisk");
      solveAAsterisk(gridSize, startNode, endNode, obstacles);
    }
  };

  const handleClickSetObstacle = (x: number, y: number) => {
    console.log(x, y);
    let id = `${x}:${y}`;
    let newObstacles = { ...obstacles };
    if (!newObstacles[id]) {
      newObstacles[id] = true;
    } else {
      delete newObstacles[id];
    }
    setObstacles(newObstacles);
  };

  const setAsObstacle = (x: number, y: number) => {
    console.log(x, y);
    let id = `${x}:${y}`;
    let newObstacles = { ...obstacles };
    if (!newObstacles[id]) {
      newObstacles[id] = true;
    } else {
      delete newObstacles[id];
    }
    setObstacles(newObstacles);
  };

  let gridArray = [...Array(gridSize).keys()];
  let dim = 1 / gridSize;
  return (
    <main className="container mx-auto py-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label>Grid Size</label>
          <input type="number" />
        </div>
        <div>
          <button
            className="bg-teal-500 hover:bg-teal-400 active:bg-teal-600 transition-all duration-300 text-white px-6 py-2 rounded flex items-center"
            onClick={handleClickSolve}
          >
            Solve
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 ml-2"
            >
              <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
              <path
                fillRule="evenodd"
                d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <GridContainer>
        {gridArray.map((_, i1) => {
          return (
            <GridRow key={i1}>
              {gridArray.map((_, i2) => {
                return (
                  <GridCell
                    key={i2}
                    size={dim}
                    row={i1}
                    col={i2}
                    onClick={handleClickSetObstacle}
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
