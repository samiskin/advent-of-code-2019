//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print, printGrid, hash, timeout, clamp, gcd, lcm, getNeighbors, bfs, createProgram, runProgram, getMapPoints, addPos, hashToPoint, PriorityQueue, bfsV2, backtrack, TinyQueue, bfsPq } from "./utils";
console.clear();
console.log("\n");
//---------------------------------------------------------------------------------

const input = `
#################################################################################
#.#.......#.................#.D...#.....#.........#.......#.#...#.......#.....V.#
#.#.#####.#####.###.#######M###.#.#.###########H#.###.#.#.#.#.#.###.###.#######.#
#.#...#.....N.#.#...#...#...#...#.#.....#.....#.#...#.#.#...#.#...#.#.#.......#.#
#.###.#######.###.###.###.###.###.###.#.#.###.#.###.#.#.#####.###.#.#.#######.#.#
#...#...#.........#.#.....#.....#...#.#.#.#...#.#...#.#...#...#.....#.......#...#
#.#.###L###########Q#.#######.#.###.###.#.###.#.#.#######.#.#.#######.#.###.###.#
#.#...#t..........#.#.#.....#.#.#...#..o#...#...#.......#.#.#.#.....#.#.#...#...#
#.#.#############.#.#.#.###.###.#.###.#.###.###########.#.#.###.###.#.#.#####.###
#.#.#.........#...#...#.#.......#.#...#.#...#.........#.#.#.....#...#.#.U.#...#.#
#.#.#.#######.#.###.###W#########.#.###.#.#########.#.#.#.#######.#######.#.###.#
#j#...#.....#.#.#...#.....#.....#...#.#.#...#.....#.#.#...#.......#.....#.#.#...#
#.#########.#.#T#.###.###.#.#.#.#####.#.#.#.#.###.#.#.#.###.#######.#.#.#.#.###.#
#...#.......#.#x#...#.#.#.#.#.#.#k..#...#.#.....#.#.#.#.#...#.....#.#.#...#...#.#
###.###.#####.#.###.#.#.#.###.#.#.#.#.###.#######.#.#.#.#.###.###.#.#.###.###.#.#
#.#.E.#.#.....#.#...#...#z..#.#.#.#.#...#.#b......#.#...#.....#...#.#.#...#...#.#
#.###.#.#.###.#.###.#######.#.#.###.###.###.#######.###########.#####.#.###.###.#
#...#...#.#v..#...#...#.....#.#.......#.#...#.....#.#.....#...#.#.....#.#...#...#
#.#.###.#.#.#####.###.#.#####.#########.#.###.###.#.#####.#.#.#.#.#.#####J###.###
#.#.#...#.#.#...#.#.....#.#...........#.#.#.#.#.#...#...#.#.#...#.#.......#.....#
#.###.###.#.#.#.#.#######.#.#########.#.#P#.#.#.#####.#.#.#.#####.#############.#
#.#...#.#.#.#.#f#...#.#.#...#...#...#.#.#.#...#...#...#...#.#.#.......#...#.....#
#C#.###.#.###.#.###.#X#.#.#####.#.#.#.#.#.#.###.#.#.#######.#.#######.#.#.#.###.#
#...#...#.....#...#...#...#.....#.#...#.#.#...#.#...#.....#.#...#.....#.#...#...#
#.#####.#########.#####.###.#.#.#.#.###.#.###.#.#####.###.#.###.###.###.#########
#.#...#.....#...#.....#...#.#.#.#.#.#...#...#...#...#.#.......#...#.#...#.......#
#.#.#.###.#.#.#.###.#####.#.#.###.###.#####.#.###.#.#.###########.#.#.###.#####.#
#...#...#.#.#.#...#.....#.#.#.#...#...#.#...#.#...#.#.#.....#...#.#.#...#.....#.#
#######.#.###.###.###.###.###.#.###.###.#.###.#.###.#.#.###.#.#.#.#.###.#####.#.#
#.....#.#.#...#.#.#...#...#...#.....#...#.#...#.#...#...#.#...#...#...#...#...#e#
#.#####.#.#.###.#.#.###.###.#.#########.#.#.###.#.#######.###########.#.###.###.#
#.Y.....#.......#.#.....#...#.#.........#.#.#...#.........#.........#.#.......#.#
#.###############.#######.###.###.###.###.#.#.#########.###.#####.#.#.#######.#.#
#.....#.........#.........#.#...#.#.#...#.#.#.........#.....#.#...#.#.....#...#.#
#####.#.#.#####.#####.#####.###.#.#.###.#.###########.#######.#.###.#####.#####.#
#.#...#.#.#...#......s#.#.......#.....#.#.#.........#.#.......#.#.....#...#.....#
#.#.#####.#.#.#########.#.#############.#.#.#####.#.#.#####.###.#####.#.###.###.#
#.#.....#.#.#.......#...#.#...........#.#.#.#...#.#.#...#...#...#...#.#.#...#...#
#.#####.#.#.#.#######.#.#.###.#######.#.#.#.###.#.#####.#.#.#.###.#.###.#.###.###
#.........#.#.........#.......#.................#.........#.#.....#.......#.....#
#######################################.@.#######################################
#.....#.....#.........#.....#.................#.....#.......#.........#..y....#.#
#.###.#.#.#.#.#######.#.###.#.###.#####.#.###.###.###.###.#.###.#.###.#.#####.#.#
#...#.#.#.#...#.....#.#...#.#...#.#...#.#...#.....#...#...#...#.#.#...#.#...#...#
###.#.###.#########.#.###.#.###.#.#.#.#.###.#####.#.###.#####.#.#.#.###.#.#.###.#
#...#.#...#...#.....#.#...#.....#.#.#...#...#...#.#.#...#...#.#.#.#.....#.#..c#.#
#.###.#.###.#.#.###.#.###########.###.###.###.#.###.#.###.#.#.###.#######.###.#.#
#.#.#...#...#...#...#.......#...#...#.#.#.#...#.....#.#.#.#.#...#...#...#.#.#...#
#.#.#####.#######.#########.#.#.###.#.#.#.#.#########.#.#.#.###.###.#.#.#.#.#####
#.#.......#.....#.......#...#.#.#...#...#p..#.........#.#.#...#.....#.#.#...#...#
#.###.###.#.###.#######.#.###.#.#.#####.#####.#########.#.###.#######.#.###.###.#
#...#...#.....#.#.......#.....#.#.#.....#.....#.........#...#.........#...#...#.#
#.#.#####.#####.#.#############.#.#####.#.#####.#######.###.#####.#.#####.###.#.#
#.#.....#.#.....#.....#.......#.#.....#.#...#...#.....#...#...#.#.#.#...#...#.#.#
#######.#.#.###########.#####.#.#####.#.#.#.###.#.###.#.#####.#.#.###.#.#####.#.#
#.......#.#..u..#.......#.....#...#...#.#.#...#.#.#.#.#.........#.....#.......#.#
#.###########.#.#.#######.#.#####.#.###.#####.#.#.#.#.#########.###############.#
#.G.#...#...#.#...#.......#.#.....#.#...#.....#.#.#.#.........#.....#...#.......#
#.#.#.#.#.#I#.#####.#########.#####.#####.#######.#.#########.#####.#.#.###.#.#.#
#.#...#...#.#.#...#.........#...#.......#.........#.......#...#...#...#...#.#.#.#
#.#########.#.###.#####.###.###.#.#####.###############.###.#####.#######.###.#.#
#.#...#.....#.....#...#.#...#...#...#...#.....#.......#.#...#...#.......#...F.#g#
#.###.#.#########.#.###.#.###.#####B#.#.###.#.###.###.#.#.#####.#####.#########.#
#.....#.#...#...#.#.#...#...#.#.....#.#.#...#...#.#.#.#.#.#.....#.....#....r#...#
#.#####.#.#R#.#.###.#####.#.#.#.#####.#.#.#####.#.#.#.#.#.#.#####.#####.#.#.#.###
#.#...#...#...#...#.....#.#.#.#.....#.#.#.....#...#.....#.#.#.....#.....#.#.#...#
###.#.###########.#####.#.#.#.#######.#.#####.#.#######.#.#.###.###.#####.#####.#
#...#.#...#...#.......#.#.#.#.......#.#.#.....#n#.....#l#...#...#...#...#...#...#
#.###.#A#.#.#.#.#####.#.###.#######.#.#.#.#######.###.#######.#.#.#####.###.#.###
#...#...#...#.#.#.#...#...#.....#...#.#.#...#...#.#.#.........#.#.#...#...#.#.#.#
###.#########.#.#.#.#####.#####.#.###.#.###.#Z#.#.#.#####.#.#####.#.#.#.###.#.#.#
#...#.....#.#...#.....#...#...#.#...#.#.#...#.#.#.....#...#.#...#...#.#.#...#..i#
#.###.###.#.#####.#####.###.#.#.###.#.#.#.###.#.#.#####.###.#.#.#####K#.#.#####.#
#.....#.#.#.......#.....#...#...#...#.#.#q#...#...#...#...#.#.#.....#...#.......#
#.#####.#.#####.###.#####.#.###.#.###.###.#.#######.#.###.#.#.#.#######.#########
#.#...#.#.....#...#...#...#.#...#.#.#...#...#...#.#d#.....#.#.#..a......#.....#.#
#.#.#.#.#####.#######.#.###.###.#.#.#.#.#.###.#.#.#.#########.###########.#.#.#.#
#...#.#..w..#.#.....#.#.#.#...#.#.#...#.#.#...#..m#.#.....#...#.....#...#.#.#...#
#####.#####.#.#.###.#.#.#.###.###.#####S#.###.###.#.#.###.#.###.###.#.#.###.###.#
#...........#.....#...#.....#......h....#.....#...#.O...#.......#.....#.....#...#
#################################################################################
`;
const inputTest = `
#################
#i.G..c.#.e..H.p#
#######.#.#######
#j.A..b...f..D.o#
#######.@.#######
#k.E..a...g..B.n#
#######.#.#######
#l.F..d.#.h..C.m#
#################`

const map: Record<string, string> = input
  .trim()
  .split("\n")
  .reduce(
    (fullMap, line, y) => ({
      ...fullMap,
      ...line
        .split("")
        .reduce((obj, char, x) => ({ ...obj, [hash([x, y])]: char }), {})
    }),
    {}
  );

const isKey = (char: string) => 'a' <= char && 'z' >= char;
const isDoor = (char: string) => 'A' <= char && 'Z' >= char;
const keyPoints = getMapPoints(map).filter(([x, y]) => isKey(map[hash([x, y])]));
const keyPos = (key: string) => getMapPoints(map).find(([x, y]) => map[hash([x, y])] == key);
const startPos = keyPos('@');

type Graph = Record<string, Record<string, {
  pos: [number, number],
  key: string,
  dist: number,
  requiredKeys: Array<string>,
}>>
const buildGraph = (starts: Array<[number, number]>) => starts.reduce((grid, pos) => {
  grid[hash(pos)] = {};
  const data = bfsV2({ map, start: pos, isWall: (v) => v === '#' });
  for (let otherKey of keyPoints.filter((p) => p[0] !== pos[0] || p[1] !== pos[1])) {
    if (!data[hash(otherKey)]) continue;
    const path = backtrack(data, otherKey);
    const doors = path.filter((pos) => isDoor(map[hash(pos)]));
    grid[hash(pos)][hash(otherKey)] = {
      pos: otherKey,
      key: map[hash(otherKey)],
      dist: data[hash(otherKey)].length,
      requiredKeys: doors.map((pos) => map[hash(pos)].toLowerCase()),
    };
  }
  return grid
}, {})

type State = {
  pos: [number, number];
  dist: number;
  keys: Array<string>;
}
const startState: State = { pos: startPos, dist: 0, keys: [] };
const compareState = (a, b) =>  {
  const dist = TinyQueue.defaultCompare(a.dist, b.dist);
  if (dist == 0) {
    return TinyQueue.defaultCompare(b.keys.length, a.keys.length);
  }
  return dist;
};

const graph: Graph = buildGraph(keyPoints.concat([startPos]));

const getNeighborStates = ({ pos, keys, dist }: State): State[] => {
  const keyset = new Set(keys);
  const allNeighbors = graph[hash(pos)];
  const accessibleNeighbors = Object.values(allNeighbors)
    .filter(({ key }) => !keyset.has(key))
    .filter(({ requiredKeys }) => requiredKeys.every((k: string) => keyset.has(k)))
  return accessibleNeighbors.map((neighbor) => {
    return {
      pos: neighbor.pos,
      dist: dist + neighbor.dist,
      keys: keys.concat([neighbor.key]).sort(),
    }
  });
}

const hashState = ({ pos, keys }: State) => `${hash(pos)} | ${JSON.stringify(keys)}`;

const target = bfsPq({
  start: startState,
  hashState,
  getNeighbors: getNeighborStates,
  isGoal: ({ keys }) => keys.length === keyPoints.length,
  compare: compareState,
});

console.log(target.dist);
console.log("done p1");

([ startPos ]).concat(getNeighbors(startPos))
  .forEach((pos) => (map[hash(pos)] = "#"));

_.difference(
  getNeighbors(startPos, true).map(hash),
  getNeighbors(startPos).map(hash)
).forEach(posHash => (map[posHash] = "@"));


type Pos = [number, number];
type StateP2 = {
  positions: [Pos, Pos, Pos, Pos],
  dist: number;
  keys: Array<string>;
}
const startPosP2 = getMapPoints(map).filter(([x, y]) => map[hash([x, y])] == '@') as [Pos, Pos, Pos, Pos];

const startStateP2: StateP2 = { positions: startPosP2, dist: 0, keys: [] };
const graphP2: Graph = buildGraph(keyPoints.concat(startPosP2));

const getNeighborStatesP2 = ({ positions, keys, dist }: StateP2): StateP2[] => {
  const keyset = new Set(keys);
  return positions.reduce((neighbors, pos, i) => {
    const allNeighbors = graphP2[hash(pos)];
    const accessibleNeighbors = Object.values(allNeighbors)
      .filter(({ key }) => !keyset.has(key))
      .filter(({ requiredKeys }) => requiredKeys.every((k: string) => keyset.has(k)))
    return neighbors.concat(accessibleNeighbors.map((neighbor) => {
      const newPositions = [...positions];
      newPositions.splice(i, 1, neighbor.pos);
      return {
        positions: newPositions,
        dist: dist + neighbor.dist,
        keys: keys.concat([neighbor.key]).sort(),
      }
    }));
  }, []);
}

const hashStateP2 = ({ positions, keys }: StateP2) => `${JSON.stringify(positions)} | ${JSON.stringify(keys)}`;

const targetP2 = bfsPq({
  start: startStateP2,
  hashState: hashStateP2,
  getNeighbors: getNeighborStatesP2,
  isGoal: ({ keys }) => keys.length === keyPoints.length,
  compare: compareState,
});

console.log(targetP2.dist);
console.log("done p2");







