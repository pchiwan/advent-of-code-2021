import path from "path";

import { readFile } from "../helpers";

const BOARD_LINES = 5;
const BOARD_COLUMNS = 5;
const CHECKED = "X";

function getBingoBoards(input) {
  const bingoBoards = [];

  for (let i = 0; i < input.length; i = i + 6) {
    const board = [];
    for (let j = 0; j < BOARD_LINES; j++) {
      const line = input[i + j]
        .split(" ")
        .filter(Boolean)
        .map((x) => parseInt(x, 10));
      board.push(line);
    }
    bingoBoards.push(board);
  }

  return bingoBoards;
}

function checkBoard(board, number) {
  for (let i = 0; i < board.length; i++) {
    let lineWins = 0;

    // check current number while checking lines
    for (let j = 0; j < BOARD_COLUMNS; j++) {
      if (board[i][j] === number) {
        board[i][j] = CHECKED;
      }
      if (board[i][j] === CHECKED) {
        lineWins++;
      }
    }

    if (lineWins === BOARD_COLUMNS) {
      return true;
    }
  }

  // check columns
  for (let i = 0; i < BOARD_COLUMNS; i++) {
    let columnWins = 0;
    for (let j = 0; j < board.length; j++) {
      if (board[j][i] === CHECKED) {
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
      if (board[i][j] !== CHECKED) {
        sum += board[i][j];
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
