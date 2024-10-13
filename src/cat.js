import fs from "fs";

export async function catFile(input) {
  const inputPath = input.slice(4).replace(/[\n\r]/g, "");

  try {
    await fs.promises.access(inputPath);

    const stats = await fs.promises.stat(inputPath);
    if (stats.isFile()) {
      const rs = fs.createReadStream(inputPath, {
        encoding: "utf8",
      });

      rs.on("data", (chunk) => {
        console.log("-----------------------------------------\n" + chunk);
      });
      rs.on("error", (error) => {
        console.error(`Operation failed: ${error.message}`);
      });
    } else {
      console.log("Invalid input: path is not a file");
    }
  } catch {
    console.log("Operation failed: file does not exists");
  }
}

// /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files/text.txt ok
// cat etc.js ok
// /Users/meruert.amantay/Desktop/node/nodejs-file-manager/src/files no
