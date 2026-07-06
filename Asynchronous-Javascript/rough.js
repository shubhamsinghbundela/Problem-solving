async function promiseAll(promises) {
  return new Promise((res, rej) => {
    let index = 0;
    let results = [];
    let completed = 0;
    function next() {
      if (completed === promises.length) {
        // console.log(completed);
        res(results);
      }
      while (index < promises.length) {
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
    }
    next();
  });
}

(async () => {
  const p1 = new Promise((res) => setTimeout(() => res(1), 100));
  const p2 = new Promise((res) => setTimeout(() => res(2), 50));
  const p3 = new Promise((res) => setTimeout(() => res(3), 10));

  const result = await promiseAll([p1, p2, p3]);
  console.log(result);
})();

// expect(result).toEqual([1, 2, 3]);
