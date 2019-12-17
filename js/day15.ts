//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print, printGrid, hash, timeout, clamp, gcd, lcm, getNeighbors, bfs } from "./utils";
console.clear();
console.log("\n");
//---------------------------------------------------------------------------------

const input = "3,1033,1008,1033,1,1032,1005,1032,31,1008,1033,2,1032,1005,1032,58,1008,1033,3,1032,1005,1032,81,1008,1033,4,1032,1005,1032,104,99,1001,1034,0,1039,102,1,1036,1041,1001,1035,-1,1040,1008,1038,0,1043,102,-1,1043,1032,1,1037,1032,1042,1106,0,124,1001,1034,0,1039,1002,1036,1,1041,1001,1035,1,1040,1008,1038,0,1043,1,1037,1038,1042,1105,1,124,1001,1034,-1,1039,1008,1036,0,1041,1001,1035,0,1040,101,0,1038,1043,1002,1037,1,1042,1105,1,124,1001,1034,1,1039,1008,1036,0,1041,1001,1035,0,1040,101,0,1038,1043,102,1,1037,1042,1006,1039,217,1006,1040,217,1008,1039,40,1032,1005,1032,217,1008,1040,40,1032,1005,1032,217,1008,1039,9,1032,1006,1032,165,1008,1040,39,1032,1006,1032,165,1102,2,1,1044,1105,1,224,2,1041,1043,1032,1006,1032,179,1102,1,1,1044,1106,0,224,1,1041,1043,1032,1006,1032,217,1,1042,1043,1032,1001,1032,-1,1032,1002,1032,39,1032,1,1032,1039,1032,101,-1,1032,1032,101,252,1032,211,1007,0,72,1044,1105,1,224,1102,1,0,1044,1105,1,224,1006,1044,247,102,1,1039,1034,1002,1040,1,1035,1002,1041,1,1036,1002,1043,1,1038,1001,1042,0,1037,4,1044,1106,0,0,43,44,92,18,58,24,84,34,94,19,51,95,1,54,20,78,88,51,71,20,92,96,11,50,22,21,3,96,74,15,26,56,99,18,80,56,99,50,12,71,93,48,25,99,83,45,4,68,98,82,26,95,97,98,6,3,79,32,98,34,9,80,74,24,95,75,12,26,80,54,10,71,94,79,40,38,99,57,58,78,31,97,40,85,38,83,87,27,85,29,42,99,69,29,80,94,56,88,21,17,84,87,78,54,27,85,31,77,30,82,83,52,30,90,49,93,69,58,74,42,86,40,85,79,23,98,14,11,79,26,86,33,82,83,17,84,53,65,97,10,68,99,48,76,83,44,98,18,82,11,3,81,84,1,42,82,73,99,35,83,42,24,97,31,78,41,82,75,11,86,86,3,99,11,15,84,53,79,93,53,62,82,64,98,56,76,69,74,5,83,97,63,4,81,32,10,33,94,93,87,70,31,76,68,22,7,7,96,96,57,41,95,11,96,85,83,85,50,27,82,89,56,20,95,96,93,91,92,40,68,78,84,7,52,42,55,37,75,58,80,28,80,10,92,54,89,52,55,78,75,71,65,82,30,50,81,99,39,68,74,30,87,58,31,74,10,1,85,66,93,85,9,88,74,74,24,86,1,91,12,76,65,85,82,93,95,32,98,67,16,80,79,42,79,33,93,45,91,99,73,48,84,96,35,95,14,99,55,61,84,53,63,54,54,89,88,85,25,97,96,88,51,73,29,79,31,94,32,74,92,48,63,28,92,9,52,91,26,78,75,22,39,1,99,20,86,91,9,73,84,23,27,59,36,83,29,52,88,39,2,90,41,46,83,2,3,96,55,28,89,89,33,90,21,22,82,7,87,17,75,83,98,33,73,73,2,31,88,10,56,49,78,78,42,88,91,21,83,21,83,27,82,21,85,35,91,98,70,45,91,87,90,95,15,11,77,53,49,55,92,21,9,91,95,46,61,63,82,11,77,47,98,20,90,25,64,81,20,80,93,41,5,91,91,55,95,57,76,97,75,9,99,52,73,55,95,89,28,98,57,99,66,34,81,87,39,85,56,8,16,74,85,18,24,99,76,58,89,46,53,86,98,89,65,81,51,77,18,12,64,83,18,96,36,33,73,70,85,89,52,82,82,37,38,85,83,28,58,98,69,10,86,86,2,32,83,87,85,29,88,32,98,11,88,29,74,64,89,91,6,41,89,45,91,79,87,34,76,7,21,89,40,97,74,28,62,58,3,92,66,92,78,87,67,22,41,54,81,69,24,97,65,30,87,88,61,55,96,85,40,98,53,80,32,66,88,3,47,98,77,56,30,15,92,77,20,56,80,79,52,25,77,23,87,74,76,34,77,75,1,5,82,27,93,50,82,82,2,6,52,19,78,93,15,83,48,92,82,60,90,98,99,57,69,16,87,52,26,79,82,49,51,85,30,62,73,92,40,86,88,37,14,76,71,79,43,84,82,8,98,38,1,80,85,76,54,17,74,17,7,96,10,43,26,88,97,6,70,94,96,23,3,74,23,80,17,26,81,39,89,91,10,94,26,13,92,5,43,95,70,87,51,36,86,74,57,88,42,88,84,57,10,77,10,36,99,96,62,89,40,86,98,24,93,43,79,17,26,32,84,24,94,56,85,94,43,75,82,65,80,63,6,75,70,81,99,73,58,34,93,23,76,70,89,42,86,48,80,66,88,83,81,61,80,62,86,74,85,40,84,81,93,45,74,30,73,24,84,83,88,41,77,69,89,2,95,47,84,80,85,0,0,21,21,1,10,1,0,0,0,0,0,0";

type Program = {
  i: number;
  base: number;
  mem: Array<number>;
  inputQueue: Array<number>;
  inputHistory: Array<number>;
}

const createProgram = (source: string, memOverrides = {}): Program => {
  const base = {
    i: 0,
    base: 0,
    mem: source.split(',').map((a) => parseInt(a)).concat(range(2000).map(() => 0)),
    inputQueue: [],
    inputHistory: [],
  };
  Object.entries(memOverrides).forEach(([key, val]) => {
    base.mem[parseInt(key)] = val as number;
  });
  return base;
};

type ProgramResult = {
  type: 'input' | 'output' | 'halt';
  value?: number;
};

const digit = (num, i) => Math.floor(num / Math.pow(10,i - 1)) % 10;
const parseOp = (op) => [op % 100, digit(op, 3), digit(op, 4), digit(op, 5)];
const run = (prog: Program): ProgramResult => {
  const { mem, base, inputQueue } = prog;

  const getAddr = (i, mode, base) => {
    switch(mode) {
      case 0: return mem[i];
      case 1: return i;
      case 2: return base + mem[i];
      default: throw new Error("Invalid mode" + mode);
    }
  }
  const getArgs = (op) => {
    if ([3, 4, 9].includes(op)) return 2;
    if ([5, 6].includes(op)) return 3;
    if ([99].includes(op)) return 0;
    return 4;
  }

  while (true) {
    const { i } = prog;
    const [op, ...modes] = parseOp(mem[i]);
    if (op == 99) break;

    const addrs = range(getArgs(op), 1)
      .map((d) => getAddr(i + d, modes[d - 1], base));
    const vals = addrs.map(addr => mem[addr]);
    prog.i += getArgs(op);
    if (op === 1) {
      mem[addrs[2]] = vals[0] + vals[1];
    } else if (op === 2) {
      mem[addrs[2]] = vals[0] * vals[1];
    } else if (op === 3) {
      if (inputQueue.length === 0) {
        prog.i -= getArgs(op);
        return { type: 'input' };
      }

      prog.inputHistory.push(inputQueue[0]);
      mem[addrs[0]] = inputQueue.shift();
    } else if (op === 4) {
      return { type: 'output', value: vals[0] };
    } else if (op === 5) {
      if (vals[0] != 0) prog.i = vals[1];
    } else if (op === 6) {
      if (vals[0] == 0) prog.i = vals[1];
    } else if (op === 7) {
      mem[addrs[2]] = vals[0] < vals[1] ? 1 : 0;
    } else if (op === 8) {
      mem[addrs[2]] = vals[0] == vals[1] ? 1 : 0;
    } else if (op === 9) {
      prog.base += vals[0];
    }
  }
  return { type: 'halt' };
}

enum Dirs {
  N = 1,
  S = 2,
  W = 3,
  E = 4,
}
const getDirStr = (dir: Dirs) => {
  switch(dir) {
    case Dirs.N: return 'North';
    case Dirs.S: return 'South';
    case Dirs.W: return 'West';
    case Dirs.E: return 'East';
  }
}

const toDir = (start: [number, number], end: [number, number]): Dirs => {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (dx > 0) {
    return Dirs.E;
  } else if (dx < 0) {
    return Dirs.W;
  } else if (dy > 0) {
    return Dirs.N;
  } else if (dy < 0) {
    return Dirs.S;
  }
}

enum MapResult {
  WALL = 0,
  CLEAR = 1,
  OXYGEN = 2,
}


let map: Record<string, string> = {};

type ProgramPlus = Program & { pos: [number, number], length: number };
let progs: Array<ProgramPlus> = [ { ...createProgram(input), pos: [0, 0], length: 1 } ];

let oxygenPos = null;

const visited: Set<string> = new Set();
visited.add(hash(progs[0].pos));
while (true) {
  const prog = progs.shift();
  if (!prog) break;
  const [ x, y ] = prog.pos;
  for (let [nx, ny] of getNeighbors(x, y)) {
    if (visited.has(hash([nx, ny]))) continue;
    visited.add(hash([x, y]));

    const neighborProg = _.cloneDeep(prog) as ProgramPlus;

    const dir = toDir([x, y], [nx, ny]);
    neighborProg.inputQueue.push(dir);

    const { value } = run(neighborProg);
    if (value == MapResult.WALL) {
      map[hash([nx, ny])] = '#';
    } else if (value == MapResult.CLEAR) {
      map[hash([nx, ny])] = '.';
      neighborProg.pos = [nx, ny];
      neighborProg.length = neighborProg.length + 1;
      progs.push(neighborProg);
    } else {
      oxygenPos = [nx, ny];
      map[hash([nx, ny])] = 'O';
      neighborProg.pos = [nx, ny];
      neighborProg.length = neighborProg.length + 1;
      progs.push(neighborProg);
    }
  }
}
console.log("Found O at", oxygenPos);

let bfsGen = bfs(map, oxygenPos, (s) => s == '#');
let maxLen = 0;
while (true) {
  const { value, done } = bfsGen.next();
  if (done) break;
  const [ pos, len ] = value as any;
  maxLen = Math.max(maxLen, len as number);
}

console.log("Time to expand fully:", maxLen)
