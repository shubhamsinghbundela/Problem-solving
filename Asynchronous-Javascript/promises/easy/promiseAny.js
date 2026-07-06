// Problem Description – promiseAny(promises)

// You are required to implement a function named promiseAny that accepts an array of Promises.
// The function should return a new Promise that resolves immediately when any one of the input promises resolves successfully.
// If all the promises reject, the returned Promise should reject with an error.
async function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    let errCount = 0;
    if (promises.length === 0) {
      reject(new Error("Empty iterable"));
    }
    promises.forEach((ele, idx) => {
      Promise.resolve(ele)
        .then((data) => resolve(data))
        .catch((err) => {
          errCount += 1;
          if (errCount === promises.length) {
            reject(new Error("All promises were rejected"));
          }
        });
    });
  });
}

module.exports = promiseAny;
