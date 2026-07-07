function createIdempotentExecutor() {
  let obj = {};

  return function (...args) {
    const key = args.shift();
    const fn = args.pop();

    // if (obj[key]) {
    //   return obj[key];
    // }

    obj[key] = new Promise((res, rej) => {
      Promise.resolve(fn()).then(res).catch(rej);
    });

    return obj[key];
  };
}
(async () => {
  const run = createIdempotentExecutor();
  let calls = 0;

  const fn = async () => {
    calls++;
    return calls;
  };

  const r1 = await run("B", fn);
  const r2 = await run("B", fn);
  console.log(r2);
  // expect(r1).toBe(1);
  // expect(r2).toBe(2);
})();
