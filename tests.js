const os = require("os");
const idGenerator = require("./index");

const id = idGenerator();

const repetitions = 10000;

const start = process.hrtime.bigint();
for (let i = 1; i <= repetitions; i++) {
  id();
}
const end = process.hrtime.bigint();

console.log(`
**
** Test performed on Node ${process.version}
** running on ${os.arch()} with ${os.type()} ${os.release()} OS
** with a CPU ${os.cpus()[0].model}
**
** ID: ${id()}
** 
** same function called ${repetitions} times
**
** time elapsed: ${Number(end - start) / 1000000} milliseconds
**
`);
