import path from "path";
import { readFile } from "../helpers";

function main(input) {
  let increased = 0;

  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      increased++;
    }
  }

  return increased;
}

console.log(main(readFile(path.resolve(__dirname, "puzzle-input.txt"))));
