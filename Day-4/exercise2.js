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
  const winningBoards = [];

  while (index < bingoNumbers.length) {
    const ball = bingoNumbers[index];
    console.log(`${ball}!`);

    let i = 0;
    while (i < bingoBoards.length) {
      if (winningBoards.find((b) => b.boardIndex === i)) {
        // do not check a board if it has already won
        i++;
        continue;
      }
      const win = checkBoard(bingoBoards[i], ball);
      if (win) {
        winningBoards.push({ boardIndex: i, number: ball });
      }
      i++;
    }
    index++;
  }

  // retrieve the last board to win Bingo
  const { boardIndex, number } = winningBoards.pop();
  return calculateScore(bingoBoards[boardIndex], number);
}

console.log(main(readFile(path.join(__dirname, "puzzle-input.txt"))));
