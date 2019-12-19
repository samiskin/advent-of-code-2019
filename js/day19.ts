//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print, printGrid, hash, timeout, clamp, gcd, lcm, getNeighbors, bfs, createProgram, runProgram, getMapPoints, addPos, pointsFromHash } from "./utils";
console.clear();
console.log("\n");
//---------------------------------------------------------------------------------
const inputStr = `109,424,203,1,21101,0,11,0,1105,1,282,21101,0,18,0,1106,0,259,2102,1,1,221,203,1,21102,31,1,0,1105,1,282,21101,38,0,0,1105,1,259,21001,23,0,2,21201,1,0,3,21101,0,1,1,21101,0,57,0,1106,0,303,1202,1,1,222,20102,1,221,3,21002,221,1,2,21101,259,0,1,21102,80,1,0,1106,0,225,21101,0,189,2,21102,91,1,0,1105,1,303,2102,1,1,223,20101,0,222,4,21102,259,1,3,21101,225,0,2,21102,225,1,1,21102,1,118,0,1105,1,225,21001,222,0,3,21102,1,57,2,21102,1,133,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21102,148,1,0,1106,0,259,1202,1,1,223,21001,221,0,4,20101,0,222,3,21101,0,24,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21101,195,0,0,106,0,108,20207,1,223,2,20102,1,23,1,21102,-1,1,3,21101,0,214,0,1106,0,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1201,-4,0,249,22101,0,-3,1,22101,0,-2,2,22102,1,-1,3,21102,250,1,0,1106,0,225,22101,0,1,-4,109,-5,2106,0,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2106,0,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,21201,-2,0,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,21201,-2,0,3,21102,343,1,0,1105,1,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,21201,-4,0,1,21101,384,0,0,1106,0,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,22102,1,1,-4,109,-5,2105,1,0`;

const checkPoint = (pos: [number, number]) => {
  const prog = createProgram(inputStr);
  prog.inputQueue.push(...pos);
  const output = runProgram(prog);
  return output.value;
}

console.log(
  nRange(50, 50).filter(([x, y]) => checkPoint([x, y]) == 1).length
);

let map = {};
const pointOffsets: Array<[number, number]> = [[0, 0], [99, 0], [0, 99]];
let x = 0;
let y = 0;
while(true) {
  const points = pointOffsets.map((pos) => addPos(pos, [x, y]));
  if (checkPoint(points[1]) == 0) {
    y += 1;
  } else if (checkPoint(points[2]) == 0) {
    x += 1;
  }
  if (points.every((pos) => checkPoint(pos))) {
    console.log(x, y, x * 10000 + y);
    break
  }
}
