import path from "path";
import { readFile } from "../helpers";

function main(input) {
  let increased = 0;

  for (let i = 2; i < input.length; i++) {
    if (i === input.length - 1) {
      break;
    }

    const previousWindowSum = input[i - 2] + input[i - 1] + input[i];
    const currentWindowSum = input[i - 1] + input[i] + input[i + 1];

    if (currentWindowSum > previousWindowSum) {
      increased++;
    }
  }

  return increased;
}

const sampleInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

console.log(main(readFile(path.resolve(__dirname, "puzzle-input.txt"))));
