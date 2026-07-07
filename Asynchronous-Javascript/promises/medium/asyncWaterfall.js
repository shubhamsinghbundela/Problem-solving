// Problem Description – Chained Async Function Execution

// You are required to implement a function that accepts an array of asynchronous functions.
// Each function should be executed only after the previous one has completed, and it should receive the resolved result of the previous function as its input.
// The final output should be the result of the last function in the chain.
function asyncWaterfall(tasks, initialValue) {
  return new Promise((resolve, reject) => {
    let result = initialValue;
    let completed = 0;
    let index = 0;
    async function next() {
      if (completed === tasks.length) {
        resolve(result);
      }

      if (index < tasks.length) {
        Promise.resolve(tasks[index](result))
          .then((data) => {
            result = data;
            index += 1;
            completed += 1;
            next();
          })
          .catch(reject);
      }
    }
    next();
  });
}

module.exports = asyncWaterfall;
