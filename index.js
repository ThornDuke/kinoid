/**
 * KINOID
 *
 * @overview Unique IDs generator
 *
 * @description
 * Kinoid is a library that creates unique identifiers (IDs).
 * Each ID is unique because it's different from all the others
 * generated before or at the same time on the same machine.
 *
 * The parameters used to build these IDs are the current date
 * and time, the ID of the process running the program, and a
 * sequential number (the 'singularity factor') that ensures
 * the ID is unique even on very fast machines.
 *
 * The library provides two main functions:
 * - `newId()`: generates a new ID as a string.
 * - `decodeId()`: takes an existing ID and returns an object
 *   containing the components used to create that ID: date and
 *   time, singularity factor, and process ID.
 *
 * @author Thorn Duke
 * @version 3
 * @license MIT
 * @copyright Thorn Duke 2024
 */

'use strict';

/**
 * Library for the generation and decoding of unique identifiers
 *
 * @returns {{ newId: function, decodeId: function }}
 *
 * @example
 * const { newId, decodeId } = kinoid();
 * const id = newId();
 * // id => 'cohb4z87mvoyf1zjy'
 * const idStruct = decodeId(id)
 * // idStruct => {
 * //   id: 'cohb4z87mvoyf1zjy',
 * //   date: 2024-11-19T16:52:19.962Z,
 * //   singularity: 1144,
 * //   pid: 5438
 * // }
 */
function kinoid() {
  /**
   * It's the format for an ID: a 17-character
   * string made up of lowercase letters and numbers
   * @constant
   * @type {RegExp}
   */
  const idRe = new RegExp('^[a-z0-9]{17}$');

  let currTimeStamp = 0;
  let prevTimeStamp = 0;
  let singularity = 0;
  const startTime = 1640434800000;
  const slipPreventer = '1';
  const timeStampLength = 13;
  const singularityLength = 6;
  let pid = 0;
  const pidLength = 7;
  const errMsg =
    'A critical technical limit has been reached. Kinoid is unable to generate unique IDs. Please ask the system administrator for a library update.';

  try {
    if (typeof process !== 'undefined' && process.pid) {
      pid = process.pid;
      if (pid.toString.length > pidLength) {
        throw new RangeError(errMsg, { cause: 'pid is out of range' });
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
   *   current `val` has been padded. If the value is less than or equal
   *   to `val.length`, then `val` is returned as-is.
   * @returns {string} a string of the specified `length` with zeroes
   *   applied from the start.
   */
  function zeroPadded(val, length) {
    return val.toString().padStart(length, 0);
  }

  /**
   * Takes a string as input and checks if it has the structure of
   * a valid ID
   *
   * @param {string} id
   * @returns boolean
   */
  function hasIdStructure(id) {
    return idRe.test(id);
  }

  /**
   * Takes a string representing an _ID_ (a base36 number 17 characters
   * long) as input and returns a BigInt representing the same number in
   * base 10. It raises an error if the input string is not a valid ID.
   *
   * @param {string} bigintVal
   * @returns {BigInt}
   */
  function int36ToBigInt(bigintVal) {
    return bigintVal
      .toString()
      .split('')
      .reduce((result, char) => result * BigInt(36) + BigInt(parseInt(char, 36)), BigInt(0));
  }

  /**
   * Function that is invoked every time an ID is generated. Calculates
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
        throw new RangeError(errMsg, { cause: 'timeStamp is out of range' });
      }

      if (singularity.toString.length > singularityLength) {
        throw new RangeError(errMsg, { cause: 'singularity is out of range' });
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
      const idMask = `${slipPreventer}${paddedTimeStamp}${paddedSingularity}${paddedPid}`;

      return BigInt(idMask).toString(36);
    },

    /**
     * Extracts from an ID the elements with which it was generated.
     *
     * @param {string} id a valid ID
     * @returns {{ id: string, date: Date, singularity: number, pid: number }|{ error: string }}
     *   if the ID is a valid ID it returns an object containing its
     *   constituent elements, otherwise it returns an object
     *   containing an error message. For the definition of
     *   '_valid ID_' see {@link idRe}
     */
    decodeId: function (id) {
      const decIdStr = int36ToBigInt(id).toString().substring(slipPreventer.length);
      const dateStart = 0;
      const dateEnd = dateStart + timeStampLength;
      const singularityStart = dateStart + timeStampLength;
      const singularityEnd = dateStart + timeStampLength + singularityLength;
      const pidStart = dateStart + timeStampLength + singularityLength;

      const idDate = new Date(Number(decIdStr.slice(dateStart, dateEnd)) + startTime);
      const idSingularity = Number(decIdStr.slice(singularityStart, singularityEnd));
      const idPid = Number(decIdStr.slice(pidStart));

      if (hasIdStructure(id) && idDate.valueOf() >= startTime && idSingularity >= 0 && idPid >= 0) {
        return {
          id,
          date: idDate,
          singularity: idSingularity,
          pid: idPid,
        };
      } else {
        return { error: `the string ${id} is not a valid ID` };
      }
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
