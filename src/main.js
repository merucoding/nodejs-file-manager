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
  const inputPath = input.slice(3).replace(/[\n\r]/g, ''); // убираем переносы строк
  let finalPath = ''; 

  if (path.isAbsolute(inputPath) && inputPath.startsWith(rootDir)) {
    finalPath = inputPath;
  } else {
    finalPath = path.resolve(process.cwd(), inputPath);
  }

  try {
    await fs.access(inputPath);

    const stats = await fs.stat(inputPath);
    if (stats.isDirectory()) {
      // console.log('ok', finalPath);
      process.chdir(inputPath);
      console.log(`\nYou are currently in ${process.cwd()}`);
    } else {
      console.log('Invalid input: not a folder', finalPath);
    }
  } catch {
    console.log('Invalid input: no access', finalPath);
  }
}

// /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/etc.js no
// /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src ok
// meruert.amantay/Desktop/node/nodejs-file-manager/src/etc.js no
// nodejs-file-manager/src/etc.js no
// Desktop/node/nodejs-file-manager/src/ ok
// Desktop/node/nodejs-file-manager/src/etc.js no
// /Users/meruert.amantay/Desktop/  v   / ok
// v no