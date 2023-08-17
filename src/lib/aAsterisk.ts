import { ObstacleMap, GridAddress, NodeInterface } from "@/interfaces";

const solveAAsterisk = (
  gridSize: number,
  startNode: GridAddress,
  endNode: GridAddress,
  obstacles: ObstacleMap
) => {
  const openNodes: NodeInterface[] = [];
  const closedNodes: GridAddress[] = [];
  openNodes.push({
    address: {
      x: startNode[0],
      y: startNode[1],
    },
    g: 0,
    h: 0,
    f: 0,
    parent: null,
  });

  function traverse() {
    let currentNode = openNodes.pop();
    if (currentNode) {
      let surroundingNodes = getSurroundingNodes(currentNode);
      if (surroundingNodes.length) {
        openNodes.concat(surroundingNodes);
        openNodes.sort((node1, node2) => {
          if (node1.f === node2.f) {
            if (node1.h > node2.h) {
              return -1;
            }
            if (node1.h < node2.h) {
              return 1;
            }
          }
          if (node1.f > node2.f) {
            return -1;
          }
          if (node1.f < node2.f) {
            return 1;
          }
          return 0;
        });
      }
    }
  }

  function getSurroundingNodes(node: NodeInterface) {
    const surroundingNodes: NodeInterface[] = [];
    const nodes: GridAddress[] = [
      [node.address.x - 1, node.address.y - 1],
      [node.address.x - 1, node.address.y],
      [node.address.x - 1, node.address.y + 1],
      [node.address.x, node.address.y - 1],
      [node.address.x, node.address.y + 1],
      [node.address.x + 1, node.address.y - 1],
      [node.address.x + 1, node.address.y],
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
            y: n[1],
          },
          g: gCost,
          h: hCost,
          f: fCost,
          parent: node,
        });
      }
    });
    return surroundingNodes;
  }

  function isValidAddress(node: GridAddress) {
    // node is an obstacle
    if (obstacles[`${node[0]}:${node[1]}`]) {
      return false;
    }

    // node is start node
    if (node[0] === startNode[0] && node[1] === startNode[1]) {
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
    return true;
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

  traverse();
};
export default solveAAsterisk;
