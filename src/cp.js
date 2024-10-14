import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { currDir } from "./currDir.js";

export async function copyFile(input, move = false) {
  // cp path_to_file path_to_new_directory
  const args = input.slice(3).replace(/[\n\r]/g, "");
  const arr = args.split(" ");

  if (arr.length !== 2) {
    console.log(
      "Invalid input, should be: cp/mv path_to_file path_to_new_directory"
    );
  } else {
    const sourcePath = arr[0];
    const pathToDest = arr[1];

    try {
      await fs.promises.access(sourcePath);
      await fs.promises.access(pathToDest);

      const fileName = path.basename(sourcePath);
      const newPath = path.join(pathToDest, fileName);

      const rs = fs.createReadStream(sourcePath);
      const ws = fs.createWriteStream(newPath);

      const access = await fs.promises
        .access(newPath)
        .then(() => true)
        .catch(() => false);

      if (!access) {
        await pipeline(rs, ws);
        console.log("Copied");
        currDir();
      } else {
        console.log("Operation failed: the file already exists");
      }

      if (move) {
        await fs.promises.rm(sourcePath);
        console.log("Moved");
        currDir();
      }
    } catch {
      console.log("Operation failed");
    }
  }
}

// cp /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/toCopy.txt /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files no
// cp /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/toCopy.txt /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src ok
// cp /node/nodejs-file-manager/src/files/toCopy.txt /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src no

// mv /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/toMove.txt /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src ok
// mv /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/toMove.txt desktop ok