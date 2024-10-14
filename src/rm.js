import fs from "fs/promises";

export async function removeFile(input) {
  // rm path_to_file
  const inputPath = input.slice(3).replace(/[\n\r]/g, "");
  const stats = await fs.stat(inputPath);

  try {
    await fs.access(inputPath);
  } catch {
    console.log("Operation failed");
  }

  if (stats.isFile()) {
    await fs.rm(inputPath);
  } else {
    console.log("Invalid input");
  }
}

// rm /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/toRemove.txt ok
// rm /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files no
// rm toMove.txt ok