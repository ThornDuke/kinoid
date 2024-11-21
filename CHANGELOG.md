# Change Log

<!--
## [Unreleased] | [major.minor.patch] - yyyy-mm-dd
### Added | Fixed | Changed | Removed | Deprecated | Security
- filename {section}: description
-->

## [Unreleased]

### Changed

- index.js: more elegance in the code
- index.js: the IDs can be sorted based on the generation date
- index.js: changed the length of the ID fields
- index.js: fully documented code

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
