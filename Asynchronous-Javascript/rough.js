async function sumPromises(p1, p2) {
  return new Promise(async (res, rej) => {
    try {
      const arr = await Promise.all([p1, p2]);
      const sum = arr.reduce((acc, ele) => acc + ele, 0);
      res(sum);
    } catch (err) {
      rej(err);
    }
  });
}

(async () => {
  const p1 = Promise.resolve(10);
  const p2 = Promise.resolve(20);

  const result = await sumPromises(p1, p2);
  console.log(result);
  // expect(result).toBe(30);
})();
