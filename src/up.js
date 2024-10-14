import path from "path";
import { currDir } from "./currDir.js";

const rootDir = path.parse(process.cwd()).root;

export function upFromCurrDir() {
  const currPath = process.cwd();
  const newPath = path.dirname(currPath);
  console.log(newPath);

  if (currPath === rootDir) {
    currDir();
  } else {
    process.chdir(newPath);
    currDir();
  }
}
