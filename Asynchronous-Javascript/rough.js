(async () => {
  const fn = async () => {
    await new Promise((res) => setTimeout(res, 150));
    return "done";
  };

  const limitedFn = timeLimit(fn, 50);
  console.log(await limitedFn());

  // await expect(limitedFn()).rejects.toBe("Time Limit Exceeded");
})();
