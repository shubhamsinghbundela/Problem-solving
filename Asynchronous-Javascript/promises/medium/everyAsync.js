// Problem Description – everyAsync(array, predicate)

// You are required to implement a function named everyAsync that accepts an array and an asynchronous predicate function.
// The function should evaluate the predicate for each element and resolve to true only if all predicates return true.
// The evaluation should stop immediately and resolve to false as soon as any predicate fails.

async function everyAsync(array, predicate) {
  return new Promise((resolve, reject) => {
    let index = 0;
    function next() {
      if (index >= array.length) {
        resolve(true);
        return;
      }
      Promise.resolve(predicate(array[index]))
        .then((data) => {
          if (data == false) {
            resolve(false);
            return;
          }
          index += 1;
          next();
        })
        .catch(reject);
    }
    next();
  });
}

module.exports = everyAsync;
