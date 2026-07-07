// Problem Description – Idempotent Async Execution
//
// You need to ensure that an asynchronous task identified by a key
// runs only once. If the same task is triggered again while it is
// still running, all callers should receive the same result.
//
// This problem tests deduplication and state synchronization.
//
function createIdempotentExecutor() {
  const inFlight = {};

  return function (key, fn) {
    if (inFlight[key]) {
      return inFlight[key];
    }

    inFlight[key] = Promise.resolve()
      .then(() => fn())
      .finally(() => {
        delete inFlight[key];
      });

    return inFlight[key];
  };
}

module.exports = createIdempotentExecutor;
