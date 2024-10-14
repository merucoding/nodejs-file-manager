import { argv, stdin } from "node:process";
import os from "os";
import { cdToDir } from "./cd.js";
import { upFromCurrDir } from "./up.js";
import { showLs } from "./ls.js";
import { catFile } from "./cat.js";
import { createFile } from "./add.js";
import { renameFileName } from "./rename.js";
import { copyFile } from "./cp.js";
import { removeFile } from "./rm.js";
import { osInfo } from "./os.js";
import { hashCalculate } from "./hash.js";
import { compress } from "./zip/compress.js";
import { decompress } from "./zip/decompress.js";

const homeDir = os.homedir();
process.chdir(homeDir);

const arr = argv.slice(2);

const userName = arr
  .filter((el) => el.startsWith("--username="))
  .map((el) => el.slice(11));

console.log(`Welcome to the File Manager, ${userName[0]}!`);
console.log(`\nYou are currently in ${process.cwd()}`);

const cmds = [
  "up",
  "cd ",
  "cat ",
  "add ",
  "rn ",
  "mv ",
  "cp ",
  "rm ",
  "os ",
  "compress ",
  "hash ",
  "decompress ",
  ".exit",
  "ls",
];

function isValidCommand(input) {
  return cmds.some(cmd => input.startsWith(cmd));
}

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
  if (input.startsWith("mv ")) {
    copyFile(input, true);
  }
  if (input.startsWith("cp ")) {
    copyFile(input);
  }
  if (input.startsWith("rm ")) {
    removeFile(input);
  }
  if (input.startsWith("os ")) {
    osInfo(input);
  }
  if (input.startsWith("hash ")) {
    hashCalculate(input);
  }
  if (input.startsWith("compress ")) {
    compress(input);
  }
  if (input.startsWith("decompress ")) {
    decompress(input);
  }
  if (input.trim() === "ls") {
    showLs();
  }
  if (!isValidCommand(input)) {
    console.log("Invalid input :(");
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
