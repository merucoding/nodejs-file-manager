import { argv, stdin, stdout } from "node:process";
import path from "path";
import os from "os";
import fs from "fs/promises";

const homeDir = os.homedir();
const rootDir = path.parse(process.cwd()).root;
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

  if (input.trim() === ".exit") {
    console.log(`Thank you for using File Manager, ${userName[0]}, goodbye!`);
    process.exit();
  }
});

process.on("SIGINT", () => {
  console.log(`\nThank you for using File Manager, ${userName[0]}, goodbye!`);
  process.exit();
});

function upFromCurrDir() {
  const currPath = process.cwd();
  const newPath = path.dirname(currPath);
  console.log(newPath);

  if (currPath === rootDir) {
    console.log(`\nYou are currently in ${process.cwd()}`);
  } else {
    process.chdir(newPath);
    console.log(`\nYou are currently in ${process.cwd()}`);
  }
}

async function cdToDir(input) {
  const inputPath = input.slice(3).trim();

  if (path.isAbsolute(inputPath)) {
    try {
      await fs.access(inputPath);
    } catch {
      console.log("Operation failed");
    }
    process.chdir(inputPath);
    console.log(process.cwd());
  } else {
    const relativePath = path.resolve(process.cwd(), inputPath);

    try {
      await fs.access(relativePath);
    } catch {
      console.log("Operation failed");
    }
    process.chdir(relativePath);
    console.log(process.cwd());
  }
}
