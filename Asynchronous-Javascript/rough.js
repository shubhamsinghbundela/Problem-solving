async function doubleTry(fn) {
  try {
    return await fn();
  } catch (err) {
    return await fn();
  }
}

let callCount = 0;
const fn = async () => {
  callCount++;
  return "Success";
};

(async () => {
  let callCount = 0;
  const fn = async () => {
    callCount++;
    if (callCount === 1) throw new Error("First Failure");
    return "Second Success";
  };

  const result = await doubleTry(fn);
  console.log(result);
  console.log(callCount);
  // expect(result).toBe("Second Success");
  // expect(callCount).toBe(2);
})();
