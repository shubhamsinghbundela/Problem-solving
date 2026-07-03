const fs = require("fs");

function callback(err: string, data: string) {
  console.log(data);
}

fs.readFile("a.txt", "utf-8").then(callback);

for (let i = 0; i < 10; i++) {
  console.log(i);
}
