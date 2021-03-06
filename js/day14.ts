//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print, printGrid, hash, timeout, clamp, gcd, lcm, searchSorted } from "./utils";
console.clear();
console.log("\n");
//---------------------------------------------------------------------------------

const instr = `
11 TDFGK, 1 LKTZ => 5 DMLM
2 PLWS, 10 CQRWX, 1 DQRM, 1 DXDTM, 1 GBNH, 5 FKPL, 1 JCSDM => 4 LMPH
2 FXBZT, 1 VRZND => 5 QKCQW
3 VRZND => 4 LKTZ
15 FKPL, 6 DNXHG => 6 ZFBTC
7 QFBZN => 3 FXBZT
151 ORE => 1 QZNXC
16 WCHD, 15 LWBQL => 3 MBXSW
13 DXDTM => 6 RCNV
1 MSXF, 1 VRZND => 9 SWBRL
109 ORE => 9 LSLQW
5 DNXHG => 5 GBNH
2 DZXGB => 6 VRZND
1 FKPL, 1 XPGX, 2 RCNV, 1 LGXK, 3 QBVQ, 7 GBJC => 9 SCXQ
3 DVHQD => 3 QXWFM
1 XKXPK, 1 DMLM => 9 HGNW
1 TSMCQ, 6 ZFBTC, 1 WCHD, 3 QBVQ, 7 QXWFM, 14 LWBQL => 9 TFMNM
17 NBVPR, 7 LJQGC => 9 LWBQL
3 NBVPR => 4 ZGVC
4 DNXHG => 2 CQRWX
1 RCKS, 3 LWBQL => 3 TSMCQ
3 LJCR, 15 JBRG => 7 TWBN
7 WZSH, 4 QXWFM => 3 JMCQ
9 SWBRL, 8 LJCR, 33 NLJH => 3 JMVG
1 CQRWX => 4 FZVM
6 LJQGC, 12 DVHQD, 15 HGNW => 4 RCKS
3 WCHD => 3 XPGX
6 JBRG, 1 NQXZM, 1 LJCR => 2 LJQGC
16 SDQK => 9 PLWS
2 QFBZN, 2 LSLQW => 4 MSXF
8 QZNXC => 6 NBVPR
1 NBVPR, 1 LKTZ => 5 LJCR
11 SWBRL, 2 QKCQW => 7 JBRG
7 JMCQ, 7 DVHQD, 4 BXPB => 8 DXDTM
1 WCHD => 7 QBVQ
2 CQRWX => 5 GBJC
4 JMVG => 4 BXPB
7 WZSH => 8 TDFGK
5 XLNR, 10 ZGVC => 6 DNXHG
7 RCNV, 4 MLPH, 25 QBVQ => 2 LGXK
1 DMLM => 3 XLNR
6 FZVM, 4 BGKJ => 9 JCSDM
7 LWBQL, 1 JCSDM, 6 GBJC => 4 DQRM
2 FXBZT, 2 QKCQW => 5 XKXPK
3 LMPH, 33 NQXZM, 85 MBXSW, 15 LWBQL, 5 SCXQ, 13 QZNXC, 6 TFMNM, 7 MWQTH => 1 FUEL
8 NQXZM, 6 TDFGK => 4 DVHQD
5 NQXZM, 2 TWBN => 7 CFKF
132 ORE => 3 DZXGB
6 QZNXC, 10 QFBZN => 3 NLJH
15 SWBRL, 1 QZNXC, 4 NBVPR => 7 WZSH
20 DNXHG => 3 SDQK
1 LJCR, 1 JBRG, 1 LKTZ => 4 NQXZM
16 JMVG, 1 LJQGC => 9 BGKJ
4 TSMCQ => 3 FKPL
1 CFKF => 2 WCHD
162 ORE => 3 QFBZN
18 WCHD => 5 MLPH
13 LJQGC, 1 SDQK => 9 MWQTH
`

const map: Record<string, [number, Record<string, number>]> = {};

// Create map
instr.trim().split('\n').forEach((str) => {
  const [ left, right ] = str.split('=>').map((s) => s.trim());
  let mats = left.split(',').map((s) => s.trim().split(' ')) as any;
  mats = Object.fromEntries(mats.map(([a, b]) => [b, parseInt(a)]))
  let [ rAmt, rMat ] = right.split(' ').map((s) => s.trim()) as any;
  rAmt = parseInt(rAmt);

  map[rMat] = [rAmt, mats]
})

let overflow = {};
const getOre = (res, amt, tier = 0) => {
  if (res === 'ORE') return amt;
  const [ amtPerRes, mats ] = map[res];
  const mult = Math.ceil(amt / amtPerRes);
  const extra = mult * amtPerRes - amt;
  overflow[res] = overflow[res] ?? 0;
  overflow[res] += extra;

  const nextReqs = Object.entries(mats).reduce((reqs, [mat, depAmt]: [string, number]) => {
    reqs[mat] = reqs[mat] ?? 0;
    reqs[mat] += depAmt * mult;
    return reqs;
  }, {})
  return Object.entries(nextReqs).reduce((sum, [mat, depAmt]: [string, number]) => {
    const remainder = Math.max(depAmt - (overflow[mat] || 0), 0);
    if (overflow[mat]) overflow[mat] -= (depAmt - remainder);
    return sum + getOre(mat, remainder, tier + 1);
  }, 0);
}
console.log("1 Fuel:", getOre('FUEL', 1))

let numJump = 3566 * 1000;
let ore = 1000000000000;
ore -= getOre('FUEL', numJump)
let count = numJump;

while (ore > 0) {
  count++;
  ore -= getOre('FUEL', 1);
}
console.log("Max Fuel:", count - 1) // 3566577
