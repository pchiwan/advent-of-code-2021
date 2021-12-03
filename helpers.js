import fs from "fs";

export function readFile(filepath) {
  const file = fs.readFileSync(filepath, "utf8");
  const lines = file.split("\n");
  return lines;
}
