const os = require("os");
const kinoid = require("./index");

const { newId, decodeId } = kinoid();

const repetitions = 1000000;

const start = process.hrtime.bigint();
for (let i = 1; i <= repetitions; i++) {
  newId();
}
const end = process.hrtime.bigint();

const singleId = newId();

const deltaT = Number(end - start);
const elapsedTimeMs = deltaT / 1000000;
const timeForOneOpNs = deltaT / repetitions;
const operationsPerSec = Number((BigInt(repetitions) * 1000000000n) / BigInt(deltaT));

console.log(`
**
** Test performed on ${process.release.name} ${process.version}
** running on ${os.arch()} with ${os.type()} ${os.release()} OS
** with a CPU ${os.cpus()[0].model}
**
** generate and decode one ID
**   ID           : ${singleId}
**   computed on  : ${decodeId(singleId).date.toISOString()}
**   singularity  : ${decodeId(singleId).singularity}
**   process id   : ${decodeId(singleId).pid}
**
** ids generated ${new Intl.NumberFormat().format(repetitions)} times
**   time elapsed : ${new Intl.NumberFormat().format(elapsedTimeMs)} milliseconds
**   time for op  : ${new Intl.NumberFormat().format(timeForOneOpNs)} nanoseconds
**   ops/s        : ${new Intl.NumberFormat().format(operationsPerSec)}
**
`);
