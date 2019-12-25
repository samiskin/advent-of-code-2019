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
#..#.`;
const parsed = input.trim().split('\n').map((s) => s.split(''));
const width = parsed[0].length;
const height = parsed.length;

let map = {};
for (let [y, x] of nRange(height, width)) {
  map[hash([x, y])] = parsed[y][x];
}
printGrid(map)

const empty = _.mapValues(map, () => '.');

let states: Record<number, Record<string, string>> = { [-1]: _.clone(empty), 0: map, 1: _.clone(empty) };

const hashToPos = (str: string) => str.split(' ').map((i) => parseInt(i)) as [number, number] ;
const getNeighbors2 = ([x, y], depth: number): Array<string> => {
  const neighbors = getNeighbors([x, y]).filter(
    ([x, y]) => x >= 0 && x < width && y >= 0 && y <= width
  ).filter(([x, y]) => x !== 2 || y !== 2).map(([x, y]) => states[depth][hash([x, y])]);

  let down = states[depth - 1];
  let downNeighbors = [];
  if (down) {
    let downFilter = (pos: [number, number]) => false;
    if (x == 1 && y == 2) {
      downFilter = ([x]) => x == 0;
    } else if (x == 2 && y == 1) {
      downFilter = ([, y]) => y == 0;
    } else if (x == 3 && y == 2) {
      downFilter = ([x]) => x == 4;
    } else if (x == 2 && y == 3) {
      downFilter = ([,y]) => y == 4;
    }
    downNeighbors.push(
      ...Object.entries(down)
        .filter(([k]) => downFilter(hashToPos(k)))
        .map(([k]) => down[k])
    );
  }

  let up = states[depth + 1];
  let upNeighbors = [];
  if (up) {
    if (x == 0) {
      upNeighbors.push(up[hash([1, 2])]);
    } 
    if (x == width - 1) {
      upNeighbors.push(up[hash([3, 2])]);
    } 
    if (y == 0) {
      upNeighbors.push(up[hash([2, 1])]);
    } 
    if (y == height - 1) {
      upNeighbors.push(up[hash([2, 3])]);
    }
  }

  return neighbors.concat(downNeighbors).concat(upNeighbors);
}

for (let i = 0; i < 200; i++) {
  let next = {};
  for (let [depth, state] of Object.entries(states)) {
    next[depth] = _.clone(empty);
    for (let [y, x] of nRange(height, width)) {
      if (x == 2 && y == 2) continue;
      const neighbors = getNeighbors2([x, y], parseInt(depth));
      const bugs = neighbors.filter(s => s === '#');
      if (state[hash([x, y])] == '#' && bugs.length !== 1) {
        next[depth][hash([x, y])] = '.';
      } else if (bugs.length === 1 || bugs.length === 2) {
        next[depth][hash([x, y])] = '#';
        if (!states[parseInt(depth) - 1]) {
          next[parseInt(depth) - 1] = _.clone(empty);
        } else if (!states[parseInt(depth) + 1]) {
          next[parseInt(depth) + 1] = _.clone(empty);
        }
      }
    }
  }
  states = next;
}



console.log(Object.values(states).map((s) => Object.values(s)).reduce((arr, a) => arr.concat(a), []).filter((s) => s == '#').length)


