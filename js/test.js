

let digits = [0, 1, 2, 3, 4]
let genPermutations = function*(digits, used = new Set()) {
  for (let digit of digits) {
    if (used.has(digit)) continue;
    used.add(digit);
    for (let sub_perms of genPermutations(digits, used)) {
      yield [digit, ...sub_perms]
    }
    used.delete(digit);
  }
}

for (let perm of genPermutations(digits)) {
  console.log(perm)
}


