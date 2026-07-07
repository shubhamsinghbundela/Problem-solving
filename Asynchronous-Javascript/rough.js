function createSharedRequest(apiCallFn) {
  let arr = [];

  return function () {
    if (arr.length === 1) {
      return arr[0];
    }

    const result = Promise.resolve()
      .then(() => apiCallFn())
      .finally(() => arr.pop());

    arr.push(result);

    return result;
  };
}
(async () => {
  let callCount = 0;
  const api = async () => {
    callCount++;
    return `Result ${callCount}`;
  };

  const sharedApi = createSharedRequest(api);
  console.log(sharedApi);

  const first = await sharedApi();
  console.log(first);
  // expect(first).toBe("Result 1");

  const second = await sharedApi();
  console.log(second);
  // expect(second).toBe("Result 2");
  // expect(callCount).toBe(2);
  // expect(callCount).toBe(1);
})();
