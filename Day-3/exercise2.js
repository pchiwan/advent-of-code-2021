import path from "path";
import { readFile } from "../helpers";

function reduceByBitValue(input, bitIndex, mostCommon) {
  if (input.length === 1) {
    return input[0];
  }

  const bitZeroNumbers = [];
  const bitOneNumbers = [];

  for (let j = 0; j < input.length; j++) {
    if (input[j][bitIndex] === "0") {
      bitZeroNumbers.push(input[j]);
    } else {
      bitOneNumbers.push(input[j]);
    }
  }

  if (bitOneNumbers.length >= bitZeroNumbers.length) {
    return reduceByBitValue(
      mostCommon ? bitOneNumbers : bitZeroNumbers,
      bitIndex + 1,
      mostCommon
    );
  } else {
    return reduceByBitValue(
      mostCommon ? bitZeroNumbers : bitOneNumbers,
      bitIndex + 1,
      mostCommon
    );
  }
}

function main(input) {
  const oxygenGeneratorRatingBin = reduceByBitValue(input, 0, true);
  const co2ScrubberRatingBin = reduceByBitValue(input, 0, false);

  const oxygenGeneratorRating = parseInt(oxygenGeneratorRatingBin, 2);
  const co2ScrubberRating = parseInt(co2ScrubberRatingBin, 2);

  return oxygenGeneratorRating * co2ScrubberRating;
}

console.log(main(readFile(path.resolve(__dirname, "puzzle-input.txt"))));
