//
// KINOID
//
// Generates a 24-character string of lowercase letters and numbers.
// The algorithm generates each time a different string than all those
// generated previously.
//

module.exports = module.exports.default = function () {
  const pool = createPool();
  const pidStr = typeof process !== "undefined" && process.pid ? process.pid.toString(36) : "";
  let singularity = 0;

  /**
   * Generates a random integer number between 0 (inclusive) and _max_ (not inclusive)
   * @param {number} max limit value
   * @returns {number} a random integer number between 0 (inclusive) and _max_ (not inclusive)
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
   * Generates a random string of _length_ length
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
    return Date.now().toString(36);
  }

  /**
   * The 'singularity' is an integer that is incremented every time an
   * ID is created, and which will become part of the structure of the
   * ID itself. This function takes care of incrementing the value of
   * the 'singularity' and returning it as a base 36 number expressed
   * as a string value
   * @returns {string} a base-36 number
   */
  function singularityStr() {
    singularity++;
    return singularity.toString(36);
  }

  /**
   * Creates a string 24 characters long. The string is different from
   * all those created previously or at the same time.
   */
  return function () {
    return `${timeStr()}${singularityStr()}${pidStr}`.padEnd(24, randStr(18));
  };
};
