import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream/promises";

export async function compress(input) {
  // compress path_to_file path_to_destination
  const args = input.slice(9).replace(/[\n\r]/g, "");
  const arr = args.split(" ");

  if (arr.length !== 2) {
    console.log(
      "Invalid input, should be: compress path_to_file path_to_destination"
    );
  } else {
    const pathFile = arr[0];
    const pathToDest = arr[1];

    try {
      await fs.promises.access(pathFile);
      const stats = await fs.promises.stat(pathFile);

      if (stats.isFile()) {
        const rs = fs.createReadStream(pathFile);
        const ws = fs.createWriteStream(pathToDest);
        const brotli = zlib.createBrotliCompress();
        await pipeline(rs, brotli, ws);
      } else {
        console.log("Invalid input: path is not a file");
      }
    } catch {
      console.log("Operation failed");
    }
  }
}

// compress /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/text.txt /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/text.br ok