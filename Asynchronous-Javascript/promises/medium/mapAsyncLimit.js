// Problem Description – Asynchronous Map with Concurrency Limit

// You are required to implement an asynchronous version of Array.map that processes items using an async callback function.
// Unlike the standard map, this version should only process a limited number of items concurrently.
// As soon as one operation finishes, the next should begin.
// The final result must preserve the original order of the input array.
async function mapAsyncLimit(array, limit, asyncFn) {
  return new Promise((resolve, reject) => {
    let result = [];
    let completed = 0;
    let active = 0;
    index = 0;
    function next() {
      if (completed == array.length) {
        resolve(result);
        return;
      }
      while (active < limit && index < array.length) {
        let currentIndex = index;
        active += 1;
        index += 1;
        asyncFn(array[currentIndex])
          .then((data) => {
            result[currentIndex] = data;
            active -= 1;
            completed++;
            next();
          })
          .catch(reject);
      }
    }
    next();
  });
}

module.exports = mapAsyncLimit;
