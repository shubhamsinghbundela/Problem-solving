async function raceWithMetadata(promiseMap) {
  return new Promise((resolve, reject) => {
    for (const key in promiseMap) {
      promiseMap[key]
        .then((data) => {
          resolve({ winner: key, value: data });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

(async () => {
  const promiseMap = {
    fastFail: new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Fail")), 10),
    ),
    slowSuccess: new Promise((resolve) =>
      setTimeout(() => resolve("Success"), 50),
    ),
  };
  console.log(await raceWithMetadata(promiseMap));
  // await expect(raceWithMetadata(promiseMap)).rejects.toThrow("Fail");
})();
