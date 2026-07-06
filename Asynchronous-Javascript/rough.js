async function promiseAll(promises) {
  let index = 0;
  let results = [];
  let completed = 0;
  return new Promise((res, rej) => {
    function next() {
      if (completed === promises.length) {
        // console.log(completed);
        res(results);
      }
      let currentIndex = index;
      index += 1;
      Promise.resolve(promises[currentIndex])
        .then((data) => {
          results[currentIndex] = data;
          completed += 1;
          next();
        })
        .catch((err) => {
          rej(err);
        });
    }
    next();
  });
}

(async () => {
  const p1 = Promise.resolve(1);
  const p2 = Promise.reject("error");
  const p3 = Promise.resolve(3);
  const results = await promiseAll([p1, p2, p3]);
  console.log(results);

  // await expect(promiseAll([p1, p2, p3])).rejects.toBe("error");
})();

// expect(result).toEqual([1, 2, 3]);
