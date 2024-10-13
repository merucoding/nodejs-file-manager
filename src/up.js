import path from "path";

const rootDir = path.parse(process.cwd()).root;

export function upFromCurrDir() {
  const currPath = process.cwd();
  const newPath = path.dirname(currPath);
  console.log(newPath);

  if (currPath === rootDir) {
    console.log(`\nYou are currently in ${process.cwd()}ok`);
  } else {
    process.chdir(newPath);
    console.log(`\nYou are currently in ${process.cwd()}`);
  }
}
