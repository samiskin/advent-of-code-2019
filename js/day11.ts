//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print } from "./utils";
console.clear();
console.log("\n");
//---------------------------------------------------------------------------------

const input = '3,8,1005,8,324,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1001,8,0,29,1,1107,14,10,1006,0,63,1006,0,71,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,61,1,103,18,10,1006,0,14,1,105,7,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,94,1006,0,37,1006,0,55,2,1101,15,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,101,0,8,126,2,1006,12,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1001,8,0,152,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,101,0,8,173,1006,0,51,1006,0,26,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,202,2,8,18,10,1,103,19,10,1,1102,1,10,1006,0,85,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,238,2,1002,8,10,1006,0,41,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,101,0,8,267,2,1108,17,10,2,105,11,10,1006,0,59,1006,0,90,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1001,8,0,304,101,1,9,9,1007,9,993,10,1005,10,15,99,109,646,104,0,104,1,21102,936735777688,1,1,21101,341,0,0,1105,1,445,21101,0,937264173716,1,21101,352,0,0,1106,0,445,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,3245513819,0,1,21102,1,399,0,1105,1,445,21102,1,29086470235,1,21102,410,1,0,1105,1,445,3,10,104,0,104,0,3,10,104,0,104,0,21101,825544712960,0,1,21102,1,433,0,1106,0,445,21102,825460826472,1,1,21101,0,444,0,1106,0,445,99,109,2,22102,1,-1,1,21101,0,40,2,21101,0,476,3,21102,466,1,0,1105,1,509,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,471,472,487,4,0,1001,471,1,471,108,4,471,10,1006,10,503,1101,0,0,471,109,-2,2106,0,0,0,109,4,2101,0,-1,508,1207,-3,0,10,1006,10,526,21101,0,0,-3,21202,-3,1,1,21201,-2,0,2,21101,0,1,3,21101,0,545,0,1105,1,550,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,573,2207,-4,-2,10,1006,10,573,21202,-4,1,-4,1106,0,641,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21101,0,592,0,1105,1,550,22101,0,1,-4,21101,1,0,-1,2207,-4,-2,10,1006,10,611,21102,1,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,633,22101,0,-1,1,21102,633,1,0,105,1,508,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0';

const runProgram = function* () {
  const mem = input.split(',').map((a) => parseInt(a)).concat(range(2000).map(() => 0));
  const digit = (num, i) => Math.floor(num / Math.pow(10,i - 1)) % 10;
  const parseOp = (op) => [op % 100, digit(op, 3), digit(op, 4), digit(op, 5)];

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
    return 4;
  }

  let base = 0;

  for (let i = 0;;) {
    const [op, ...modes] = parseOp(mem[i]);
    if (op == 99) break;

    const addrs = range(getArgs(op), 1)
      .map((d) => getAddr(i + d, modes[d - 1], base));
    const vals = addrs.map(addr => mem[addr]);
    i += getArgs(op);
    if (op === 1) {
      mem[addrs[2]] = vals[0] + vals[1];
    } else if (op === 2) {
      mem[addrs[2]] = vals[0] * vals[1];
    } else if (op === 3) {
      mem[addrs[0]] = yield;
    } else if (op === 4) {
      yield vals[0];
    } else if (op === 5) {
      if (vals[0] != 0) i = vals[1];
    } else if (op === 6) {
      if (vals[0] == 0) i = vals[1];
    } else if (op === 7) {
      mem[addrs[2]] = vals[0] < vals[1] ? 1 : 0;
    } else if (op === 8) {
      mem[addrs[2]] = vals[0] == vals[1] ? 1 : 0;
    } else if (op === 9) {
      base += vals[0];
    }
  }
}


const hash = ([x, y]) => `${x} ${y}`;
let coord: [number, number] = [0, 0];
enum Dirs {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
};
enum Cols {
  BLACK = 0,
  WHITE = 1,
};
let dir = Dirs.UP;

const prog = runProgram();

const map = {};
map[hash(coord)] = 1;

while (true) {
  prog.next();
  const color = map[hash(coord)] ? 1 : 0;
  const { value: col, done } = prog.next(color);
  if (col === Cols.WHITE) {
    map[hash(coord)] = 1;
  } else {
    map[hash(coord)] = 0;
  }
  const { value: next_dir, done: done2 } = prog.next();
  if (next_dir == 0) {
    dir = (dir + 4 - 1) % 4;
  } else {
    dir = (dir + 4 + 1) % 4;
  }

  if (dir == Dirs.UP) {
    coord = [coord[0], coord[1] + 1];
  } else if (dir == Dirs.RIGHT) {
    coord = [coord[0] + 1, coord[1]];
  } else if (dir == Dirs.DOWN) {
    coord = [coord[0], coord[1] - 1];
  } else if (dir == Dirs.LEFT) {
    coord = [coord[0] - 1, coord[1]];
  }

  if (done || done2) {
    break;
  }
}

const points = Object.keys(map).filter((hash) => !!map[hash]).map((hash) => hash.split(' ').map((i) => parseInt(i)));
const min_x = Math.min(...points.map(([x, y]) => x));
const max_x = Math.max(...points.map(([x, y]) => x));
const min_y = Math.min(...points.map(([x, y]) => y));
const max_y = Math.max(...points.map(([x, y]) => y));

for (let y_base of range(max_y - min_y + 1).reverse()) {
  let output = ''
  for (let x_base of range(max_x - min_x + 1)) {
    let [x, y] = [x_base + min_x, y_base + min_y];
    output += map[hash([x, y])] ? '##' : '  ';
  }
  console.log(output);
}


console.log(Object.keys(map).length);
