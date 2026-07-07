// Problem Description – Async Observer Event Emitter
//
// You are required to implement an AsyncEventEmitter that supports async listeners.
//
// The emitter must provide:
// 1. on(event, listener): register an async listener for an event
// 2. emit(event, data): trigger all listeners for that event
//
// The emit() method must return a Promise that resolves only after all listeners
// have finished execution (use Promise.allSettled).

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
    if (!Array.isArray(this.obj[event])) {
      return [];
    }
    const promises = this.obj[event].map((e) => e());
    return Promise.allSettled(promises);
  }
}

module.exports = AsyncEventEmitter;
