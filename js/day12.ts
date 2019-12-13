//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print, printGrid, hash, timeout, clamp, gcd, lcm } from "./utils";
console.clear();
console.log("\n");
//---------------------------------------------------------------------------------

const input = `
<x=14, y=4, z=5>
<x=12, y=10, z=8>
<x=1, y=7, z=-10>
<x=16, y=-5, z=3>
`
const parseInput = (input) => input.trim().split('\n').map((s) => {
  const [,x,y,z] = ((/<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/g).exec(s));
  return [parseInt(x), parseInt(y), parseInt(z)];
});

let positions: Array<[number, number, number]> = parseInput(input);
let velocities = positions.map(() => [0, 0, 0]);

for (let i of range(1000)) {
  velocities = positions.map(([x, y, z], i) =>
    positions.reduce(([vx, vy, vz], [x2, y2, z2]) =>
      [vx + clamp(x2 - x, -1, 1), vy + clamp(y2 - y, -1, 1), vz + clamp(z2 - z, -1, 1)]
    , velocities[i])
  );

  positions = positions.map(([x, y, z], i) => {
    const [vx, vy, vz] = velocities[i];
    return [x + vx, y + vy, z + vz];
  })
}

const energies = positions.map((coords, i) => {
  return coords.map((n) => Math.abs(n)).reduce((sum, n) => sum + n, 0)
    * velocities[i].map((n) => Math.abs(n)).reduce((sum, n) => sum + n, 0);
});
console.log(energies)
console.log(energies.reduce((sum, e) => sum + e), 0)



const numStable = (positions: Array<number>) => {
  let initPositions = positions;
  let velocities = positions.map(() => 0);
  let count = 0;
  do {
    count++;
    velocities = positions.map((p, i) =>
      positions.reduce((v, p2) =>
        v + clamp(p2 - p, -1, 1)
      , velocities[i])
    );
    positions = positions.map((p, i) => p + velocities[i]);
  } while (!_.isEqual(initPositions, positions) && !_.isEqual(velocities, [0, 0, 0])) 
    console.log(positions, velocities)
    return count + 1;
}

positions = parseInput(input);
const periods = range(3).map((i) => numStable(positions.map((coords) => coords[i])));
console.log(lcm(...periods));





















