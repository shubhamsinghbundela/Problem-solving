class GuardedAPI {
  constructor() {
    this.queue = [];
  }

  init(initTask) {
    initTask((err, data) => {
      this._flush();
    });
  }

  call(apiFn, onComplete) {
    this.queue.push({ apiFn, onComplete });
  }

  _flush() {
    while (this.queue.length !== 0) {
      const { apiFn, onComplete } = this.queue.shift();
      apiFn((err, data) => {
        if (err) {
          onComplete(err);
        } else {
          onComplete(err, data);
        }
      });
    }
  }
}
const api = new GuardedAPI();
let initDone = false;

api.init((cb) => {
  setTimeout(() => {
    initDone = true;
    cb(null);
  }, 50);
});

api.call(
  (cb) => cb(null, "success"),
  (err, data) => {
    // try {
    //   expect(initDone).toBe(true);
    //   expect(data).toBe("success");
    //   done();
    // } catch (e) {
    //   done(e);
    // }
    console.log("initDone", initDone);
    console.log("data", data);
  },
);
