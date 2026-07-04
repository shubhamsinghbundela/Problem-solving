// Problem Description – Hedged Request
//
// You have a Primary async source and a Secondary backup.
// Start the Primary immediately. If it is slow, start the Secondary.
//
// Return the first successful result and ignore the rest.
// Only fail if both fail, and ensure the callback runs once.
//
// Requirements:
// - Start Primary immediately.
// - Start Secondary after timeoutMs if needed.
// - First success wins.
// - Callback must be called exactly once.
function hedgedRequest(primary, secondary, timeoutMs, onComplete) {
  let flag = true;
  primary((err, data) => {
    if (flag) {
      if (err) {
        onComplete(err);
      } else {
        flag = false;
        onComplete(null, data);
      }
    }
  });

  setTimeout(() => {
    if (flag) {
      flag = false;
      secondary((err, data) => {
        if (err) {
          onComplete(err);
        } else {
          onComplete(null, data);
        }
      });
    }
  }, timeoutMs);
}
module.exports = hedgedRequest;
