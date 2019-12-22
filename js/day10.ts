//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print } from "./utils";
console.clear();
console.log("\n");
//---------------------------------------------------------------------------------

// p1 210, p2 [8, 2]
const input_p2 = `
.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;
// 8
const input_p1 = `
.#..#
.....
#####
....#
...##
`;

const input = input_p2.trim().split("\n");
const get = (x, y) => input[y][x];

const getAngle = (sx, sy, dx, dy) => {
  const v1 = { x: 0, y: -1 };
  const v2 = { x: sx - dx, y: dy - sy };
  let angle = Math.atan2(v1.y, v1.x) - Math.atan2(v2.y, v2.x);
  if (angle < 0) angle += 2 * Math.PI;
  return (angle * 180) / Math.PI;
};

const asteroids = nRange(input[0].length, input.length).filter(
  ([x, y]) => get(x, y) == "#"
);
const dist = (p1, p2) => (p2[0] - p1[0]) ^ (2 + (p2[1] - p1[1])) ^ 2;

const getVisible = (sx, sy) => {
  const groups = _.groupBy(
    asteroids.filter(([x, y]) => x !== sx || y !== sy),
    ([x, y]) => getAngle(sx, sy, x, y)
  );
  const sortedByDist = _.mapValues(groups, roids =>
    roids.sort((p1, p2) => dist([sx, sy], p2) - dist([sx, sy], p1))
  );
  return Object.entries(sortedByDist).sort(
    ([a], [b]) => parseFloat(a) - parseFloat(b)
  ) as Array<[string, Array<[number, number]>]>;
};

const best = _.maxBy(
  asteroids,
  ([x, y]) => getVisible(x, y).length
) as [number, number];
const visibles = getVisible(best[0], best[1]);
console.log(best, visibles.length);

for (let count = 0; count < 10; ) {
  for (let [, group] of visibles) {
    count++;
    if (count == 200) {
      console.log(group[0]);
    }
    group.shift();
  }
}
