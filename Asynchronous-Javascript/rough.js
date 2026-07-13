async function promiseAllSettled(promises) {
  return new Promise((res, rej) => {
    let results = [];
    let completed = 0;

    if (promises.length == 0) {
      res([]);
    }
    promises.forEach((element, index) => {
      Promise.resolve(element)
        .then((data) => {
          results[index] = { status: "fulfilled", value: data };
          completed++;
          if (completed === promises.length) {
            res(results);
          }
        })
        .catch((err) => {
          results[index] = { status: "rejected", value: err };
          completed++;
          if (completed === promises.length) {
            res(results);
          }
        });
    });
  });
}

(async () => {
  const slowResolve = new Promise((res) => setTimeout(() => res("slow"), 30));
  const fastReject = new Promise((_, rej) => setTimeout(() => rej("fail"), 10));

  const result = await promiseAllSettled([slowResolve, fastReject]);
  console.log(result);

  // expect(result[0]).toEqual({ status: "fulfilled", value: "slow" });
  // expect(result[1]).toEqual({ status: "rejected", reason: "fail" });
})();
