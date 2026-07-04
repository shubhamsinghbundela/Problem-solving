// Problem Description – Task Execution with Dependencies
//
// You are given a set of asynchronous tasks where some tasks depend
// on the completion of others.
// Your goal is to execute each task only after all of its dependencies
// have been successfully completed.
// The solution should ensure correct execution order and handle
// dependency relationships properly.
//
// Each task is asynchronous and must invoke a callback when finished.
// Invoke finalCallback after all tasks have completed, or with an error
// if any task fails.

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

module.exports = runWithDependencies;
