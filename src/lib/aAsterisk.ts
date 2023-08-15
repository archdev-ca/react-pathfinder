import { ObstacleMap, GridAddress, NodeInterface } from "@/interfaces";

const solveAAsterisk = (
  gridSize: number,
  startNode: GridAddress,
  endNode: GridAddress,
  obstacles: ObstacleMap
) => {
  const openNodes: GridAddress[] = [];
  const closedNodes: GridAddress[] = [];
  openNodes.push(startNode);

  function getSurroundingNodes(node: GridAddress) {
    const surroundingNodes: NodeInterface[] = [];
    const nodes: GridAddress[] = [
      [node[0] - 1, node[1] - 1],
      [node[0], node[1] - 1],
      [node[0], node[1] + 1],
      [node[0] - 1, node[1]],
      [node[0] + 1, node[1]],
      [node[0] - 1, node[1] + 1],
      [node[0], node[1] + 1],
      [node[0] + 1, node[1] + 1],
    ];
    nodes.forEach((node) => {
      if (isValidAddress(node)) {
        const gCost = getGCost(node);
        const hCost = getHCost(node);
        const fCost = gCost + hCost;
        surroundingNodes.push({
          address: {
            x: node[0],
            y: node[0],
          },
          g: gCost,
          h: hCost,
          f: fCost,
        });
      }
    });
  }
  function isValidAddress(node: GridAddress) {
    // node is an obstacle
    if (obstacles[`${node[0]}:${node[1]}`]) {
      return false;
    }

    // node is outside the grid
    if (
      node[0] < 0 ||
      node[0] > gridSize - 1 ||
      node[1] < 0 ||
      node[1] > gridSize - 1
    ) {
      return false;
    }
  }
  function getDistance(node1: GridAddress, node2: GridAddress) {
    let x = node1[0] + node2[0];
    let y = node1[1] + node2[1];
    return Math.sqrt(x * x + y * y);
  }
  function getGCost(node: GridAddress) {
    getDistance(node, startNode);
    return 0;
  }
  function getHCost(node: GridAddress) {
    getDistance(node, startNode);
    return 0;
  }
};
export default solveAAsterisk;
