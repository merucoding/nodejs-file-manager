import fs from "fs/promises";

export async function showLs() {
  const diresArr = [];
  const filesArr = [];

  try {
    const files = await fs.readdir(process.cwd(), { withFileTypes: true });

    for (let el of files) {
      if (el.isFile()) {
        filesArr.push({ name: el.name, type: "file" });
      } else {
        diresArr.push({ name: el.name, type: "directory" });
      }
    }
  } catch {
    console.log("Operation failed: no access");
  }

  const combo = diresArr.concat(filesArr);
  console.table(combo);
}
