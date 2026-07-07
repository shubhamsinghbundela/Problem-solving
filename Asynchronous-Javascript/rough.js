function asyncWaterfall(tasks, initialValue) {
  return new Promise((resolve, reject) => {
    let result = initialValue;
    let completed = 0;
    let index = 0;
    async function next() {
      if (completed === tasks.length) {
        resolve(result);
      }

      if (index < tasks.length) {
        tasks[index](result)
          .then((data) => {
            result = data;
            index += 1;
            completed += 1;
            next();
          })
          .catch(reject);
      }
    }
    next();
  });
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
(async () => {
  const tasks = [
    async () => 1,
    async () => {
      throw new Error("boom");
    },
    async () => 3,
  ];

  console.log(await asyncWaterfall(tasks, 0));
  // await expect(asyncWaterfall(tasks, 0)).rejects.toThrow("boom");
})();
