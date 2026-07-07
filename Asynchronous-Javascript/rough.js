async function batchAll(tasks, batchSize) {
  return new Promise((resolve, reject) => {
    let active = 0;
    let index = 0;
    let result = [];
    let completed = 0;
    function next() {
      if (completed == tasks.length) {
        resolve(result);
      }
      while (active < batchSize && index < tasks.length) {
        let currentIndex = index;
        active += 1;
        index += 1;
        tasks[currentIndex]().then((data) => {
          result[currentIndex] = data;
          active -= 1;
          completed += 1;
          next();
        });
      }
    }
    next();
  });
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
(async () => {
  const tasks = [() => Promise.resolve(1), () => Promise.resolve(2)];

  const result = await batchAll(tasks, 5);
  console.log(result);
  // expect(result).toEqual([1, 2]);
})();
