// Problem Description – Custom Implementation of Promise.all

// You are required to implement your own version of Promise.all without using the built-in method.
// The function should accept an array of values that may include Promises or plain constants.
// It must resolve with an array of results in the same order once all inputs resolve, or reject immediately if any input rejects.
async function promiseAll(promises) {
  return new Promise((res, rej) => {
    let results = [];
    let completed = 0;

    if (promises.length == 0) {
      res([]);
    }
    promises.forEach((element, index) => {
      Promise.resolve(element)
        .then((data) => {
          results[index] = data;
          completed++;
          if (completed === promises.length) {
            res(results);
          }
        })
        .catch(rej);
    });
  });
}
module.exports = promiseAll;
