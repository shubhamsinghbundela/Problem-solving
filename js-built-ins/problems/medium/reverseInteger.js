/*
  Write a function `reverseInteger` which takes an integer as input and returns the integer with its digits reversed. If the input is negative, the reversed integer should also be negative.

  What is reversing an integer?
  - Reversing an integer means rearranging its digits in the opposite order while maintaining its sign.

  Example:
  - Input: 123
  - Output: 321

  - Input: -456
  - Output: -654

  - Input: 100
  - Output: 1

  - Input: 0
  - Output: 0

  Once you've implemented the logic, test your code by running
  - `npm run test-reverseInteger`
*/

// function reverseInteger(num: number): number {
//   let str = String(num);
//   let str1 = "";
//   let str2 = "";

//   for (let i = str.length - 1; i >= 0; i--) {
//     if (!isNaN(Number(str.charAt(i)))) {
//       str2 += str.charAt(i);
//     } else {
//       str1 += str.charAt(i);
//     }
//   }
//   let newStr = str1 + str2;
//   return Number(newStr);
// }

function reverseInteger(num) {
  let str = String(num);
  let str1 = "";
  let str2 = "";

  for (let i = str.length - 1; i >= 0; i--) {
    if (!isNaN(Number(str.charAt(i)))) {
      str2 += str.charAt(i);
    } else {
      str1 += str.charAt(i);
    }
  }
  let newStr = str1 + str2;
  return Number(newStr);
}

module.exports = reverseInteger;
