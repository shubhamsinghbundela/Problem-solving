// Problem Description – Polyfill for Promise.allSettled

// You are required to implement a polyfill for Promise.allSettled.
// The function should accept an array of Promises and wait for all of them to either resolve or reject.
// It must return a Promise that resolves with an array of result objects describing the status and value or reason of each Promise.
async function promiseAllSettled(promises) {
  return new Promise((res, rej) => {
    let results = [];
    let completed = 0;

    if (promises.length == 0) {
      res([]);
    }
    promises.forEach((element, index) => {
      Promise.resolve(element)
        .then((data) => {
          results[index] = { status: "fulfilled", value: data };
          completed++;
          if (completed === promises.length) {
            res(results);
          }
        })
        .catch((err) => {
          results[index] = { status: "rejected", reason: err };
          completed++;
          if (completed === promises.length) {
            res(results);
          }
        });
    });
  });
}

module.exports = promiseAllSettled;
