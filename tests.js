const os = require("os");
const kinoid = require("./index");

const { newId, decodeId } = kinoid();

const repetitions = 10000;

const start = process.hrtime.bigint();
for (let i = 1; i <= repetitions; i++) {
  newId();
}
const end = process.hrtime.bigint();

const singleId = newId();

console.log(`
**
** Test performed on Node ${process.version}
** running on ${os.arch()} with ${os.type()} ${os.release()} OS
** with a CPU ${os.cpus()[0].model}
**
** ID          : ${singleId}
** computed on : ${decodeId(singleId).date.toISOString()}
** singularity : ${decodeId(singleId).singularity}
** process id  : ${decodeId(singleId).pid}
**
** main function called ${repetitions} times
**
** time elapsed: ${Number(end - start) / 1000000} milliseconds
**
`);
