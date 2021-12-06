import path from "path";

import { readFile } from "../helpers";

const BOARD_LINES = 5;
const BOARD_COLUMNS = 5;

function getBingoBoards(input) {
  const bingoBoards = [];

  for (let i = 0; i < input.length; i = i + 6) {
    const board = [];
    for (let j = 0; j < BOARD_LINES; j++) {
      const line = [];
      const fileLine = input[i + j].split(" ").filter(Boolean);
      for (let k = 0; k < BOARD_COLUMNS; k++) {
        line.push({
          val: parseInt(fileLine[k], 10),
          marked: false,
        });
      }
      board.push(line);
    }
    bingoBoards.push(board);
  }

  return bingoBoards;
}

function checkBoard(board, number) {
  for (let i = 0; i < board.length; i++) {
    let lineWins = 0;
    for (let j = 0; j < BOARD_COLUMNS; j++) {
      if (board[i][j].val === number) {
        board[i][j].marked = true;
      }
      if (board[i][j].marked) {
        lineWins++;
      }
    }

    if (lineWins === BOARD_COLUMNS) {
      return true;
    }
  }

  for (let i = 0; i < BOARD_COLUMNS; i++) {
    let columnWins = 0;
    for (let j = 0; j < board.length; j++) {
      if (board[j][i].marked) {
        columnWins++;
      }
    }
    if (columnWins === board.length) {
      return true;
    }
  }

  return false;
}

function calculateScore(board, lastNumber) {
  let sum = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < BOARD_COLUMNS; j++) {
      if (!board[i][j].marked) {
        sum += board[i][j].val;
      }
    }
  }

  return sum * lastNumber;
}

function main(input) {
  const bingoNumbers = input
    .shift()
    .split(",")
    .map((x) => parseInt(x, 10));
  input.shift();

  const bingoBoards = getBingoBoards(input);
  console.log(`${bingoBoards.length} bingo boards loaded`);

  let index = 0;
  let weHaveBingo = false;

  while (index < bingoNumbers.length) {
    console.log(`${bingoNumbers[index]}!`);
    let i = 0;
    while (i < bingoBoards.length) {
      const win = checkBoard(bingoBoards[i], bingoNumbers[index]);
      if (win) {
        console.log("BINGO!");
        weHaveBingo = true;
        break;
      }
      i++;
    }
    if (weHaveBingo) {
      return calculateScore(bingoBoards[i], bingoNumbers[index]);
    }
    index++;
  }
}

console.log(main(readFile(path.join(__dirname, "puzzle-input.txt"))));
