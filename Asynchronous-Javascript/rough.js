function delayResult(value, ms) {
  return new Promise((res) => setTimeout(res(value), ms));
}

(async () => {
  const start = Date.now();
  const result = await delayResult("Success", 100);
  const end = Date.now();

  console.log("result", result);
  console.log(end - start);
})();

// expect(result).toBe("Success");
// expect(end - start).toBeGreaterThanOrEqual(100);
