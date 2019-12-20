
//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print, printGrid, hash, timeout, clamp, gcd, lcm, getNeighbors, bfs, createProgram, runProgram, getMapPoints, addPos, hashToPoint } from "./utils";
console.clear();
console.log("\n");
//---------------------------------------------------------------------------------

const input = `
                               H       I       J   D A       U     U       W                               
                               R       Z       M   S A       N     V       T                               
  #############################.#######.#######.###.#.#######.#####.#######.#############################  
  #.#...#.#.......#.#...#...#.........#.#.#.......#.#.....#.....#.....#.....#.............#...#.....#...#  
  #.###.#.###.#####.###.###.###.#####.#.#.#######.#.#.###.#.#####.#.###.###.###.#############.#.#.#####.#  
  #...#.#...#.#...............#...#...#...#.......#.....#.#.#.#...#.#.#.#.#.....#...#...#.#.#...#.#.....#  
  #.###.#.###.#####.#####.###.#####.###.###.#####.###.#.#.#.#.#.#.###.#.#.###.#####.###.#.#.#.#####.#####  
  #.#...........#...#...#.#.......#...#...#.....#.#...#.#.#...#.#.....#.....#.#.........#.......#.#.....#  
  #.###########.###.#.#.###.###.#.###.#.#####.#####.#####.#.#.#######.#.#####.#.#.#.#######.#####.#.#.###  
  #.....#.#.....#...#.#.....#.#.#.....#.....#...#...#...#.#.#.#.......#.#.#.#.#.#.#.#...........#...#.#.#  
  #.#####.#####.#.#######.###.#.#####.#.#####.#######.###.#.###.#######.#.#.###.#########.###.###.#####.#  
  #.#.#.#...#.#...#.........#.......#.#...#.........#.#.#.#...#.#...#.#.#.........#.#.#...#...#.#.....#.#  
  #.#.#.###.#.###.#.###########.#.#####.###.###.#####.#.#.###.#.#.###.#.###.#.#.###.#.#.#######.###.###.#  
  #.#.#.......#.#.#.#...#.......#.#.......#...#.#.#.......#...#.....#.......#.#.....#...#.....#...#...#.#  
  #.#.#######.#.#######.#######.#######.###.#.#.#.###.#.#.#.###.###.###.#####.#.#####.#######.#.#####.#.#  
  #...#...#.#.....#.......#.#.#.....#...#...#.#.#.#...#.#.#...#...#.#.#.....#.#...#.#...#...#.#...#.....#  
  #.###.###.###.###.#####.#.#.###.#.###.###.#####.#######.###.###.###.#.#.#########.#.#####.#.#.#####.#.#  
  #.....#.........#.#.......#.#...#.#.....#...#.#.....#...#...#.#.....#.#.#.#...#.............#.....#.#.#  
  ###.#########.#######.###.#.#.#####.###.###.#.#.#.#####.#.###.#####.#.###.###.###.###.#########.###.###  
  #...#.........#.#.#.#.#...........#.#.....#.....#...#...#.#.#.......#.#.#.....#.#...#...#...#.#.......#  
  ###.#########.#.#.#.###.#####.#.###.###.###.#.#.#.#####.#.#.#.#######.#.###.###.#.#######.###.#.#.###.#  
  #...#.....#.#.......#.#.#.....#...#.#...#...#.#.#.#.#...#...#.......#...................#.#.#...#.#.#.#  
  ###.#####.#.#.#.###.#.###.#####.#.###.###.#########.###.#.#.#######.###.#.#####.###.#####.#.#####.#.###  
  #.....#...#.#.#...#...#...#.#...#.#...#.........#.....#.#.#.#...#.#.#...#.....#.#.....#.#.............#  
  ###.#####.#.#.#############.#.#####.#.#.###.#.#####.###.###.#.###.#.#.#####.#####.#.#.#.#.#####.#######  
  #.....#.......#.....#.#.#.......#...#.#.#...#.#.........#.....#.....#...#.......#.#.#...#.#.......#...#  
  #.#.#######.#####.###.#.#######.#####.#####.#########.#####.#####.###.#######################.#######.#  
  #.#.#.#.......#.#.....#.#      Y     Z     L         U     D     H   G        #...#...#...#.....#...#.#  
  #.###.#####.#.#.#.#####.#      A     H     U         O     H     S   U        #.###.#####.###.#####.#.#  
  #...#.#.#...#.#.......#.#                                                     #.#.....#.....#...#.#.#.#  
  ###.#.#.###.#####.#.#.#.#                                                     #.#.#####.###.#.###.#.#.#  
  #.......#.....#.#.#.#.#.#                                                   MZ........#.#.#.#.........#  
  ###.#.#####.#.#.#.#####.#                                                     #.#########.#.#.###.###.#  
  #...#.#...#.#.#...#.#...#                                                     #.#.#.#.........#...#...#  
  #.#####.###.#####.#.#.###                                                     #.#.#.#######.#.###.###.#  
ZH..................#...#.#                                                     #.#.....#.#.#.#.#...#....QV
  #.###.#####.#.###.#.#.#.#                                                     #.#.#.###.#.#.#########.#  
  #...#...#...#.#.....#...#                                                     #...#.........#.#.#...#.#  
  #####.#####.#####.#.###.#                                                     ###############.#.#.#####  
  #...#.#.....#.#.#.#.#....WT                                                 QV....#.....#...#.......#.#  
  #.###########.#.###.#.#.#                                                     ###.#.#.###.#.#.#.#.###.#  
  #...#.....#.#.#.#.#.#.#.#                                                     #.....#.....#...#.#.#...#  
  #.#.###.###.#.#.#.#######                                                     #############.#####.#.#.#  
UO..#......................BT                                                   #.#.#.#.#...#.#...#...#..LY
  #########################                                                     #.#.#.#.#.#######.#######  
  #...................#...#                                                     #.....#.............#.#.#  
  #.###.#.#####.#####.#.#.#                                                     ###.###.###.#######.#.#.#  
HO..#.#.#...#...#.....#.#.#                                                     #...#.....#...#.........#  
  #.#.#####.#####.#####.#.#                                                     ###.###.#####.###.#####.#  
  #.....#.#...#.....#...#..LY                                                 PY..#.........#.#.....#...#  
  #####.#.#########.#.###.#                                                     #.#.###.#.###########.###  
MM......#.....#.........#..IZ                                                   #...#...#.....#...#......HS
  ###########.###.#######.#                                                     ###########.#####.#######  
  #.........#...#.#.....#.#                                                   QW........#.#.#...#...#....MZ
  #.#######.#.###.#.#.#####                                                     #.###.###.#####.###.###.#  
  #.#.........#.#.#.#.....#                                                     #...#.#.......#.#...#...#  
  #.#.###.#.###.#.###.#####                                                     #####.#.#.#####.###.###.#  
  #.#.#...#...#.#.#........HR                                                   #.....#.#...#...#...#.#.#  
  #.#####.#####.#####.###.#                                                     #.#####.#.#####.###.#.#.#  
SH....#.................#.#                                                     #.......#...............#  
  ###.#####.#####.#########                                                     ###########.###.#####.###  
  #.#.#.#...#...#.#.#.....#                                                     #...#.....#.#.#.#...#.#.#  
  #.###.#######.###.#.###.#                                                     #.#.###.#.###.###.#####.#  
  #.#...#...#...#.....#.#.#                                                   JM..#.....#...#.....#...#..ZZ
  #.#.#####.#.#####.#.#.#.#                                                     #.###.###.#####.#.###.#.#  
  #...#.......#.....#.#...#                                                     #...#.#.....#.#.#.....#.#  
  #.#.#.###.#####.###.#.###                                                     #.#####.#####.#.#####.#.#  
BT..#.....#.........#.#....HO                                                   #.#...#.........#.#......PY
  #######.#.###.#.#####.###                                                     ###.#####.#####.#.#.#####  
LU....#...#.#...#.....#.#.#                                                     #...#.#.....#...#.#.#....UF
  ###.###.#####.#####.###.#                                                     ###.#.###########.#####.#  
  #.....#.#...#.#...#...#..UF                                                 LE........................#  
  #.#########.###.#.#####.#                                                     #####.#####.#.###########  
  #.......#.....#.#.#.#.#.#                                                     #.........#.#...#...#.#.#  
  ###.###.###.#.#.#.#.#.#.#                                                     #############.###.#.#.#.#  
  #.#.#.......#...#.......#                                                   UN....#.#...#.#.#...#...#..DQ
  #.#.#####.#.#.#.###.#.#.#                                                     #.###.#.###.#####.#.###.#  
  #.....#...#.#.#.#...#.#.#                                                     #.#.#...#.#...#.#.#.....#  
  #########.###.#######.#.#                                                     #.#.###.#.###.#.#.#####.#  
  #.....#.#.#.......#...#.#                                                     #.....................#.#  
  #####.#.#.#.###.#########    S       U         D     M           A       D    ###.#.#####.#.#####.###.#  
  #...#.....#.#...#...#.#.#    H       V         Q     M           B       S    #...#...#...#...#.....#.#  
  ###.#.###.#########.#.#.#####.#######.#########.#####.###########.#######.#######.#.###.###.###.#.###.#  
  #.....#.....#...#.............#...#.....#.........#.....#.#.......#.............#.#.#.....#...#.#...#.#  
  #.###.###.###.###.###.#####.#.###.#.###.###.###.###.#####.#.#######.#####.###.###.#####.#.#.###.#####.#  
  #.#...#.......#.....#.#.....#.#.......#.#...#.#.#.....#.#.......#.....#...#.....#.....#.#.#.#.....#.#.#  
  #.###.#.#.#####.#.#########.#.#####.#######.#.#.#.#.#.#.#.###.#.###.###########.###.#.#.###.#.#.#.#.#.#  
  #.#...#.#.....#.#...#.....#.#.#...#.......#...#.#.#.#.#.#.#...#.#...........#...#...#.#...#.#.#.#.#...#  
  ###.#.###.#######.#####.###.#####.#.#.#####.#######.###.###.#.#####.###################.#.#.###.#####.#  
  #...#.#...#...........#.........#...#...#.#...#.#.........#.#...#.#.....#.#.#...#.....#.#.#...#.#.....#  
  #####.###.#.#.#.#.#####.#####.###.#.#####.###.#.#.#.#.###.#.#####.#.#####.#.#.#######.#.#.#####.#.###.#  
  #...#...#.#.#.#.#.#.....#.#.....#.#.....#.....#.#.#.#...#.#.....#...............#.....#.#.....#.#...#.#  
  ###.#########.#.#########.#.###.###.#.###.#.###.#.#######.#####.###.###.###.#######.#.#.#########.#.###  
  #.............#...#.........#.#.#...#...#.#...#.....#.#.#.#.#.....#...#.#.....#.#.#.#...#.#.......#...#  
  #.#########.#.#.###.###.###.#.#####.#.#####.#######.#.#.#.#.###.###.#########.#.#.#####.#.#######.#.###  
  #.#.....#...#.#.#.#.#...#...#.#...#.#...#.........#.#.......#...#.#.#.......#...#...#.........#...#...#  
  #####.###.#.#.#.#.###.#.###.#.#.###.#######.#############.#####.#.#.#.###.#.#####.###.#.#.#.###.#.#.#.#  
  #.#.....#.#.#.#.#.#.#.#.#.........#...#.#.....#.....#.#.....#.....#.....#.#.#.#...#.#.#.#.#...#.#.#.#.#  
  #.#.###.###.###.#.#.###.###.###.###.###.###.#.###.###.###.#######.#####.#####.#.###.#.#.#.#.###.#.#.#.#  
  #...#.......#...#...#.#.#...#.#.#.#.......#.#.....#.#.#...#.........#.#...#.........#.#.#.#...#.#.#.#.#  
  #.#####.#.#.#######.#.#.#.#.#.#.#.###.###########.#.#.###.###.#######.#.###.###.###.#.###.#.#########.#  
  #.#.#...#.#.#.#.........#.#.#...#.......#.#...........#.#...#.......#.....#.#.#...#.#...#.#...#.....#.#  
  ###.#.#.#.###.###.###.#########.###.###.#.#####.#.#####.#.#######.#####.###.#.#####.###.###.#######.#.#  
  #.#...#.#.#.#.....#.#...#...#.....#.#.#.......#.#.#.......#.#.......#.......#.....#...#.#.......#...#.#  
  #.###.#.###.#.###.#.###.#.#.#.#####.#.###.#.###.#######.###.#.###.###.#######.#.#######.###.#.#.###.###  
  #.....#.#.....#...#.....#.#.......#.#.....#.#.....#.........#...#.#...........#.....#.....#.#.#.......#  
  #################################.###.#########.#########.###.#########.###############################  
                                   D   G         L         A   Y         Q                                 
                                   H   U         E         B   A         W                                 `;

const grid = input.split('\n').filter((l) => l.trim() !== '')
const width = grid[0].length - 4;
const height = grid.length - 4;
const map = {};

let firstHash = null;
for (let [y, x] of nRange(height, width)) {
  map[hash([x, y])] = grid[y + 2][x + 2];
}

// const inner_width = grid[Math.floor(grid.length / 2)].trim().split(" ");
// console.log(inner_width)

const getLabel = ([x, y]) => {
  let key = hash([x, y]);
  if (!['#', '.'].includes(map[key])) return null;
  const first = getNeighbors(x, y)
    .filter(([nx, ny]) => !['#', '.', ' '].includes(grid[ny + 2][nx + 2]))
    [0];
  if (first) {
    const [fx, fy] = first;
    const second = getNeighbors(fx, fy)
      .filter(([nx, ny]) => !['#', '.', ' '].includes(grid[ny + 2][nx + 2]))
      [0];
    if (second) {
      const [sx, sy] = second;
      if (fx < sx || fy < sy) {
        return `${grid[fy + 2][fx + 2]}${grid[sy + 2][sx + 2]}`;
      } else if (sx < fx || sy < fy) {
        return `${grid[sy + 2][sx + 2]}${grid[fy + 2][fx + 2]}`;
      }
    }
  }
  return null;
}

const portals: Record<string, Array<[number, number]>> = {}
for (let [y, x] of nRange(height, width)) {
  const label = getLabel([x, y]);
  if (!label) continue;
  portals[label] = portals[label] || [];
  portals[label].push([x, y]);
}

const paths = {};
for (let [label, locations] of Object.entries(portals)) {
  if (locations.length > 1) {
    paths[hash(locations[0])] = locations[1];
    paths[hash(locations[1])] = locations[0];
  }
}


const start = getMapPoints(map).filter(([x, y]) => getLabel([x, y]) == 'AA')[0];
const end = getMapPoints(map).filter(([x, y]) => getLabel([x, y]) == 'ZZ')[0];


const visited = new Set();
let toVisit: Array<[number, number]> = [ start ];
const isWall = (s) => s === '#' || s === ' ';
const lengths = { [hash(start)]: 0 };

while(true) {
  const pos = toVisit.shift();
  if (!pos) break;
  if (hash(pos) == hash(end)) {
    console.log("Done")
    console.log(lengths[hash(pos)])
    break;
  };
  const length = lengths[hash(pos)];
  visited.add(hash(pos));
  const neighbors = getNeighbors(...pos)
    .filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height)
    .filter((n) => !visited.has(hash(n)))
    .filter((n) => !(isWall(map[hash(n)])));



  neighbors.forEach((n) => {
    lengths[hash(n)] = length + 1;
  });

  const portal_neighbors = neighbors 
    .map(([x, y]) => paths[hash([x, y])])
    .filter((p) => !!p)

  portal_neighbors.forEach((n) => {
    lengths[hash(n)] = length + 2;
  });
  toVisit = toVisit.concat(neighbors.concat(portal_neighbors));
}
