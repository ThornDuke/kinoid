//
// KINOID
//
// Generates a string made up of lowercase letters and numbers.
// The algorithm generates each time a string different from all those
// previously generated.
//
// Thorn Duke 2024
//

"use strict";

module.exports = module.exports.default = function () {
  let currTimeStamp = 0;
  let lastTimeStamp = 0;
  let singularity = 0;
  const pid = typeof process !== "undefined" && process.pid ? process.pid : 0;
  const timeStampLength = 13;
  const singularityLength = 6;
  const pidLength = 7;

  if (pid.toString.length > pidLength) {
    throw new RangeError(
      "a critical technical limit has been exceeded, Kinoid can no longer produce unique IDs. Ask for the library update.",
      { cause: "pid is out of range" }
    );
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
  function bigIntToDec(bigintVal) {
    return [...bigintVal.toString()].reduce((r, v) => r * BigInt(36) + BigInt(parseInt(v, 36)), 0n);
  }

  /**
   * Function that is invoked every time an ID is generated. Calculate
   * the timestamp value by assigning it the number of milliseconds
   * that have passed since the UNIX epoch. The value of `singularity`
   * is incremented if the current timestamp value is the same as the
   * previous one, otherwise it is reset to zero.
   */
  function updateProperties() {
    // Checking these values ​​ensures that the IDs are all 17 characters long
    const lastId = {
      timeStamp: 2865117999580, // 2060-10-16T02:06:39.580Z
      singularity: 704318,
      pid: 38109695,
    };

    currTimeStamp = Date.now();
    if (currTimeStamp == lastTimeStamp) {
      singularity++;
    } else {
      singularity = 0;
      lastTimeStamp = currTimeStamp;
    }

    if (
      currTimeStamp >= lastId.timeStamp &&
      singularity >= lastId.singularity &&
      pid >= lastId.pid
    ) {
      throw new RangeError(
        "a critical technical limit has been exceeded, Kinoid can no longer produce unique IDs. Ask for the library update.",
        { cause: "ID is out of range" }
      );
    }

    if (currTimeStamp.toString.length > timeStampLength) {
      throw new RangeError(
        "a critical technical limit has been exceeded, Kinoid can no longer produce unique IDs. Ask for the library update.",
        { cause: "timeStamp is out of range" }
      );
    }

    if (singularity.toString.length > singularityLength) {
      throw new RangeError(
        "a critical technical limit has been exceeded, Kinoid can no longer produce unique IDs. Ask for the library update.",
        { cause: "singularity is out of range" }
      );
    }
  }

  const publicAPI = {
    /**
     * Generate a unique ID. The ID is unique because it is different
     * from all the others generated previously, subsequently or at
     * the same time on the same machine. An ID is made up of lowercase
     * characters and numbers
     * @returns {string} the ID
     */
    newId: function () {
      try {
        updateProperties();
      } catch (e) {
        console.log(`${e.name}: ${e.message} [${e.cause}]`);
        throw e;
      }

      const paddedSingularity = zeroPadded(singularity, singularityLength);
      const paddedTimeStamp = zeroPadded(currTimeStamp, timeStampLength);
      const paddedPid = zeroPadded(pid, pidLength);

      return BigInt(`${paddedTimeStamp}${paddedSingularity}${paddedPid}`).toString(36);
    },

    /**
     * Extracts from an ID the elements with which it was generated.
     *
     * @param {string} id a valid ID
     * @returns {{id: string, date: Date, singularity: number, pid: number}}
     *  an object containing the constituent elements of the ID
     */
    decodeId: function (id) {
      const decIdStr = bigIntToDec(id).toString();
      const dateStart = 0;
      const dateEnd = dateStart + timeStampLength;
      const singularityStart = dateStart + timeStampLength;
      const singularityEnd = dateStart + timeStampLength + singularityLength;
      const pidStart = dateStart + timeStampLength + singularityLength;
      return {
        id,
        date: new Date(Number(decIdStr.slice(dateStart, dateEnd))),
        singularity: Number(decIdStr.slice(singularityStart, singularityEnd)),
        pid: Number(decIdStr.slice(pidStart)),
      };
    },
  };

  return publicAPI;
};
