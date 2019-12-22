//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print, printGrid, hash, timeout, clamp, gcd, lcm, getNeighbors, bfs, createProgram, runProgram, getMapPoints, addPos, hashToPoint, PriorityQueue, modinv, modexp } from "./utils";
console.clear();
console.log("\n");
//---------------------------------------------------------------------------------

console.log()

let input = `
cut -45
deal with increment 28
cut -9687
deal with increment 47
cut 7237
deal with increment 12
cut -9336
deal with increment 72
cut -9471
deal into new stack
cut -3034
deal with increment 5
cut -5333
deal with increment 69
cut -3998
deal with increment 20
cut 1217
deal with increment 40
cut -421
deal into new stack
cut 6883
deal with increment 7
cut 1897
deal with increment 57
cut -3069
deal with increment 10
cut -5522
deal with increment 64
cut 1422
deal with increment 55
cut 973
deal with increment 57
cut 1061
deal with increment 60
cut -5652
deal with increment 9
cut 2037
deal with increment 73
deal into new stack
cut -8727
deal with increment 59
cut -2227
deal into new stack
cut 467
deal with increment 39
deal into new stack
deal with increment 67
cut -3708
deal into new stack
cut 1394
deal with increment 42
cut -6618
deal with increment 21
deal into new stack
cut 9107
deal with increment 33
cut 892
deal with increment 32
deal into new stack
cut -7566
deal with increment 45
cut 5149
deal with increment 53
deal into new stack
deal with increment 71
cut -1564
deal with increment 68
cut 6372
deal with increment 2
cut -3799
deal with increment 39
cut -2830
deal with increment 63
cut -4758
deal with increment 38
cut -6179
deal with increment 16
cut -1023
deal into new stack
deal with increment 34
cut -8829
deal with increment 70
cut 9112
deal with increment 72
cut -4044
deal with increment 29
cut 3010
deal with increment 48
cut -9025
deal with increment 72
cut -8418
deal with increment 45
cut -4991
deal with increment 19
cut -6999
deal with increment 11
cut 1852
deal with increment 56
deal into new stack
deal with increment 39
`

enum Cmd {
  CUT = 'CUT',
  DEAL_INC = 'DEAL_INC',
  DEAL_NEW = 'DEAL_NEW',
};
const parseCommand = (cmd_str: string) => {
  if (cmd_str.startsWith('deal into')) {
    return { type: Cmd.DEAL_NEW };
  } else if (cmd_str.startsWith('deal with')) {
    let splits = cmd_str.split(' ');
    let n = parseInt(splits[splits.length - 1]);
    return { type: Cmd.DEAL_INC, value: n };
  } else if (cmd_str.startsWith('cut')) {
    let splits = cmd_str.split(' ');
    let n = parseInt(splits[splits.length - 1]);
    return { type: Cmd.CUT, value: n };
  }
}

const compose = ([A, B], [C, D], mod: number): [number, number] => {
  return [(A * C) % mod, (A * D + B) % mod];
}
const compressFn = (instructions, numCards) => {
  let f: [number, number] = [1, 0];
  for (let { type, value } of instructions.reverse()) {
    if (type === Cmd.CUT) {
      f = compose([1, value], f, numCards);
    } else if (type === Cmd.DEAL_NEW) {
      f = compose([-1, -1], f, numCards);
    } else if (type === Cmd.DEAL_INC) {
      f = compose([modinv(value, numCards), 0], f, numCards);
    }
  }
  return f;
}
const cardAt = ([A, b], pos, mod) => {
  let val = (A * pos + b) % mod;
  if (val < 0) val += mod;
  return val;
}
const findCard = (val, [A, b], numCards) => {
  return range(numCards).find((pos) => cardAt([A, b], pos, numCards) == val);
}

const numCardsP1 = 10007;
const fn = compressFn(input.trim().split('\n').map(parseCommand), numCardsP1);
console.log(findCard(2019, fn, numCardsP1))


const numCardsP2 = 119315717514047;
const numShuffles = 101741582076661;

const repeatFn = ([A, b], n, mod) => {
  if (n == 0) return [1, 0];
  if (n == 1) return [A, b];
  const half = Math.floor(n / 2);
  const overflow = n - half * 2;
  const halfFn = repeatFn([A, b], half, mod);
  const fullFn = compose(halfFn, halfFn, mod);
  const overflowFn = repeatFn([A, b], overflow, mod);
  return compose(overflowFn, fullFn, mod);
}
const p2fn = compressFn(input.trim().split('\n').map(parseCommand), numCardsP2);
const repeated = repeatFn(p2fn, numShuffles, numCardsP2);

// These give wrong answers becasue JavaScript cant handle the huge numbers
console.log(cardAt(repeated, 2020, numCardsP2))

console.log("done")
