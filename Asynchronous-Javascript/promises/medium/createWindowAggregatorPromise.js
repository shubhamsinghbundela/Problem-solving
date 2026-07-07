// Problem Description – Sliding Window Aggregator
//
// You are required to implement createWindowAggregator(batchProcessFn, size, windowMs).
//
// The aggregator collects items into a batch and processes them together.
//
// It must provide add(item):
// 1. Add item to the current batch
// 2. If batch size reaches size, immediately call batchProcessFn(batch)
// 3. If windowMs expires before reaching size, call batchProcessFn with the partial batch
// 4. After processing, reset the batch and start a new window

function createWindowAggregatorPromise(batchProcessFn, size, windowMs) {
  let arr = [];
  let timer = null;
  return {
    add: function (...args) {
      arr.push(...args);
      if (arr.length == size) {
        clearTimeout(timer);
        timer = null;

        const batch = [...arr];
        arr = [];

        batchProcessFn(batch);
        return;
      }
      if (!timer) {
        timer = setTimeout(() => {
          if (arr.length === 0) return;

          const batch = [...arr];
          arr = [];

          timer = null;
          batchProcessFn(batch);
        }, windowMs);
      }
    },
  };
}

module.exports = createWindowAggregatorPromise;
