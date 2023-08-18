import {
  ObstacleMap,
  GridAddress,
  NodeInterface,
  NormalizedNodeListInterface,
} from "@/interfaces";

const solveAAsterisk = (
  gridSize: number,
  startNode: GridAddress,
  endNode: GridAddress,
  obstacles: ObstacleMap
) => {
  let openNodes: NormalizedNodeListInterface = { byId: {}, allIDs: [] };
  const closedNodes: GridAddress[] = [];
  openNodes.byId[`${startNode[0]}:${startNode[1]}`] = {
    address: {
      x: startNode[0],
      y: startNode[1],
    },
    g: 0,
    h: 0,
    f: 0,
    parent: null,
  };
  openNodes.allIDs.push(`${startNode[0]}:${startNode[1]}`);

  function traverse() {
    const currentNodeID = openNodes.allIDs.pop();
    const currentNode = openNodes.byId[currentNodeID!];
    console.log(currentNode);
    if (
      currentNode &&
      currentNode.address.x !== endNode[0] &&
      currentNode.address.y !== endNode[1]
    ) {
      let surroundingNodes = getSurroundingNodes(currentNode);
      if (surroundingNodes.length) {
        openNodes = openNodes.allIDs.concat(surroundingNodes);
        openNodes.allIDs.sort((node1ID, node2ID) => {
          const node1 = openNodes.byId[node1ID];
          const node2 = openNodes.byId[node2ID];
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
      traverse();
    } else {
      console.log("finish", currentNode);
      return ["finish", currentNode];
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
