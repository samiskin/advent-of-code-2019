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