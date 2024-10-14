import fs from "fs/promises";
import path from "path";
import { currDir } from "./currDir.js";

export async function createFile(input) {
  // add new_file_name
  const newFileName = input.slice(4).replace(/[\n\r]/g, "");
  const pathToFile = path.resolve(process.cwd(), newFileName)

  try {
    await fs.writeFile(pathToFile, "", { encoding: "utf8" });
    currDir();
  } catch {
    console.log("Operation failed");
  }
}
