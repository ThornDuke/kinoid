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

  function zeroPadded(val, length) {
    return val.toString().padStart(length, 0);
  }

  /**
   * Takes a string representing a base 36 number and
   * returns the same number in base 10 as a bigInt
   * @param {string} bigintVal
   * @returns {BigInt}
   */
  function bigIntToDec(bigintVal) {
    return [...bigintVal.toString()].reduce((r, v) => r * BigInt(36) + BigInt(parseInt(v, 36)), 0n);
  }

  function updateProperties() {
    currTimeStamp = Date.now();
    if (currTimeStamp == lastTimeStamp) {
      singularity++;
    } else {
      singularity = 0;
      lastTimeStamp = currTimeStamp;
    }
  }

  const publicAPI = {
    newId: function () {
      updateProperties();
      const paddedSingularity = zeroPadded(singularity, singularityLength);
      const paddedTimeStamp = zeroPadded(currTimeStamp, timeStampLength);
      const paddedPid = zeroPadded(pid, pidLength);

      return BigInt(`${paddedTimeStamp}${paddedSingularity}${paddedPid}`).toString(36);
    },
    decodeId: function (id) {
      const decIdStr = bigIntToDec(id).toString();
      const dateStart = 0;
      const dateEnd = dateStart + timeStampLength;
      const stepStart = dateStart + timeStampLength;
      const stepEnd = dateStart + timeStampLength + singularityLength;
      const pidStart = dateStart + timeStampLength + singularityLength;
      return {
        id,
        date: new Date(Number(decIdStr.slice(dateStart, dateEnd))),
        step: Number(decIdStr.slice(stepStart, stepEnd)),
        pid: Number(decIdStr.slice(pidStart)),
      };
    },
  };

  return publicAPI;
};
