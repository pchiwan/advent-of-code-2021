import path from "path";
import { readFile } from "../helpers";

function parseCommand(command) {
  return command.split(" ");
}

function main(input) {
  let xPos = 0;
  let yPos = 0;
  let aim = 0;

  for (let i = 0; i < input.length; i++) {
    const [op, strVal] = parseCommand(input[i]);
    const value = parseInt(strVal, 10);

    switch (op) {
      case "forward":
        xPos += value;
        yPos += aim * value;
        break;
      case "down":
        aim += value;
        break;
      case "up":
        aim -= value;
        break;
    }
  }

  return xPos * yPos;
}

console.log(main(readFile(path.resolve(__dirname, "puzzle-input.txt"))));
