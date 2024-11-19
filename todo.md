# TODO

## next

- [ ] Aggiornare i valori `maxLength`
- [ ] sistemare in `decodeId()` i limiti dei campi usando costanti collegate ai valori `maxLength`
- [ ] RENAMING
  - [ ] cancellare la parola `step` ovunque si trovi
  - [ ] la desinenza `Str` può essere sostituita da `Padded`
  - [ ] `idStr` dovrebbe far riferimento al fatto che è decimale, non più 36ale
- [ ] `index.js`: aggiungere la documentazione
- [ ] nel README indicare gli elementi costitutivi dell'id (data, step e processo)
- [ ] README
  - [ ] nel readme aggiornare gli esempi (newId())
  - [ ] nel readme aggiungere che
    - [ ] gli id sono ordinabili per estrazione
    - [ ] gli id sono decodificabili

> Snowflakes are 64 bits in binary. (Only 63 are used to fit in a signed integer.) The first 41 bits
> are a timestamp, representing milliseconds since the chosen epoch. The next 10 bits represent a
> machine ID, preventing clashes. Twelve more bits represent a per-machine sequence number, to allow
> creation of multiple snowflakes in the same millisecond. The final number is generally serialized
> in decimal.
>
> Snowflakes are sortable by time, because they are based on the time they were created.[2]
> Additionally, the time a snowflake was created can be calculated from the snowflake. This can be
> used to get snowflakes (and their associated objects) that were created before or after a
> particular date.

## done

- [x] Aggiungere zeri all'inizio di ogni campo per rendere certa la convertibilità in tempo,
      successione, ecc.
  - [x] `toString()` si comporta in modo strano con gli zeri all'inizio. Usare `parseInt()` come in
        questo esempio: `parseInt('0232').toString(36).padStart(3, 0)`
- [x] format the string with `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16)}`
- [x] Aggiungere Nodo e Macchina?
- [x] Aggiungere caratteri casuali per arrivare a 24 (?)
- [x] <https://stackoverflow.com/questions/55646698/base-36-to-bigint>
- [x] REFACTORING
  - [x] `pid` va inserito tra le proprietà globali
  - [x] serve una funzione che venga chiamata da `newId` e che setti **tutte** le proprietà, in modo
        da isolare questo processo
  - [x] creare una unica funzione che prende una stringa o un numero e restituisce una stringa
        0-padded
    - [x] a questo punto diventano utili le proprietà `singularityMaxLength`, `timeStampMaxLength` e
          `pidMaxLength`

## Releasing routine

1. Update the version number into `<package.json>.version`
2. Update CHANGELOG
3. push `main` to repo
4. create and push tag to repo

### releasing

1. Check package:

```bash
npm pack
```

1. Login:

```bash
npm login
```

1. Publish:

```bash
npm publish
```

### post releasing

- [ ] delete dead branches locally
- [ ] delete remote dead branches

## Note

### Commit types

- **feat**: new feature for the user, not a new feature for build script
- **fix**: bug fix for the user, not a fix to a build script
- **docs**: changes to the documentation
- **style**: formatting, missing semi colons, etc; no production code change
- **refactor**: refactoring production code, eg. renaming a variable
- **test**: adding missing tests, refactoring tests; no production code change
- **chore**: updating grunt tasks etc; no production code change
