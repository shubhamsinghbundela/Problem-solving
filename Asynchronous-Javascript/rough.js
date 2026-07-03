function rejectAfter(ms, callback) {
  setTimeout(() => {
    const err = {};
    const data = null;
    err.message = `Rejected after ${ms}ms`;
    callback(err, data);
  }, ms);
}

const start = Date.now();
const waitTime = 100;

rejectAfter(waitTime, (err, result) => {
  const diff = Date.now() - start;
  console.log(result);
  console.log(err.message);
  console.log(waitTime > diff);
});
