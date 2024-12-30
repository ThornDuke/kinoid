# kinoid

[![NPM Version](https://img.shields.io/npm/v/kinoid?style=plastic&logo=npm&label=version&labelColor=black)](https://www.npmjs.com/package/kinoid)
[![NPM Downloads](https://img.shields.io/npm/d18m/kinoid?style=plastic&logo=npm&labelColor=black)](https://www.npmjs.com/package/kinoid)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/kinoid?style=plastic&logo=jsdelivr&logoColor=white&color=orange&labelColor=black)](https://www.jsdelivr.com/package/npm/kinoid)
[![Unpkg Powered](https://img.shields.io/badge/powered-111000?style=plastic&logo=unpkg&label=unpkg&labelColor=black&color=FD0)](https://unpkg.com/browse/kinoid@3/)
[![Codesandbox Powered](https://img.shields.io/badge/powered-111000?style=plastic&logo=codesandbox&label=codesandbox&labelColor=black&color=90EE90)](https://codesandbox.io/p/sandbox/pdj5qy)
[![NPM License](https://custom-icon-badges.demolab.com/npm/l/kinoid?style=plastic&logo=law&labelColor=black)](https://opensource.org/license/mit)
[![npm bundle size](https://img.shields.io/bundlephobia/min/kinoid?style=plastic&logo=webpack&logoColor=white&labelColor=black)](https://bundlephobia.com/package/kinoid)

An ultra-light, url-friendly unique IDs generator. For `node` and browsers.

## Overview

The **kinoid** library generates unique IDs as strings made up of numbers and the 26 lowercase
characters of the english alphabet; every string generated by kinoid can be considered as a
[base36 number](https://en.wikipedia.org/wiki/Base36).

The generated IDs are _unique_ because, no matter how many IDs are generated, each ID is different
from all the others generated before or at the same time on the same machine.

### Features

Each ID is composed of a timestamp (representing milliseconds since the UNIX epoch), a number that
identifies the process in which the program runs, and a final number which can be said a
_serialization value_ or a _singularity factor_ that guarantees the uniqueness of the ID.

IDs are sortable by time, because they are based on the time they were created. Additionally, the
time an ID was created can be calculated from the ID itself thanks to the `decodeId()` utility which
returns an object containing, among other things, the date on which that ID was generated.

### Warning

<span style="color: white; background-color: red; padding: .125em .5em .125em .5em">**IDs are not
passwords**</span> Kinoid ensures that each generated ID is _unique_, but not _necessarily
unpredictable_.

This depends on a logical limit that affects _all_ libraries: an algorithm that produces
unpredictable strings cannot guarantee their uniqueness and, vice versa, an algorithm that produces
unique strings cannot guarantee their unpredictability.

If you need a library for creating cryptographically secure passwords, consider
[crypto-pwd-generator](https://www.npmjs.com/package/crypto-pwd-generator)

## Installation

```bash
# with npm
npm install kinoid

# with yarn
yarn add kinoid
```

## How to use

### using `require`

```javascript
const { newId } = require('kinoid')();

const newBook = {
  title: 'The absence of non-existent unthoughts',
  author: 'John White',
  publisher: 'Hypercubes',
  id: newId(),
};

db.add(newBook);
```

### using `import`

```javascript
import kinoid from 'kinoid';
const { newId, decodeId } = kinoid();

const id = newId();

console.log(id);
// cohb4z87mvoyf1zjy

console.log(`The id '${id}' was generated on ${decodeId(id).date.toDateString()}`);
// The id 'cohb4z87mvoyf1zjy' was generated on Tue Nov 19 2024

console.log(decodeId(id));
// {
//   id: 'cohb4z87mvoyf1zjy',
//   date: 2024-11-19T16:52:19.962Z,
//   singularity: 1144,
//   pid: 5438
// }

const invalidId = 'c1vz87moyfzjyoHB4';
console.log(decodeId(invalidId));
// {
//   id: 'c1vz87moyfzjyoHB4',
//   error: 'the string c1vz87moyfzjyoHB4 is not a valid ID'
// }
```

### using the browser

<a href="https://codesandbox.io/p/sandbox/pdj5qy" target="_blank">![Open in SandBox](https://img.shields.io/badge/open%20in%20CodeSandbox-darkgreen?style=for-the-badge&logo=codesandbox&logoColor=black&labelColor=%23e3ff73)</a>

```html
<!doctype html>
<html lang="en">
  <head>
    <title>ID generator</title>
    <script src="https://cdn.jsdelivr.net/npm/kinoid@3"></script>
    <!--
    you may also use
    <script src="https://unpkg.com/kinoid@3"></script>
    -->
    <script>
      const { newId, decodeId } = kinoid();
      function clickHandler() {
        const id = newId();
        const idStruct = decodeId(id);

        document.getElementById('id-viewer').innerHTML = `
<pre>
ID:          <b>${id}</b>
time:        ${idStruct.date.toISOString()}
singularity: ${idStruct.singularity}
process:     ${idStruct.pid}
</pre>`;
      }
    </script>
  </head>

  <body>
    <button onclick="clickHandler()">get new ID</button>
    <div id="id-viewer" style="font-family: monospace">
      <p>here will be an ID</p>
    </div>
  </body>
</html>
```

## Contributing

Contributions to this project are welcomed!

Whether you have

- questions, concerns, or suggestions for improving this library
- want to report a bug
- submit a fix
- propose new features

please don't hesitate to reach out to me on GitHub and
[open an issue](https://github.com/ThornDuke/kinoid/issues).

## Disclaimer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the “Software”), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
