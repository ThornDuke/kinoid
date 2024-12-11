# Change Log

<!--
## [Unreleased] | [major.minor.patch] - yyyy-mm-dd
### Added | Fixed | Changed | Removed | Deprecated | Security
- filename {section}: description

https://gist.github.com/ThornDuke/64da76cd4a56b16492d5101691f6108f
-->

## [Unreleased]

### Changed

- index.js: some strings now have a better language style
- README.md: some strings now have a better language style

### Added

- index.js: a lot of documentation
- index.js {int36ToBigInt()}: error checking; a better documentation
- index.js {decodeId()}: error checking
- index.js {idRe}: the format for an ID
- index.js {hasIdStructure()}
- README.md: link to a sandbox

### Removed

- package.json: the `bin` field is not necessary, as `index.js` is not an executable file.

## [3.0.2] - 2024-12-06

### Added

- README.md: a warning about the "import" feature
- README.md: the Node version badge
- README.md: added a second example of using CDN
- package.json: some scripts

### Changed

- index.js: better coding style
- index.js: the documentation was entirely written in jsdoc
- tests/: a folder specifically intended for test files
- README.md: fully restructured

### Removed

- todo.md: purged from the repo

## [3.0.1] - 2024-11-30

### Added

- index.js: the code has been restructured so that it can run in both Node and the browser
- README.md: added an example of how to use kinoid in the browser

### Changed

- index.js: changed some variables name
- README.md: better style
- package.json: The minimum version of Node now is 14

## [2.0.1] - 2024-11-24

### Changed

- index.js: refactoring
- README.md: Rewritten some paragraphs

### Added

- package.json: new keyword

### Removed

- README.md: one badge less

## [2.0.0] - 2024-11-22

### Changed

- index.js: more elegance in the code
- index.js: the IDs can be sorted based on the generation date
- index.js: changed the length of the ID fields
- index.js: fully documented code
- index.js: starting time is 2024-11-01

### Added

- README.md: one more badge
- index.js: `decodeId()` decodes an id returning the generation date, singularity factor and process
  number
- README.md: a chapter about "features";
- README.md: changed the examples into the chapter "How to use"
- benchmark.js: a new set of tests
- index.js: error checking and handling

### Removed

- index.js: eliminated all mechanisms for generating random strings

## [1.1.1] - 2024-11-18

### Changed

- index.js: the `singularity` is resetted every time the `timeStr` changes
- tests.js: renaming

### Fixed

- index.js: better documentation
- package.json: typo
- README.md: better documentation

## [1.1.0] - 2024-11-17

The library is fully working as an NPM package

### Added

- CHANGELOG.md

## [1.0.0] - 2024-11-16

Library created and working
