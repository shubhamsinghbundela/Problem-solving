let callCount = 0;
const fn = (cb) => {
  callCount++;
  setTimeout(() => cb(null, "done"), 50);
};

const onceFn = once(fn);
let completed = 0;

const check = (err, res) => {
  completed++;
  if (completed === 2) {
    console.log(callCount);
  }
};

onceFn(check);
onceFn(check);
