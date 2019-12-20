//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print, printGrid, hash, timeout, clamp, gcd, lcm, getNeighbors, bfs, createProgram, runProgram, getMapPoints, addPos, hashToPoint, PriorityQueue } from "./utils";
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
########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################
`

const map: Record<string, string> = input.trim().split('\n').reduce((fullMap, line, y) => ({ ...fullMap, ...line.split('').reduce((obj, char, x) => ({ ...obj, [hash([x, y])]: char}), {}) }), {});

const isKey = (char: string) => 'a' <= char && 'z' >= char;
const isDoor = (char: string) => 'A' <= char && 'Z' >= char;
const keyOrDoor = getMapPoints(map).filter(([x, y]) => !['#', '.'].includes(map[hash([x, y])]))
const graph = keyOrDoor.reduce((graph, [sx, sy]) => {
  const startKey = hash([sx, sy]);
  graph[startKey] = {};

  const visited = new Set();
  let toVisit: Array<[number, number]> = [[sx, sy]];
  const lengths = { [hash([sx, sy])]: 0 };
  while(true) {
    const pos = toVisit.shift();
    if (!pos) break;
    const key = hash(pos);
    const length = lengths[key];
    visited.add(key);
    const char = map[key];
    if (key !== startKey && (isKey(char) || isDoor(char))) {
      graph[startKey][key] = length;
    } else {
      const next = getNeighbors(...pos)
        .filter((n) => !visited.has(hash(n)))
        .filter((n) => !(map[hash(n)] === '#'));
      next.forEach((n) => {
        lengths[hash(n)] = length + 1;
      });
      toVisit = toVisit.concat(next);
    }
  }
  return graph
}, {});

const startPos = getMapPoints(map).find(([x, y]) => map[hash([x, y])] == '@');
let isWall = (char: string) => char === '#' || ('A' <= char && 'Z' >= char);
const allKeys = getMapPoints(map).filter(([x, y]) => {
  let char = map[hash([x, y])]
  return 'a' <= char && 'z' >= char
});

let getAllNeighbors = (startKey: string, keys: Set<string>, neighborList = {}, curDistance = 0, visited = new Set()) => {
  let newNeighbors = graph[startKey];
  for (let neighbor of Object.keys(newNeighbors)) {
    const nChar = map[neighbor];
    if (isDoor(nChar) || keys.has(nChar)) continue;
    if (!neighborList[neighbor]) {
      neighborList[neighbor] = newNeighbors[neighbor] + curDistance;
    } else {
      neighborList[neighbor] = Math.min(neighborList[neighbor], newNeighbors[neighbor] + curDistance);
    }
  }
  Object.keys(newNeighbors).forEach((key) => {
    const nChar = map[key];
    if (!visited.has(nChar) && (isKey(nChar) || (isDoor(nChar) && keys.has(nChar.toLowerCase())))) {
      visited.add(nChar);
      getAllNeighbors(key, keys, neighborList, newNeighbors[key] + curDistance, visited);
    }
  });
  return neighborList;
}

type PQState = {
  pos: string;
  dist: number;
  keys: Array<string>;
}

let toVisit = new PriorityQueue<PQState>(
  (a, b) => a.dist < b.dist
);
toVisit.push({ pos: hash(startPos), dist: 0, keys: []});
let count = 0;
while (toVisit.top() !== undefined) {
  const { pos, dist, keys } = toVisit.pop();
  count++;
  if (keys.length === allKeys.length) {
    console.log("Distance: ", dist);
    console.log(keys)
    break;
  }

  const neighbors = getAllNeighbors(pos, new Set(keys));

  for (let n of Object.keys(neighbors)) {
    let nextKeys = [...keys, map[n]];
    toVisit.push({ pos: n, dist: dist + neighbors[n], keys: nextKeys });
  }
}
console.log(count)
