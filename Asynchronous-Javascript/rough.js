function mapLimit(tasks, limit, onAllFinished) {
  let active = 0;
  let completed = 0;
  let index = 0;
  let results = [];

  function next() {
    if (completed == tasks.length) {
      onAllFinished(null, results);
    }
    while (active < limit && index < tasks.length) {
      let currentIndex = index;
      active += 1;
      index += 1;
      tasks[currentIndex]((err, data) => {
        results[currentIndex] = data;
        active -= 1;
        completed++;
        next();
      });
    }
  }
  next();
}
const tasks = [
  (cb) => setTimeout(() => cb(null, "A"), 50),
  (cb) => setTimeout(() => cb(null, "B"), 10),
  (cb) => setTimeout(() => cb(null, "C"), 30),
];

let maxRunning = 0;
let currentlyRunning = 0;

const trackedTasks = tasks.map((task) => (cb) => {
  currentlyRunning++;
  maxRunning = Math.max(maxRunning, currentlyRunning);

  task((err, data) => {
    currentlyRunning--;
    cb(err, data);
  });
});

mapLimit(trackedTasks, 2, (err, results) => {
  // try {
  //   expect(err).toBeNull();
  //   expect(results).toEqual(["A", "B", "C"]);
  //   expect(maxRunning).toBeLessThanOrEqual(2);
  //   done();
  // } catch (e) {
  //   done(e);
  // }
  console.log(results);
});
