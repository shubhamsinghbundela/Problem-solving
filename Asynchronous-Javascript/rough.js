function batchProcess(items, limit, worker, onComplete) {
  const queue = [];
  const result = [];
  let index = 0;
  let completed = 1;
  while (index < limit) {
    queue[index] = { idx: index, time: items[index] };
    index += 1;
  }

  while (queue.length > 0) {
    const { idx, time } = queue.shift();
    worker(time, (err, data) => {
      result[idx] = data;
      if (completed === items.length) {
        if (err) {
          onComplete(err);
        } else {
          onComplete(null, result);
        }
      }

      completed += 1;
    });
    if (index < items.length) {
      queue.push({ idx: index, time: items[index] });
      index += 1;
    }
  }
}
const items = [20, 20, 20, 20, 20];
let runningCounter = 0;
let maxObserved = 0;

const worker = (item, cb) => {
  runningCounter++;
  maxObserved = Math.max(maxObserved, runningCounter);

  setTimeout(() => {
    runningCounter--;
    cb(null, item);
  }, 10);
};

batchProcess(items, 2, worker, (err, results) => {
  console.log(maxObserved);
});
