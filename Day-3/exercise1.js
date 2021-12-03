import path from "path";
import { readFile } from "../helpers";

function main(input) {
  const numberLen = input[0].length;
  const gammaRatingBin = [];
  const epsilonRatingBin = [];

  for (let i = 0; i < numberLen; i++) {
    let zeroes = 0;
    let ones = 0;

    for (let j = 0; j < input.length; j++) {
      if (input[j][i] === "0") {
        zeroes++;
      } else {
        ones++;
      }
    }

    if (zeroes > ones) {
      gammaRatingBin.push(0);
      epsilonRatingBin.push(1);
    } else {
      gammaRatingBin.push(1);
      epsilonRatingBin.push(0);
    }
  }

  const gammaRating = parseInt(gammaRatingBin.join(""), 2);
  const epsilonRating = parseInt(epsilonRatingBin.join(""), 2);

  return gammaRating * epsilonRating;
}

console.log(main(readFile(path.resolve(__dirname, "puzzle-input.txt"))));
