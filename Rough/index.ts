const fs = require("fs");

function promisifiedReadFile(textFile, format) {
  return new Promise((res, rej) => {
    return fs.readFile(textFile, format, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}

function callback(data) {
  console.log(data);
}

async function promiseResult() {
  const data1 = await promisifiedReadFile("a.txt", "utf-8");
  console.log(data1);
  const data2 = await promisifiedReadFile("a.txt", "utf-8");
  console.log(data2);
}
promiseResult();

for (let index = 0; index < 10; index++) {
  console.log("28");
}
