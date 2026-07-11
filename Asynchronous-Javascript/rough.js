function monitorPromise(promise, onHang, thresholdMs) {
  return new Promise((resolve, reject) => {
    let flag = true;
    let timer = setTimeout(() => {
      if (flag) {
        flag = false;
        onHang();
        resolve("slow");
      }
    }, thresholdMs);

    promise
      .then((data) => {
        if (flag) {
          flag = false;
          resolve(data);
        }
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
// const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
(async () => {
  let hung = false;
  const onHang = () => {
    hung = true;
  };

  const failingPromise = new Promise((_, reject) =>
    setTimeout(() => reject("fail"), 20),
  );

  try {
    await monitorPromise(failingPromise, onHang, 100);
  } catch (e) {
    console.log(e);
    // expect(e).toBe("fail");
  }

  await new Promise((r) => setTimeout(r, 150));
  console.log(hung);
  // expect(hung).toBe(false);
})();
