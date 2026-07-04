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
const primary = (cb) => setTimeout(() => cb(null, "PRIMARY_SLOW"), 100);
const secondary = (cb) => setTimeout(() => cb(null, "SECONDARY_FAST"), 10);

hedgedRequest(primary, secondary, 30, (err, data) => {
  console.log(data);
  // try {
  //   expect(data).toBe("SECONDARY_FAST");
  //   done();
  // } catch (e) {
  //   done(e);
  // }
});
