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
          }
          index += 1;
          next();
        })
        .catch(reject);
    }
    next();
  });
}
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
(async () => {
  const calls = [];

  const predicate = async (n) => {
    calls.push(n);
    return n !== 2;
  };

  const result = await everyAsync([1, 2, 3, 4], predicate);

  console.log(calls);
  console.log(calls);
  // expect(result).toBe(false);
  // expect(calls).toEqual([1, 2]);
})();
