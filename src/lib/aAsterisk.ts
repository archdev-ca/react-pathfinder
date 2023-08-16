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

  function getSurroundingNodes(node: NodeInterface) {
    const surroundingNodes: NodeInterface[] = [];
    const nodes: GridAddress[] = [
      [node.address.x - 1, node.address.y - 1],
      [node.address.x, node.address.y - 1],
      [node.address.x, node.address.y + 1],
      [node.address.x - 1, node.address.y],
      [node.address.x + 1, node.address.y],
      [node.address.x - 1, node.address.y + 1],
      [node.address.x, node.address.y + 1],
      [node.address.x + 1, node.address.y + 1],
    ];
    nodes.forEach((n) => {
      if (isValidAddress(n)) {
        const gCost = getGCost(n);
        const hCost = getHCost(n);
        const fCost = gCost + hCost;
        surroundingNodes.push({
          address: {
            x: n[0],
            y: n[0],
          },
          g: gCost,
          h: hCost,
          f: fCost,
          parent: node,
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

  // distance from start node relative to parent
  function getGCost(node: GridAddress, parent: NodeInterface | null = null) {
    let dist = getDistance(node, startNode);
    if (parent && parent.g) {
      dist += parent.g;
    }
    return dist;
  }

  // distance from end node
  function getHCost(node: GridAddress) {
    getDistance(node, startNode);
    return 0;
  }
};
export default solveAAsterisk;
