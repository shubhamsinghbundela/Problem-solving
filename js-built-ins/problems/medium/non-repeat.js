/*
  Write a function `nonrepeat` which takes a string as input and returns the first non-repeating character in the string.

  What is a non-repeating character?
  - A character that appears only once in the entire string.

  Example:
  - Input: "abcab"
  - Output: "c"

  - Input: "aabbcc"
  - Output: null

  - Input: "abcdef"
  - Output: "a"

  - Input: ""
  - Output: null

  Once you've implemented the logic, test your code by running
  - `npm run test-nonrepeat`
*/
function nonrepeat(str) {
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) in obj) {
      delete obj[str.charAt(i)];
    } else {
      //   console.log("29");
      obj[str.charAt(i)] = 0;
    }
  }
  let total = Object.keys(obj).length;
  if (total >= 1) {
    return Object.keys(obj)[0];
  } else {
    return null;
  }
}
module.exports = nonrepeat;
