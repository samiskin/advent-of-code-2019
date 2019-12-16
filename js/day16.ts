//---------------------------------------------------------------------------------
import { _, eq, neq, gt, lt, range, range2, nRange, print, printGrid, hash, timeout, clamp, gcd, lcm, getNeighbors } from "./utils";
console.clear();
console.log("\n");
//---------------------------------------------------------------------------------

const inputStr = '59755896917240436883590128801944128314960209697748772345812613779993681653921392130717892227131006192013685880745266526841332344702777305618883690373009336723473576156891364433286347884341961199051928996407043083548530093856815242033836083385939123450194798886212218010265373470007419214532232070451413688761272161702869979111131739824016812416524959294631126604590525290614379571194343492489744116326306020911208862544356883420805148475867290136336455908593094711599372850605375386612760951870928631855149794159903638892258493374678363533942710253713596745816693277358122032544598918296670821584532099850685820371134731741105889842092969953797293495';
const inputs = inputStr.split('').map((i) => parseInt(i));

const basePattern = [0, 1, 0, -1]
const getPatAt = (n: number, skip: number) => {
  skip += 1;
  const offset = skip % ((n + 1) * 4); 
  return basePattern[Math.floor(offset / (n + 1))];
}

let curInput = inputs;
for (let phase = 0; phase < 100; phase++) {
  let nextInput = [];
  for (let digit = 0; digit < inputs.length; digit++) {
      let sum = 0;
      for (let i = digit; i < inputs.length; i++) {
        sum += curInput[i] * getPatAt(digit, i);
      }
      const outDigit = Math.abs(sum) % 10;
      nextInput.push(outDigit);
  }
  curInput = nextInput;
}
console.log("P1:", curInput.slice(0, 8).join(''));

const longInputs = inputStr.repeat(10000).split('').map((i) => parseInt(i));
const start = parseInt(inputs.slice(0, 7).join(''));
for (let phase = 0; phase < 100; phase++) {
  let sum = 0;
  for (let digit = longInputs.length - 1; digit >= start; digit--) {
    sum += longInputs[digit];
    longInputs[digit] = sum % 10;
  }
}
console.log("P2:", longInputs.slice(start, start + 8).join(''));
