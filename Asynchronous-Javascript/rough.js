class AsyncEventEmitter {
  constructor() {
    this.obj = {};
  }

  on(event, listener) {
    if (Array.isArray(this.obj[event])) {
      this.obj[event].push(listener);
    } else {
      this.obj[event] = [];
      this.obj[event].push(listener);
    }
  }

  emit(event, data) {
    console.log(!Array.isArray(this.obj[event]));
    if (!Array.isArray(this.obj[event])) {
      return [];
    }
    const promises = this.obj[event]?.map((e) => e());
    return Promise.allSettled(promises);
  }
}

(async () => {
  const emitter = new AsyncEventEmitter();
  const results = await emitter.emit("non-existent");
  expect(results).toEqual([]);
})();
