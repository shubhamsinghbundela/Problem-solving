async function taskScheduler(tasks, maxConcurrent) {
  return new Promise((resolve, reject) => {
    let result = [];
    let completed = 0;
    let index = 0;
    let active = 0;
    function next() {
      if (completed == tasks.length) {
        resolve(result);
        return;
      }
      while (active < maxConcurrent && index < tasks.length) {
        let currentIndex = index;
        active += 1;
        index += 1;
        tasks[currentIndex]()
          .then((data) => {
            console.log("currentIndex", currentIndex);
            result[currentIndex] = data;
            completed += 1;
            active -= 1;
            next();
          })
          .catch((err) => {
            reject(err);
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

  const tasks = Array.from({ length: 5 }, (_, i) => async () => {
    running++;
    maxSeen = Math.max(maxSeen, running);
    await sleep(20);
    running--;
    return i;
  });

  await taskScheduler(tasks, 2);
  console.log(maxSeen);
  //   expect(maxSeen).toBeLessThanOrEqual(2);
})();
