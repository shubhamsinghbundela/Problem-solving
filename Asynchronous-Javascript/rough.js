function createWindowAggregator(windowSize, onWindowReady) {
  let arr = [];
  let sum = 0;
  return function (...args) {
    arr.push(...args);
    let avg = 0;
    if (arr.length <= windowSize) {
      sum += arr[arr.length - 1];
      avg = sum / arr.length;
    } else {
      for (let i = windowSize; i < arr.length; i++) {
        sum += arr[i];
        sum -= arr[i - windowSize];
      }
      avg = sum / windowSize;
    }

    onWindowReady(avg);
  };
}
const results = [];

const onWindowReady = (avg) => {
  results.push(avg);
  if (results.length === 4) {
    console.log(results);
  }
};

const add = createWindowAggregator(3, onWindowReady);

add(1);
add(2);
add(3);
add(10);
