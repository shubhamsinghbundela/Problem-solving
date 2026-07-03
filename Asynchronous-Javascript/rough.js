const promiseFn = (a, b) => {
  console.log(a, b);
  return new Promise((resolve) => {
    setTimeout(() => resolve(a + b), 10);
  });
};

function callbackify(fn) {
  return function (...args) {
    const callback = args.pop();
    fn(...args)
      .then((data) => callback(null, data))
      .catch((err) => callback(err));
  };
}

const cbFn = callbackify(promiseFn);

cbFn(2, 3, (err, result) => {
  console.log(result);
});
