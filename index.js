/**
 * KINOID
 *
 * Unique IDs generator
 *
 * @fileoverview Generates a string made up of lowercase letters
 * and numbers. The algorithm generates each time a string
 * different from all those previously generated.
 *
 * @author Thorn Duke
 * @version 3.0.1
 * @license MIT
 * @copyright Thorn Duke 2024
 */

"use strict";

function kinoid() {
  let currTimeStamp = 0;
  let prevTimeStamp = 0;
  let singularity = 0;
  const startTime = 1640434800000;
  const slipPreventer = "1";
  const timeStampLength = 13;
  const singularityLength = 6;
  let pid = 0;
  const pidLength = 7;
  const errMsg =
    "A critical technical limit has been exceeded, Kinoid can no longer produce unique IDs. Ask for the library update.";

  try {
    if (typeof process !== "undefined" && process.pid) {
      pid = process.pid;
      if (pid.toString.length > pidLength) {
        throw new RangeError(errMsg, { cause: "pid is out of range" });
      }
    }
  } catch (error) {
    console.log(`${error.name}: ${error.message} [${error.cause}]`);
    throw error;
  }

  /**
   * Convert the number `val` to a string and then pads it with zeroes
   * (multiple times, if needed) until the resulting string reaches the
   * given `length`. The padding is applied from the start of the
   * string.
   *
   * @param {number|string} val the number that needs to be filled on the left
   * @param {number} length the length of the resulting string once the
   *  current `val` has been padded. If the value is less than or equal
   *  to `val.length`, then `val` is returned as-is.
   * @returns {string} a string of the specified `length` with zeroes
   *  applied from the start.
   */
  function zeroPadded(val, length) {
    return val.toString().padStart(length, 0);
  }

  /**
   * Takes a string representing a base 36 number and
   * returns the same number in base 10 as a bigInt
   *
   * @param {string} bigintVal
   * @returns {BigInt}
   */
  function int36ToBigInt(bigintVal) {
    return bigintVal
      .toString()
      .split("")
      .reduce((result, char) => result * BigInt(36) + BigInt(parseInt(char, 36)), 0n);
  }

  /**
   * Function that is invoked every time an ID is generated. Calculate
   * the timestamp value by assigning it the number of milliseconds
   * that have passed since the `startTime` epoch. The value of `singularity`
   * is incremented if the current timestamp value is the same as the
   * previous one, otherwise it is reset to zero.
   */
  function updateProperties() {
    try {
      currTimeStamp = Date.now() - startTime;
      if (currTimeStamp == prevTimeStamp) {
        singularity++;
      } else {
        singularity = 0;
        prevTimeStamp = currTimeStamp;
      }

      if (currTimeStamp.toString.length > timeStampLength) {
        throw new RangeError(errMsg, { cause: "timeStamp is out of range" });
      }

      if (singularity.toString.length > singularityLength) {
        throw new RangeError(errMsg, { cause: "singularity is out of range" });
      }
    } catch (error) {
      console.log(`${error.name}: ${error.message} [${error.cause}]`);
      throw error;
    }
  }

  const publicAPI = {
    /**
     * Generate a unique ID. The ID is unique because it is different
     * from all the other ones generated previously, subsequently or at
     * the same time on the same machine. An ID is made up of lowercase
     * characters and numbers
     *
     * @returns {string} the ID
     */
    newId: function () {
      updateProperties();

      const paddedSingularity = zeroPadded(singularity, singularityLength);
      const paddedTimeStamp = zeroPadded(currTimeStamp, timeStampLength);
      const paddedPid = zeroPadded(pid, pidLength);

      return BigInt(`${slipPreventer}${paddedTimeStamp}${paddedSingularity}${paddedPid}`).toString(
        36
      );
    },

    /**
     * Extracts from an ID the elements with which it was generated.
     *
     * @param {string} id a valid ID
     * @returns {{id: string, date: Date, singularity: number, pid: number}}
     *  an object containing the constituent elements of the ID
     */
    decodeId: function (id) {
      const decIdStr = int36ToBigInt(id).toString().substring(slipPreventer.length);
      const dateStart = 0;
      const dateEnd = dateStart + timeStampLength;
      const singularityStart = dateStart + timeStampLength;
      const singularityEnd = dateStart + timeStampLength + singularityLength;
      const pidStart = dateStart + timeStampLength + singularityLength;
      return {
        id,
        date: new Date(Number(decIdStr.slice(dateStart, dateEnd)) + startTime),
        singularity: Number(decIdStr.slice(singularityStart, singularityEnd)),
        pid: Number(decIdStr.slice(pidStart)),
      };
    },
  };

  return publicAPI;
}

// Using 'new Function()' _this_ is always bound
// to the global scope and the function returns
// the correct result
const isNode = new Function(`
try {
  return this === global;
} catch (e) {
  return false;
}
`);

if (isNode()) {
  module.exports = module.exports.default = kinoid;
}
