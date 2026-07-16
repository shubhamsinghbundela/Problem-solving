// Problem Description – retryWithBackoff(fn, retries, delay)

// You are required to write a function named retryWithBackoff that attempts to execute an asynchronous function fn.
// If the execution fails, the function should wait for a specified delay in milliseconds before retrying.
// This retry process should continue until the function succeeds or the maximum number of retries is reached.
async function retryWithBackoff(fn, retries, delay) {
  return new Promise((resolve, reject) => {
    let complete = 0;
    async function next() {
      try {
        const result = await fn();
        resolve(result);
        return;
      } catch (err) {
        console.log(complete == retries);
        if (complete == retries) {
          reject(err);
          return;
        }
        setTimeout(() => {
          complete++;
          next();
        }, delay);
      }
    }
    next();
  });
}

module.exports = retryWithBackoff;
