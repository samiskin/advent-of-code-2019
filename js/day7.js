const _ = require('lodash');
const input = `3,8,1001,8,10,8,105,1,0,0,21,34,51,68,89,98,179,260,341,422,99999,3,9,1001,9,4,9,102,4,9,9,4,9,99,3,9,1002,9,5,9,1001,9,2,9,1002,9,2,9,4,9,99,3,9,1001,9,3,9,102,3,9,9,101,4,9,9,4,9,99,3,9,102,2,9,9,101,2,9,9,1002,9,5,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99`
// const input = `3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0`
// const input = `3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`;

const range = (num, skip = 0) =>
  Array.from("x".repeat(num))
    .map((x, i) => i)
    .filter(i => i >= skip);

const runProgram = function* () {
  const mem = input.split(',').map((a) => parseInt(a))//.concat(range(2000).map(() => 0));
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
      console.warn("Got input", mem[addrs[0]]);
    } else if (op === 4) {
      console.warn("Outputting", vals[0]);
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

// const programs = [0, 1, 2, 3, 4].map(runProgram);
// programs.forEach((prog) => prog.next());
// let carry = 0;
// programs[0].next(0);
// carry = programs[0].next(carry).value;
// console.log("0", carry)
// programs[1].next(1);
// carry = programs[1].next(carry).value;
// console.log("1", carry)
// programs[2].next(2);
// carry = programs[2].next(carry).value;
// console.log("2", carry)
// programs[3].next(3);
// carry = programs[3].next(carry).value;
// console.log("3", carry)
// programs[4].next(4);
// carry = programs[4].next(carry).value;
// console.log("4", carry)

// const prog = runProgram();
// console.log(prog.next(0));
// console.log(prog.next(0));
// console.log(prog.next(0));
// console.log(prog.next(0));
// console.log("hi");

const allNums = [];
const numRange = [5, 9]
for (let a = numRange[0]; a <= numRange[1]; a++) {
  for (let b = numRange[0]; b <= numRange[1]; b++) {
    for (let c = numRange[0]; c <= numRange[1]; c++) {
      for (let d = numRange[0]; d <= numRange[1]; d++) {
        for (let e = numRange[0]; e <= numRange[1]; e++) {
          if ([a, b, c, d, e].toString() == _.uniq([a, b, c, d, e]).toString()) {
            allNums.push([a, b, c, d, e]);
          }
        }
      }
    }
  }
}

let max = 0;
const runSeqs = (inputs) => {
  const programs = [0, 1, 2, 3, 4].map(runProgram);
  programs.forEach((prog) => prog.next());
  let anyDone = false;
  let carry = 0;
  while (!anyDone) {
    programs.forEach((prog, i) => {
      prog.next(inputs[i]);
      const { value, done } = prog.next(carry);
      if (done) {
        anyDone = true;
      } else {
        carry = value;
      }
    });
  }
  return carry;
  // max = Math.max(carry, max);
}

console.log(Math.max(...allNums.map((seq) => runSeqs(seq))));
// console.log(max);







