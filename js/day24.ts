//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print, printGrid, hash, timeout, clamp, gcd, lcm, getNeighbors, bfs, createProgram, runProgram, getMapPoints, addPos, hashToPoint, PriorityQueue, } from "./utils";
console.clear();
console.log("\n");
//---------------------------------------------------------------------------------
const input = `
..##.
#....
.....
#.#.#
#..#.`

const parsed = input.trim().split('\n').map((s) => s.split(''));
const width = parsed[0].length;
const height = parsed.length;

let map = {};
for (let [y, x] of nRange(height, width)) {
  map[hash([x, y])] = parsed[y][x];
}
printGrid(map)


const cache = new Set();
let state = map;
while (true) {
  const hashed = _.values(state).join('');
  if (cache.has(hashed)) {
    console.log("---")
    printGrid(state)
    let sum = 0;
    let mult = 1;
    for (let [y, x] of nRange(height, width)) {
      if (state[hash([x, y])] == '#') {
        console.log("Adding", mult)
        sum += mult;
      }
      mult = mult << 1;
    }
    console.log("Got sum", sum);
    break;
  }
  cache.add(hashed)


  let next = {};
  for (let [y, x] of nRange(height, width)) {
    const neighbors = getNeighbors([x, y]).filter(([x, y]) => x >= 0 && x < width && y >= 0 && y <= width);
    const bugs = neighbors.filter(([x, y]) => state[hash([x, y])] === '#');
    next[hash([x, y])] = '.';
    if (state[hash([x, y])] == '#' && bugs.length !== 1) {
      next[hash([x, y])] = '.';
    } else if (bugs.length === 1 || bugs.length === 2) {
      next[hash([x, y])] = '#';
    }
  }

  state = next;
}



