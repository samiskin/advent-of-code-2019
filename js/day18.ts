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
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
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

const startTime = Date.now();


type Graph = Record<string, Record<string, {
  pos: [number, number],
  key: string,
  dist: number,
  requiredKeys: Array<string>,
}>>
const graph: Graph = keyPoints.concat([startPos]).reduce((grid, pos) => {
  grid[hash(pos)] = {};
  const data = bfsV2({ map, start: pos, isWall: (v) => v === '#' });
  for (let otherKey of keyPoints.filter((p) => p[0] !== pos[0] || p[1] !== pos[1])) {
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
}, {});



type State = {
  pos: [number, number];
  dist: number;
  keys: Array<string>;
}
const startState: State = { pos: startPos, dist: 0, keys: [] };
const compareState = (a: State, b: State) =>  {
  const dist = TinyQueue.defaultCompare(a.dist, b.dist);
  if (dist == 0) {
    return TinyQueue.defaultCompare(b.keys.length, a.keys.length);
  }
  return dist;
};

const getNeighbors = ({ pos, keys, dist }: State): State[] => {
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
  getNeighbors,
  isGoal: ({ keys }) => keys.length === keyPoints.length,
  compare: compareState,
});

console.log(target.dist)
console.log("done")
