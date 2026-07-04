function runWithDependencies(tasks, finalCallback) {
  let obj = {};
  let result = {};
  tasks.forEach((element) => {
    obj[element.id] = element;
  });
  // console.log(obj);
  tasks.forEach((element) => {
    element.deps.forEach((dependencyElement, index) => {
      obj[dependencyElement].run((err, data) => {
        result[dependencyElement] = data;
        if (index == element.deps.length - 1) {
          element.run((err, data) => {
            result[element.id] = data;
            finalCallback(null, result);
          });
        }
      });
    });
  });
}

const tasks = [
  {
    id: "A",
    deps: ["B"],
    run: (cb) => setTimeout(() => cb(null, "ResultA"), 10),
  },
  { id: "B", deps: [], run: (cb) => setTimeout(() => cb(null, "ResultB"), 50) },
];

runWithDependencies(tasks, (err, results) => {
  // try {
  //   expect(err).toBeNull();
  //   expect(results.A).toBe("ResultA");
  //   expect(results.B).toBe("ResultB");
  //   done();
  // } catch (e) {
  //   done(e);
  // }
  console.log(results);
});
