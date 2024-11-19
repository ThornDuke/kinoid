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
  let singularity = 0;
  const singularityLength = 12;
  let lastTimeStamp = 0;
  let currTimeStamp = 0;
  const timeStampLength = 15;
  const pid = typeof process !== "undefined" && process.pid ? process.pid : 0;
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
      const singularityStr = zeroPadded(singularity, singularityLength);
      const timeStr = zeroPadded(currTimeStamp, timeStampLength);
      const pidStr = zeroPadded(pid, pidLength);

      return BigInt(`1${timeStr}${singularityStr}${pidStr}`).toString(36);
    },
    decodeId: function (id) {
      const idStr = bigIntToDec(id).toString();
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
