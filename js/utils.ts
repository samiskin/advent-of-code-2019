import * as lodash from 'lodash';
export const _ = lodash;

export const eq = (a: any, b: any) => a === b;
export const neq = (a: any, b: any) => a !== b;
export const gt = (a: any, b: any) => a > b;
export const lt = (a: any, b: any) => a < b;

export const range = (num: number, skip: number = 0) =>
  Array.from("x".repeat(num))
    .map((_x, i) => i)
    .filter(i => i >= skip);
export const range2 = (start: number, end: number) =>
  Array.from("x".repeat(end - start)).map((_x, i) => i + start);
export const nRange = (start: number, ...nums: number[]): Array<Array<number>> => {
  if (nums.length === 0) return range(start).map((i) => [i]);
  const nested = (nRange as any)(...nums);
  return _.flatMap(range(start), ((i: number) => nested.map((nest: Array<number>) => [i, ...nest])));
};

export const print = (col: string, ...args: unknown[]) => {
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

export const printGrid = <T>(map: Record<string, T>, valOverrides = {}, posOverrides = {}) => {
  const points = Object.keys(map).filter((hash) => !!map[hash]).map((hash) => hash.split(' ').map((i) => parseInt(i)));
  const min_x = Math.min(...points.map(([x, _y]) => x));
  const max_x = Math.max(...points.map(([x, _y]) => x));
  const min_y = Math.min(...points.map(([_x, y]) => y));
  const max_y = Math.max(...points.map(([_x, y]) => y));

  for (let y_base of range(max_y - min_y + 1)) {
    let output = ''
    for (let x_base of range(max_x - min_x + 1)) {
      let [x, y] = [x_base + min_x, y_base + min_y];
      const posOverride = posOverrides[hash([x, y])];
      if (posOverride) {
        output += posOverride;
      } else {
        const value = map[hash([x, y])] ?? ' ';
        output += valOverrides[value as string] ?? value;
      }
    }
    console.log(output);
  }
}

export const timeout = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const clamp = (val: number, lower: number, upper: number) => Math.max(Math.min(val, upper), lower);

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

export const getNeighbors = ([x, y]: [number, number], includeDiag: boolean = false): Array<[number, number]>  => {
  return nRange(3, 3)
    .map(([dx, dy]) => [dx - 1, dy - 1])
    .filter(([dx, dy]) => includeDiag || (Math.abs(dx) + Math.abs(dy) < 2))
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => nx !== x || ny !== y) as any
}

export function bfs<T>(options: {
  map: Record<string, T>,
  start: [number, number],
  isWall?: (val: T) => boolean,
  visitor?: (pos: [number, number], dist?: number, parent?: [number, number]) => unknown
}) {
  const defaults = { isWall: (val: T) => !!val, visitor: _.noop };
  const { map, start, isWall, visitor } = { ...defaults, ...options };

  const visited = new Set();
  let toVisit: Array<[number, number]> = [start];
  const data = {
    [hash(start)]: { length: 0, parent: null },
  };

  while(true) {
    const pos = toVisit.shift();
    if (!pos) break;
    const { length, parent } = data[hash(pos)];
    visitor(pos, length, parent);
    visited.add(hash(pos));
    const next = getNeighbors(pos)
      .filter((n) => !visited.has(hash(n)))
      .filter((n) => !(isWall(map[hash(n)])));
    next.forEach((n) => {
      data[hash(n)] = {
        length: length + 1,
        parent: pos
      };
    });
    toVisit = toVisit.concat(next);
  }

  return data;
}

export const bfsPq = <State>(options: {
  start: State;
  hashState: (s: State) => string | number;
  getNeighbors: (pos: State) => Array<State>;
  isGoal: (s: State) => boolean;
  compare: (a: State, b: State) => -1 | 0 | 1;
  visitor?: (state: State, parent?: State) => unknown;
}): State => {
  const defaultOptions = { visitor: _.noop };
  const { start, hashState, getNeighbors, isGoal, compare, visitor } = {
    ...defaultOptions,
    ...options
  };

  const toVisit = new PriorityQueue([start], compare);
  // const toVisit = new TinyQueue([start], compare);
  const visited = new Set();

  while (toVisit.peek() !== undefined) {
    const state = toVisit.pop() as State;
    const cacheKey = hashState(state);
    if (visited.has(cacheKey)) continue;
    visited.add(cacheKey);
    visitor(state);

    if (isGoal(state)) {
      return state;
    }

    for (let neighbor of getNeighbors(state)) {
      toVisit.push(neighbor);
    }
  }

  return null;
};

export const backtrack = (bfsData: Record<string, { parent: [number, number] | null }>, [sx, sy]: [number, number]): Array<[number, number]> => {
  let curr: [number, number] = [sx, sy];
  let path = [];
  while(curr) {
    path.push(curr);
    const next = bfsData[hash(curr)];
    curr = next.parent;
  }
  return path;
}

export function searchSorted<T>(haystack: Array<T>, target: T, bounds?: [number, number]): number | null;
export function searchSorted<T>(haystack: Array<T> | ((i: number) => T), target: T, bounds: [number, number]): number | null;
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

const digit = (num: number, i: number) => Math.floor(num / Math.pow(10,i - 1)) % 10;
const parseOp = (op: number) => [op % 100, digit(op, 3), digit(op, 4), digit(op, 5)];
export const runProgram = (prog: Program): ProgramResult => {
  const { mem, inputQueue } = prog;

  const getAddr = (i: number, mode: number, base: number) => {
    switch(mode) {
      case 0: return prog.mem[i];
      case 1: return i;
      case 2: return base + prog.mem[i];
      default: throw new Error("Invalid mode" + mode);
    }
  }
  const getArgs = (op: number) => {
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

export const getMapPoints = (map: Record<string, unknown>): Array<[number, number]> =>
  Object.keys(map).filter((hash) => !!map[hash]).map(hashToPoint) as any;

export const getDimensions = (map: Record<string, unknown>) => {
  const points = getMapPoints(map);
  const min_x = Math.min(...points.map(([x, _y]) => x));
  const max_x = Math.max(...points.map(([x, _y]) => x));
  const min_y = Math.min(...points.map(([_x, y]) => y));
  const max_y = Math.max(...points.map(([_x, y]) => y));
  return [max_x - min_x, max_y - min_y];
}

export const addPos = (p1: [number, number], p2: [number, number]): [number, number] => 
  [p1[0] + p2[0], p1[1] + p2[1]];

const heapify = <T>(arr: Array<T>, compare: (a: T, b: T) => -1 | 0 | 1, i: number = 0) => {
  const curr = arr[i];
  const [ left, right ] = [ 2 * i + 1, 2 * i + 2];
  if (arr[left] && compare(arr[left], curr) > 0) {
    arr[i] = arr[left];
    arr[left] = curr;
    heapify(arr, compare, left);
  } else if (arr[right] && compare(arr[right], curr) > 0) {
    arr[i] = arr[right];
    arr[right] = curr;
    heapify(arr, compare, right);
  }
}

export class PriorityQueue<T> {
  data: Array<T>;
  comparator: (a: T, b: T) => -1 | 0 | 1;
  constructor(data: Array<T> = [], comparator: (a: T, b: T) => -1 | 0 | 1 = PriorityQueue.defaultCompare) {
    this.data = data;
    this.comparator = comparator;
  }

  peek = () => this.data[0];

  push = (e: T) => {
    this.data.push(e);
    this._bubbleUp(this.data.length - 1);
  }

  pop = (): T => {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.data.length > 0) {
        this.data[0] = bottom;
        this._bubbleDown(0);
    }

    return top;
  }

  _bubbleUp = (pos: number) => {
    const compare = this.comparator;
    const item = this.data[pos];

    while (pos > 0) {
        const parent = (pos - 1) >> 1;
        const current = this.data[parent];
        if (compare(item, current) >= 0) break;
        this.data[pos] = current;
        pos = parent;
    }

    this.data[pos] = item;
  }

  _bubbleDown = (pos: number) => {
    const { data, comparator } = this;
    if (pos >= this.data.length) return;

    const halfLength = this.data.length >> 1;
    const item = data[pos];

    while (pos < halfLength) {
      let left = (pos << 1) + 1;
      let best = data[left];
      const right = left + 1;

      if (right < this.length && comparator(data[right], best) < 0) {
          left = right;
          best = data[right];
      }
      if (comparator(best, item) >= 0) break;

      data[pos] = best;
      pos = left;
    }

    data[pos] = item;
  }

  print = () => {
    const toIndex = (depth: number, offset: number) => (Math.pow(2, depth) + offset) - 1;
    const toLevel = (i: number) => {
      const depth = Math.ceil(Math.log2(i + 1));
      const offset = (i + 1) % Math.pow(2, depth);
      return [depth, offset];
    }
    const maxDepth = toLevel(this.data.length - 1)[0];
    for (let depth = 0; depth < maxDepth; depth++) {
      console.log(range(Math.pow(2, depth)).map((offset) => this.data[toIndex(depth, offset)]));
    }
  }

  get length() {
    return this.data.length;
  }

  static defaultCompare<T>(a: T, b: T) {
      return a < b ? -1 : a > b ? 1 : 0;
  }
}

export const intersperse = <T, V>(arr: Array<T>, separator: V) => {
  return arr.reduce((acc, el, i) => {
    acc.push(el);
    if (i < arr.length - 1)  {
      acc.push(separator)
    }
    return acc;
  }, [] as Array<T | V>);
}
