async function swrCache(key, fetchFn) {
  let cache = { key: key };
  return new Promise((res, rej) => {
    // Return old cache immediately
    const oldValue = cache.key;
    fetchFn().then((data) => {
      cache.key = data;
    });

    res(oldValue);
  });
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
(async () => {
  const apiCall = async (val, delay) => {
    await sleep(delay);
    return val;
  };

  const wrapped = switchMap(apiCall);

  const p1 = wrapped("A", 30);
  const p2 = wrapped("B", 10);

  const r1 = await p1;
  const r2 = await p2;

  console.log(r1);
  console.log(r2);

  // expect(r1).toBeUndefined();
  // expect(r2).toBe("B");
})();
