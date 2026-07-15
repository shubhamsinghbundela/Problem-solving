// Problem Description – Dependency Resolver (Simple DAG)
//
// You are given an object of tasks where each task may depend on other tasks.
// Your task is to implement resolveDependencies(tasks).
//
// Tasks without dependencies should start immediately in parallel.
// Tasks with dependencies must wait until all required parent tasks finish.
//
// Input example:
// { A: { fn }, B: { fn }, C: { fn, deps: ['A','B'] } }
async function resolveDependencies(tasks) {
  return new Promise((resolve, reject) => {
    let output = {};
    let current = {};
    for (let key in tasks) {
      if (!("deps" in tasks[key])) {
        let complete = 0;
        current[key] = true;
        tasks[key]
          .fn()
          .then((data) => {
            complete++;
            output[key] = data;
          })
          .finally(() => {
            let lengthOfTasks = Object.keys(tasks).length;
            if (complete === lengthOfTasks - 1) {
              resolve(output);
            }
          });
      } else {
        let complete = 0;
        tasks[key].deps.forEach((element) => {
          if (current[element]) {
            complete++;
            if (complete === tasks[key].deps.length) {
              current[key] = true;
              tasks[key].fn().then((data) => {
                output[key] = data;
                const lengthOfTasks = Object.keys(tasks).length;
                const lengthOfOutput = Object.keys(output).length;

                if (lengthOfTasks == lengthOfOutput) {
                  resolve(output);
                }
              });
            }
            return;
          } else {
            current[element] = true;
            tasks[element]
              .fn()
              .then((data) => {
                output[element] = data;
                complete++;
              })
              .finally(() => {
                if (complete === tasks[key].deps.length) {
                  current[key] = true;
                  tasks[key].fn().then((data) => {
                    output[key] = data;
                    const lengthOfTasks = Object.keys(tasks).length;
                    const lengthOfOutput = Object.keys(output).length;

                    if (lengthOfTasks == lengthOfOutput) {
                      resolve(output);
                    }
                  });
                }
              });
          }
        });
      }
    }
  });
}

module.exports = resolveDependencies;
