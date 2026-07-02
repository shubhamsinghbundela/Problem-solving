/*
  Write a function `compression` which takes a string as input and returns a compressed version of the string. The compression is done by replacing consecutive repeating characters with the character followed by the count of repetitions. If a character does not repeat, it is not followed by a count.

  Example:
  - Input: "aaabbbbcccvvmm"
  - Output: "a3b4c3v2m2"

  - Input: "abc"
  - Output: "abc"

  - Input: "aabbcc"
  - Output: "a2b2c2"

  - Input: ""
  - Output: ""

  Note:
  - The function should work for any alphanumeric string.

  Once you've implemented the logic, test your code by running
  - `npm run test-compressString`
*/

// function compression(str: string) {
//   let obj: Record<string, number> = {};
//   let newStr = "";
//   for (let i = 0; i < str.length; i++) {
//     console.log(obj);
//     if (str.charAt(i) in obj) {
//       obj[str.charAt(i)] += 1;
//     } else {
//       for (let [key, value] of Object.entries(obj)) {
//         if (value > 1) {
//           newStr += key;
//           newStr += value;
//         } else {
//           newStr += key;
//         }
//         delete obj[key];
//       }

//       obj[str.charAt(i)] = 1;
//     }
//   }

//   for (let [key, value] of Object.entries(obj)) {
//     if (value > 1) {
//       newStr += key;
//       newStr += value;
//     } else {
//       newStr += key;
//     }
//     delete obj[key];
//   }

//   return newStr;
// }

// const result = compression("aabba");
// console.log(result);

function compression(str) {
  let obj = {};
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    console.log(obj);
    if (str.charAt(i) in obj) {
      obj[str.charAt(i)] += 1;
    } else {
      for (let [key, value] of Object.entries(obj)) {
        if (value > 1) {
          newStr += key;
          newStr += value;
        } else {
          newStr += key;
        }
        delete obj[key];
      }

      obj[str.charAt(i)] = 1;
    }
  }

  for (let [key, value] of Object.entries(obj)) {
    if (value > 1) {
      newStr += key;
      newStr += value;
    } else {
      newStr += key;
    }
    delete obj[key];
  }

  return newStr;
}

module.exports = compression;
