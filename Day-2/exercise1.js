import path from "path";
import { readFile } from "../helpers";

function parseCommand(command) {
  return command.split(" ");
}

function main(input) {
  let xPos = 0;
  let yPos = 0;

  for (let i = 0; i < input.length; i++) {
    const [op, strVal] = parseCommand(input[i]);
    const value = parseInt(strVal, 10);

    switch (op) {
      case "forward":
        xPos += value;
        break;
      case "down":
        yPos += value;
        break;
      case "up":
        yPos -= value;
        break;
    }
  }

  return xPos * yPos;
}

console.log(main(readFile(path.resolve(__dirname, "puzzle-input.txt"))));
