function ensureAsync(fn) {
  return async function (...args) {
    try {
      return fn(...args);
    } catch (err) {
      return err;
    }
  };
}
// test("propagates thrown errors as rejected promises", async () => {
const syncThrow = () => {
  throw new Error("boom");
};

const wrapped = ensureAsync(syncThrow);
console.log(
  wrapped().catch((err) => {
    console.log(err);
  }),
);

// await expect(wrapped()).rejects.toThrow("boom");
// });
