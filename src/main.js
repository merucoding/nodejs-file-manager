import { argv, stdin, stdout } from "node:process";
// import path from "path";
import os from "os";
// import fs from "fs/promises";
import { cdToDir } from "./cd.js";
import { upFromCurrDir } from "./up.js";
import { showLs } from "./ls.js";
import { catFile } from "./cat.js";
import { createFile } from "./add.js";
import { renameFileName } from "./rename.js";

const homeDir = os.homedir();
process.chdir(homeDir);

const arr = argv.slice(2);

const userName = arr
  .filter((el) => el.startsWith("--username="))
  .map((el) => el.slice(11));

console.log(`Welcome to the File Manager, ${userName[0]}!`);
console.log(`\nYou are currently in ${process.cwd()}`);

stdin.on("data", (data) => {
  const input = data.toString();

  if (input.trim() === "up") {
    upFromCurrDir();
  }

  if (input.startsWith("cd ")) {
    cdToDir(input);
  }

  if (input.startsWith("cat ")) {
    catFile(input);
  }

  if (input.startsWith("add ")) {
    createFile(input);
  }

  if (input.startsWith("rn ")) {
    renameFileName(input);
  }

  if (input.trim() === "ls") {
    showLs();
  }

  if (input.trim() === ".exit") {
    console.log(`Thank you for using File Manager, ${userName[0]}, goodbye!`);
    process.exit();
  }
});

process.on("SIGINT", () => {
  console.log(`\nThank you for using File Manager, ${userName[0]}, goodbye!`);
  process.exit();
});
