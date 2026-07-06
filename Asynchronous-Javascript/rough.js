function promisify(fn) {
  return function (...args) {
    return new Promise((res, rej) => {
      fn(...args, (err, data) => {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      });
    });
  };
}

(async () => {
  const slowSquare = (n, cb) => {
    setTimeout(() => cb(null, n * n), 10);
  };

  const promisedSquare = promisify(slowSquare);
  const result = await promisedSquare(5);
  console.log(result);
})();
