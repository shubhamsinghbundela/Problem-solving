function createWindowAggregatorPromise(batchProcessFn, size, windowMs) {
  let arr = [];
  let timer;
  return {
    add: function (...args) {
      arr.push(...args);
      if (arr.length == size) {
        batchProcessFn(arr).then(() => {
          timer = null;
          arr = [];
        });
      }
      if (!timer) {
        timer = setTimeout(() => {
          batchProcessFn(arr).then(() => {
            timer = null;
            arr = [];
          });
        }, windowMs);
      }
    },
  };
}
(async () => {
  let callCount = 0;
  const processor = async () => {
    callCount++;
  };

  const { add } = createWindowAggregatorPromise(processor, 2, 50);

  add(1);
  add(2);

  await new Promise((r) => setTimeout(r, 100));
  console.log(callCount);
  // expect(callCount).toBe(1);
})();
