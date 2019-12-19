export const _ = require("lodash");
export const eq = (a, b) => a === b;
export const neq = (a, b) => a !== b;
export const gt = (a, b) => a > b;
export const lt = (a, b) => a < b;
export const range = (num: number, skip: number = 0) =>
  Array.from("x".repeat(num))
    .map((x, i) => i)
    .filter(i => i >= skip);
export const range2 = (start: number, end: number) =>
  Array.from("x".repeat(end - start)).map((x, i) => i + start);
export const nRange = (start, ...nums: number[]): Array<Array<number>> => {
  if (nums.length === 0) return range(start).map((i) => [i]);
  const nested = (nRange as any)(...nums);
  return _.flatMap(range(start), ((i) => nested.map(nest => [i, ...nest])));
};
export const print = (col: string, ...args) => {
  const getNum = (color = col) => {
    switch(color) {
      case 'r':
      case 'red': return 31;
      case 'g':
      case 'green': return 32;
      case 'y':
      case 'yellow': return 33;
      case 'b':
      case 'blue': return 34;
      case 'm':
      case 'magenta': return 35;
      case 'c':
      case 'cyan': return 36;
      case 'w':
      case 'white': return 37;
      case 'rst':
      case 'clr':
      case 'reset': return 0;
    }
  }
  console.log(`\x1b[${getNum()}m`, ...args, `\x1b[${getNum('reset')}m`);
}
export const hash = ([x, y]) => `${x} ${y}`;
export const printGrid = (map, valOverrides = {}, posOverrides = {}) => {
  const points = Object.keys(map).filter((hash) => !!map[hash]).map((hash) => hash.split(' ').map((i) => parseInt(i)));
  const min_x = Math.min(...points.map(([x, y]) => x));
  const max_x = Math.max(...points.map(([x, y]) => x));
  const min_y = Math.min(...points.map(([x, y]) => y));
  const max_y = Math.max(...points.map(([x, y]) => y));

  for (let y_base of range(max_y - min_y + 1)) {
    let output = ''
    for (let x_base of range(max_x - min_x + 1)) {
      let [x, y] = [x_base + min_x, y_base + min_y];
      const posOverride = posOverrides[hash([x, y])];
      if (posOverride) {
        output += posOverride;
      } else {
        const value = map[hash([x, y])] ?? ' ';
        output += valOverrides[value] ?? value;
      }
    }
    console.log(output);
  }
}
export const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));
export const clamp = (val, lower, upper) => Math.max(Math.min(val, upper), lower);
export const gcd = (...nums: number[]) =>
  nums.reduce((ans, n) => {
    let x = Math.abs(ans);
    let y = Math.abs(n);
    while(y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  });
export const lcm = (...nums: number[]) =>
  nums.reduce((ans, n) => (n * ans) / gcd(ans, n));

export const getNeighbors = (x: number, y: number): Array<[number, number]>  => {
  return nRange(3, 3)
    .map(([dx, dy]) => [dx - 1, dy - 1])
    .filter(([dx, dy]) => Math.abs(dx) + Math.abs(dy) < 2)
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => nx !== x || ny !== y) as any
}
export function* bfs<T>(map: Record<string, T>, [sx, sy]: [number, number], isWall: (val: T) => boolean = (val) => !!val): Generator<[[number, number], number], Record<string, [number, number]>> {
  const visited = new Set();
  let toVisit: Array<[number, number]> = [[sx, sy]];
  const lengths = { [hash([sx, sy])]: 0 };
  const parents = {};
  while(true) {
    const pos = toVisit.shift();
    if (!pos) break;
    const length = lengths[hash(pos)];
    yield [pos, length];
    visited.add(hash(pos));
    const next = getNeighbors(...pos)
      .filter((n) => !visited.has(hash(n)))
      .filter((n) => !(isWall(map[hash(n)])));
    next.forEach((n) => {
      lengths[hash(n)] = length + 1;
      parents[hash(n)] = pos;
    });
    toVisit = toVisit.concat(next);
  }

  return parents;
}
export const backtrace = (parentsMap: Record<string, [number, number]>, [sx, sy]: [number, number]): Array<[number, number]> => {
  let curr: [number, number] = [sx, sy];
  let path = [];
  while(curr) {
    path.push(curr);
    curr = parentsMap[hash(curr)];
  }
  return path;
}
export function searchSorted<T>(haystack: Array<T>, target: T, bounds?: [number, number]);
export function searchSorted<T>(haystack: Array<T> | ((i: number) => T), target: T, bounds: [number, number]);
export function searchSorted<T>(haystack: Array<T> | ((i: number) => T), target: T, bounds: [number, number] = [0, haystack.length]) {
  const [min, max] = bounds;
  if (max <= min) return null;
  const pivot = Math.floor((max - min) / 2 + min);
  console.log(min, max, pivot)
  const candidate = typeof haystack === 'function' ? haystack(pivot) : haystack[pivot];
  if (_.isEqual(candidate, target)) {
    return pivot;
  } else {
    return searchSorted(haystack, target, [min, pivot])
      ?? searchSorted(haystack, target, [pivot + 1, max])
      ?? null;
  }
}

export type Program = {
  i: number;
  base: number;
  mem: Array<number>;
  inputQueue: Array<number>;
}

export const createProgram = (source: string, memOverrides = {}): Program => {
  const base = {
    i: 0,
    base: 0,
    mem: source.split(',').map((a) => parseInt(a)).concat(range(2000).map(() => 0)),
    inputQueue: [],
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
export const runProgram = (prog: Program): ProgramResult => {
  const { mem, inputQueue } = prog;

  const getAddr = (i, mode, base) => {
    switch(mode) {
      case 0: return prog.mem[i];
      case 1: return i;
      case 2: return base + prog.mem[i];
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
      .map((d) => getAddr(i + d, modes[d - 1], prog.base));
    const vals = addrs.map(addr => mem[addr] || 0);
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

      mem[addrs[0]] = prog.inputQueue.shift();
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

export const hashToPoint = (hash: string) =>
  hash.split(' ').map((i) => parseInt(i)) as [number, number];
export const getMapPoints = (map): Array<[number, number]> =>
  Object.keys(map).filter((hash) => !!map[hash]).map(hashToPoint) as any;

export const getDimensions = (map) => {
  const points = getMapPoints(map);
  const min_x = Math.min(...points.map(([x, y]) => x));
  const max_x = Math.max(...points.map(([x, y]) => x));
  const min_y = Math.min(...points.map(([x, y]) => y));
  const max_y = Math.max(...points.map(([x, y]) => y));
  return [min_x - max_x]
}

export const addPos = (p1: [number, number], p2: [number, number]): [number, number] => 
  [p1[0] + p2[0], p1[1] + p2[1]];

const heapify = <T>(arr: Array<T>, isHigher = (a, b) => a > b, i: number = 0) => {
  const curr = arr[i];
  const [ left, right ] = [ 2 * i + 1, 2 * i + 2];
  if (arr[left] && isHigher(arr[left], curr)) {
    arr[i] = arr[left];
    arr[left] = curr;
    heapify(arr, isHigher, left);
  } else if (arr[right] && isHigher(arr[right], curr)) {
    arr[i] = arr[right];
    arr[right] = curr;
    heapify(arr, isHigher, right);
  }
}

export class PriorityQueue<T> {
  elements: Array<T>;
  comparator: (a: T, b: T) => boolean;
  constructor(comparator: (a: T, b: T) => boolean = (a, b) => a > b, elements: Array<T> = []) {
    this.elements = elements;
    this.comparator = comparator;
  }

  top = () => this.elements[0];

  push = (e: T) => {
    this.elements.push(e);
    let child = this.elements.length - 1;
    let parent = Math.floor((child - 1) / 2);
    while (this.elements[parent] && this.comparator(e, this.elements[parent])) {
      this.elements[child] = this.elements[parent];
      this.elements[parent] = e;
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
  }

  pop = (): T => {
    const top = this.elements[0];
    this.elements[0] = this.elements[this.elements.length - 1]
    this.elements.pop();
    heapify(this.elements, this.comparator);
    return top;
  }


  print = () => {
    const toIndex = (depth: number, offset: number) => (Math.pow(2, depth) + offset) - 1;
    const toLevel = (i: number) => {
      const depth = Math.floor(Math.log2(i + 1));
      const offset = (i + 1) % Math.pow(2, depth);
      return [depth, offset];
    }
    for (let depth = 0; depth < toLevel(this.elements.length)[0]; depth++) {
      console.log(range(Math.pow(2, depth)).map((offset) => this.elements[toIndex(depth, offset)]));
    }
  }
}


