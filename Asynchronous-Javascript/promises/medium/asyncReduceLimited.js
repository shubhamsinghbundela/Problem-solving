// Problem Description – Parallel Chunked Async Reducer

// You are required to process an array using a reducer function where the reduction happens in sequence, but the data fetching or processing for items is performed in parallel chunks.
// Each chunk should be processed concurrently, then reduced before moving to the next chunk.
// The final reduced result must be correct and deterministic.
async function asyncReduceLimited(
  array,
  limit,
  asyncProcessFn,
  reducer,
  initialValue,
) {
  const result = await mapAsyncLimit(array, limit, asyncProcessFn);
  if (reducer) {
    let accumulator = initialValue;

    for (const value of result) {
      accumulator = reducer(accumulator, value);
    }

    return accumulator;
  }
  return result;
}

async function mapAsyncLimit(array, limit, asyncFn) {
  return new Promise((res, rej) => {
    let active = 0;
    let index = 0;
    let completed = 0;
    function next() {
      if (completed === array.length) {
        res(array);
      }
      while (active < limit && index < array.length) {
        let currentIndex = index;
        active += 1;
        index += 1;
        asyncFn(array[currentIndex])
          .then((data) => {
            array[currentIndex] = data;
            active--;
            completed++;
            next();
          })
          .catch(rej);
      }
    }
    next();
  });
}

module.exports = asyncReduceLimited;
