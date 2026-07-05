function createSmartDebounce(worker, waitMs) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      worker(...args);
    }, waitMs);
  };
}

const worker = (input, cb) => {
  const delay = input === "first" ? 100 : 20;
  setTimeout(() => cb(null, input), delay);
};

const debounced = createSmartDebounce(worker, 50);
const results = [];

debounced("first", (err, data) => {
  results.push(data);
});

setTimeout(() => {
  debounced("second", (err, data) => {
    results.push(data);
    console.log(results);
    // try {
    //   expect(results).toEqual(["second"]);
    //   expect(results).not.toContain("first");
    //   done();
    // } catch (e) {
    //   done(e);
    // }
  });
}, 60);
