import path from "path";
import fs from "fs/promises";
import { currDir } from "./currDir.js";

const rootDir = path.parse(process.cwd()).root;

export async function cdToDir(input) {
  const inputPath = input.slice(3).replace(/[\n\r]/g, ""); // убираем переносы строк
  let finalPath = "";

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
      currDir();
    } else {
      console.log("Invalid input: not a folder", finalPath);
    }
  } catch {
    console.log("Invalid input: no access", finalPath);
  }
}

// Tests: homedir +

// /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/etc.js - no, file
// /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src - ok
// meruert.amantay/Desktop/node/nodejs-file-manager/src/etc.js - no
// nodejs-file-manager/src/etc.js - no, wrong path
// Desktop/node/nodejs-file-manager/src/ - ok
// Desktop/node/nodejs-file-manager/src/etc.js - no, file
// /Users/meruert.amantay/Desktop/  v   / - ok
// v - no
