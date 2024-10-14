import fs from "fs";
import crypto from "crypto";
import { pipeline } from "stream/promises";
import { currDir } from "./currDir.js";

export async function hashCalculate(input) {
  // hash path_to_file
  const inputPath = input.slice(5).replace(/[\n\r]/g, "");
  const hash = crypto.createHash("sha256");

  try {
    await fs.promises.access(inputPath);
    const stats = await fs.promises.stat(inputPath);

    if (stats.isFile()) {
      const rs = fs.createReadStream(inputPath);
      await pipeline(rs, hash.setEncoding("hex"));
      console.log(hash.read());
      currDir();
    } else {
      console.log("Invalid input: path is not a file");
    }
  } catch {
    console.log("Operation failed");
  }
}

// hash /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/text.txt ok 
// hash Desktop/node/nodejs-file-manager/src/files/text.txt ok 
// hash ./Desktop/node/nodejs-file-manager/src/files/text.txt ok