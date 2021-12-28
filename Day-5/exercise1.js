import path from "path";

import { readFile } from "../helpers";

function getStartAndEnd(numA, numB) {
  return [Math.min(numA, numB), Math.max(numA, numB)];
}

function addHorizontalLine(ventMap, [x1, y1], x2) {
  const [start, end] = getStartAndEnd(x1, x2);
  for (let x = start; x <= end; x++) {
    const key = `${x},${y1}`;
    ventMap[key] = ventMap[key] ? ventMap[key] + 1 : 1;
  }
}

function addVerticalLine(ventMap, [x1, y1], y2) {
  const [start, end] = getStartAndEnd(y1, y2);
  for (let y = start; y <= end; y++) {
    const key = `${x1},${y}`;
    ventMap[key] = ventMap[key] ? ventMap[key] + 1 : 1;
  }
}

function getCoord(input) {
  return input
    .trim()
    .split(",")
    .map((x) => parseInt(x, 10));
}

function main(input) {
  const ventMap = {};

  for (let i = 0; i < input.length; i++) {
    const coords = input[i].split("->");
    const [x1, y1] = getCoord(coords[0]);
    const [x2, y2] = getCoord(coords[1]);

    if (y1 === y2) {
      addHorizontalLine(ventMap, [x1, y1], x2);
    }
    if (x1 === x2) {
      addVerticalLine(ventMap, [x1, y1], y2);
    }
  }

  return Object.values(ventMap).filter((v) => v > 1).length;
}

console.log(main(readFile(path.resolve(__dirname, "puzzle-input.txt"))));
