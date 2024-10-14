import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream/promises";
import { currDir } from "../currDir.js";

export async function decompress(input) {
  // decompress path_to_file path_to_destination
  const args = input.slice(11).replace(/[\n\r]/g, "");
  const arr = args.split(" ");

  if (arr.length !== 2) {
    console.log(
      "Invalid input, should be: decompress path_to_file path_to_destination"
    );
  } else {
    const pathFile = arr[0];
    const pathToDest = arr[1];

    try {
      await fs.promises.access(pathFile);
      const rs = fs.createReadStream(pathFile);
      const ws = fs.createWriteStream(pathToDest);

      const brotli = zlib.createBrotliDecompress();
      await pipeline(rs, brotli, ws);
      currDir();
    } catch {
      console.log("Operation failed");
    }
  }
}

// decompress /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/text.br /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/text.txt ok