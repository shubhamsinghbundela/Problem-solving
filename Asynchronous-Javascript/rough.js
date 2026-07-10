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
        asyncFn(array[currentIndex]).then((data) => {
          result[currentIndex] = data;
          active -= 1;
          completed++;
          next();
        });
      }
    }
    next();
  });
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
(async () => {
  let running = 0;
  let maxSeen = 0;

  const input = [1, 2, 3, 4, 5];

  await mapAsyncLimit(input, 2, async () => {
    running++;
    maxSeen = Math.max(maxSeen, running);
    await sleep(20);
    running--;
  });
  console.log(maxSeen);

  // expect(maxSeen).toBeLessThanOrEqual(2);
})();
