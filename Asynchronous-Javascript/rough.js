(async () => {
  let attempts = 0;

  const fn = async () => {
    attempts++;
    throw new Error("always fails");
  };

  const result = await retryWithBackoff(fn, 2, 10);
  console.log("Attempts:", attempts);

  // Manual checks
  console.assert(result === "success", "Expected success");
  console.assert(attempts === 3, "Expected 3 attempts");
})();
