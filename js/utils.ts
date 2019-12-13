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
export const nRange = (start, ...nums: number[]) => {
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
export const printGrid = (map, overrides = {}) => {
  const points = Object.keys(map).filter((hash) => !!map[hash]).map((hash) => hash.split(' ').map((i) => parseInt(i)));
  const min_x = Math.min(...points.map(([x, y]) => x));
  const max_x = Math.max(...points.map(([x, y]) => x));
  const min_y = Math.min(...points.map(([x, y]) => y));
  const max_y = Math.max(...points.map(([x, y]) => y));

  for (let y_base of range(max_y - min_y + 1)) {
    let output = ''
    for (let x_base of range(max_x - min_x + 1)) {
      let [x, y] = [x_base + min_x, y_base + min_y];
      const value = map[hash([x, y])] ?? ' ';
      output += overrides[value] ?? value;
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





