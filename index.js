//
// KINOID
//
// Generates a 24-character string made up of lowercase letters and numbers.
// The algorithm generates each time a string different from all those
// previously generated.
//
// Thorn Duke 2024
//

"use strict";

module.exports = module.exports.default = function () {
  const pool = createPool();
  let singularity = 0;
  let lastTimeStamp = "";
  let currTimeStamp = "";

  /**
   * Generates a random integer number between 0 (inclusive) and _max_
   * (not inclusive)
   * @param {number} max limit value
   * @returns {number} a random integer number between 0 (inclusive)
   * and _max_ (not inclusive)
   */
  function randomValue(max = 100000) {
    return Math.floor(Math.random() * max);
  }

  /**
   * Generates a 36-character long string made up of the numbers from 0
   * to 9 and all the lowercase characters of the English alphabet. The
   * characters are randomly ordered.
   * Kinoid uses this string to generate the random characters that will
   * be used to construct the IDs.
   * @returns {string} A string with randomly ordered characters
   */
  function createPool() {
    return "abcdefghijklmnopqrstuvwxyz0123456789"
      .split("")
      .map((char) => ({
        char,
        r: randomValue(),
      }))
      .sort((prec, succ) => succ.r - prec.r)
      .map((item) => item.char)
      .join("");
  }

  /**
   * Generates a random string made up of _length_ characters
   * @param {number} length the length of the string
   * @returns {string} a random string
   */
  function randStr(length) {
    let result = "";
    for (let i = 1; i <= length; i++) {
      result += pool[randomValue(pool.length)];
    }
    return result;
  }

  /**
   * Transforms the system date and time into a base-36 number that
   * is returned as a string
   * @returns {string}
   */
  function timeStr() {
    currTimeStamp = Date.now();
    if (currTimeStamp == lastTimeStamp) {
      singularity++;
    } else {
      singularity = 0;
      lastTimeStamp = currTimeStamp;
    }
    return currTimeStamp.toString().padStart(15, 0);
  }

  function singularityStr() {
    return singularity.toString().padStart(12, 0);
  }

  function pidStr() {
    const pid = typeof process !== "undefined" && process.pid ? process.pid : 0;
    return pid.toString().padStart(7, 0);
  }

  function biToDec(value) {
    return [...value.toString()].reduce((r, v) => r * BigInt(36) + BigInt(parseInt(v, 36)), 0n);
  }

  const publicAPI = {
    newId: function () {
      return BigInt(`1${timeStr()}${singularityStr()}${pidStr()}`).toString(36);
    },
    decodeId: function (id) {
      const idStr = biToDec(id).toString();
      return {
        id,
        date: new Date(Number(idStr.slice(1, 16))),
        step: Number(idStr.slice(16, 28)),
        pid: Number(idStr.slice(28)),
      };
    },
  };

  return publicAPI;
};
