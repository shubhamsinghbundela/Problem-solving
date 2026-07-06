function timeLimit(fn, t) {
  return function (...args) {
    return new Promise(async (resolve, reject) => {
      fn(...args).then((data) => {
        flag = false;
        resolve(data);
      });
      setTimeout(() => {
        // if (flag) {
        reject("Time Limit exceed");
        // }
      }, t);
    });
  };
}

(async () => {
  const fn = async () => {
    await new Promise((res) => setTimeout(res, 150));
    return "done";
  };

  const limitedFn = timeLimit(fn, 50);
  console.log(await limitedFn());

  // await expect(limitedFn()).rejects.toBe("Time Limit Exceeded");
})();
