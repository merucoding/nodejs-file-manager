import fs from "fs/promises";
import path from "path";
import { currDir } from "./currDir.js";

export async function renameFileName(input) {
  // rn path_to_file new_filename
  const args = input.slice(3).replace(/[\n\r]/g, "");
  const arr = args.split(" ");

  if (arr.length !== 2) {
    console.log("Invalid input, should be: rn path_to_file new_filename");
  } else {
    const pathFile = arr[0];
    const newFilePath = path.resolve(path.dirname(pathFile), arr[1]);

    try {
      await fs.access(pathFile);
      await fs.rename(pathFile, newFilePath);
      console.log("Renamed");
      currDir();
    } catch {
      console.log("Operation failed: file does not exists");
    }
  }
}

// rn /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/rename.txt newnew.txt
