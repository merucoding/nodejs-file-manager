import { argv, stdin, stdout } from "node:process";
import path from "path";
import os from "os";

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
  const input = data.toString().trim();

  if (input === 'up') {
    upFromCurrDir();
  }

  if (input === ".exit") {
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

  if (currPath === rootDir) {
    console.log(`\nYou are currently in ${process.cwd()}`);
  } else {
    process.chdir(newPath);
    console.log(`\nYou are currently in ${process.cwd()}`);
  }
}