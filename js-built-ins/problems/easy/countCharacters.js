/*
  Write a function `countCharacters` which takes a string as input and returns an object representing the frequency of each character in the string.

  Example:
  - Input: "hello"
  - Output: { h: 1, e: 1, l: 2, o: 1 }

  - Input: "aabbcc"
  - Output: { a: 2, b: 2, c: 2 }

  - Input: ""
  - Output: {}

  Note:
  - The function should count all characters, including spaces and special characters.
  - The function should handle empty strings gracefully.

  Once you've implemented the logic, test your code by running
  - `npm run test-countChar`
*/

const countCharacters = (statement) => {
  const obj = {};
  for (let i = 0; i < statement.length; i++) {
    if (obj[statement.charAt(i)]) {
      obj[statement.charAt(i)] += 1;
    } else {
      obj[statement.charAt(i)] = 1;
    }
  }
  return obj;
};
module.exports = countCharacters;
