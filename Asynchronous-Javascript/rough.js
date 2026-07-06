async function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((ele, idx) => {
      Promise.resolve(ele)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  });
}

(async () => {
  const race = promiseRace([]);

  const timeout = new Promise((res) => setTimeout(res, 100, "timeout"));
  const result = await Promise.race([race, timeout]);
  console.log(result);
})();
