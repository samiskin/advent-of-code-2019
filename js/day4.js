let count = 0;
for (let i = 372037; i <= 905157; i++) {
  const digits = i.toString().split("").map(i => parseInt(i));
  const ascending = digits.every((num, i) => i == 0 || num >= digits[i - 1]);
  // const doubles = digits.findIndex((num, i) => i !== 0 && num === digits[i - 1]) >= 0;
  const doubles = digits.reduce(
    ([foundDouble, streak], num, i) => {
      if (i == 0 || foundDouble) return [foundDouble, 1];
      if (num == digits[i - 1]) {
        return [
          (i == digits.length - 1 ? streak == 1 : foundDouble),
          streak + 1
        ];
      } else {
        return [streak == 2, 1];
      }
    },
    [false, 0]
  )[0];
  if (ascending && doubles) {
    count++;
  }
}
console.log(count);
