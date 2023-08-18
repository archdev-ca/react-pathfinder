export type GridAddress = [number, number];
export interface ObstacleMap {
  [key: string]: boolean;
}

export interface NodeInterface {
  address: {
    x: number;
    y: number;
  };
  f: number;
  g: number;
  h: number;
  parent: NodeInterface | null;
  // isStart: boolean;
  // isEnd: boolean;
}

export interface NormalizedNodeListInterface {
  byId: {
    [key: string]: NodeInterface;
  };
  allIDs: string[];
}
