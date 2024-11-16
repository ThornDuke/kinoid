/**
 * Genera un ID univoco.
 *
 * L'ID è una stringa lunga 24 caratteri composta da numeri e dai 26 caratteri minuscoli dell'alfabeto inglese; può essere considerato come un numero in base 36 composto da 24 cifre.
 *
 * L'ID generato è univoco perchè, qualunque sia il numero di ID generati, nessun ID sarà mai uguale a uno generato precedentemente nè a nessun ID che sarà generato successivamente e neanche a nessun ID generato contemporaneamente in un qualunque altro processo che giri sulla stessa macchina.
 *
 * La prima parte riflette lo stato dell'intero Universo, che non è mai uguale a se stesso; la seconda parte è costituita da una singolarità che riflette la coscienza interiore del programma; la terza parte riflette lo stato involontario della macchina; la quarta parte rappresenta la pazzia che è dei poeti, dei bambini, degli dei e degli amanti.
 *
 * INSTALLAZIONE
 * USO
 * ALTRO
 */
module.exports = module.exports.default = function () {
  const pool = createPool();
  const pidStr = typeof process !== "undefined" && process.pid ? process.pid.toString(36) : "";
  let singularity = 0;

  function randomValue(max = 100000) {
    return Math.floor(Math.random() * max);
  }

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

  function randStr(length) {
    let result = "";
    for (let i = 1; i <= length; i++) {
      result += pool[randomValue(pool.length)];
    }
    return result;
  }

  function timeStr() {
    return Date.now().toString(36);
  }

  function singularityStr() {
    singularity++;
    return singularity.toString(36);
  }

  return function () {
    return `${timeStr()}${singularityStr()}${pidStr}`.padEnd(24, randStr(18));
  };
};
