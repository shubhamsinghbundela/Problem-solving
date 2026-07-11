// Problem Description – Hanging Promise Detector
//
// You are given a promise, a threshold time in milliseconds, and a callback onHang.
// Your task is to implement monitorPromise(promise, onHang, thresholdMs).
//
// If the promise does not settle within thresholdMs, call onHang().
// The original promise should continue normally (do not cancel it).
// If the promise settles before thresholdMs, onHang must not be called.

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

module.exports = monitorPromise;
