async function asyncReduceLimited(
  array,
  limit,
  asyncProcessFn,
  reducer,
  initialValue,
) {
  const result = await mapAsyncLimit(array, limit, asyncProcessFn);
  let accumulator = initialValue;

  for (const value of result) {
    accumulator = reducer(accumulator, value);
  }

  return accumulator;
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
        asyncFn(array[currentIndex]).then((data) => {
          array[currentIndex] = data;
          active--;
          completed++;
          next();
        });
      }
    }
    next();
  });
}

(async () => {
  const result = await asyncReduceLimited(
    [],
    2,
    async () => 1,
    (acc, val) => acc + val,
    10,
  );
  console.log(result);
})();
