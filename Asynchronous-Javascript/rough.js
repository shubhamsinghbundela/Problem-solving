async function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    let errCount = 0;
    promises.forEach((ele, idx) => {
      Promise.resolve(ele)
        .then((data) => resolve(data))
        .catch((err) => {
          errCount += 1;
          if (errCount === promises.length) {
            reject(new Error("All promises were rejected"));
          }
        });
    });
  });
}

(async () => {
  const result = await promiseAny([Promise.reject("err"), 42]);
  console.log(result);
})();

// expect(result).toEqual([1, 2, 3]);
