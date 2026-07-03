const fs = require("fs/promises");

async function readFile() {
  try {
    const data = await fs.readFile("a.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile();

for (let i = 0; i < 10; i++) {
  console.log(i);
}
