# TODO

## next

## done

- [x] RENAMING
  - [x] cancellare la parola ~~step~~ _ovunque_ si trovi
    - [x] rivedere anche il README
  - [x] la desinenza `Str` può essere sostituita da `Padded`
  - [x] `idStr` dovrebbe far riferimento al fatto che è decimale, non più 36ale
- [x] README
  - [x] rivedere il paragrafo "Features", che adesso è orrendo
  - [x] Eliminare il paragrafo "Requirements" ?
  - [x] aggiungere agli esempi un intero oggetto proveniente da `decodeId()`
- [x] `index.js`: aggiungere la documentazione
- [x] nel README indicare gli elementi costitutivi dell'id (data, singularity e processo)
- [x] README
  - [x] nel readme aggiornare gli esempi (newId())
  - [x] nel readme aggiungere che
    - [x] gli id sono ordinabili per estrazione
    - [x] gli id sono decodificabili
- [x] Aggiornare i valori `maxLength`
- [x] sistemare in `decodeId()` i limiti dei campi usando costanti collegate ai valori `maxLength`
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

2. Login:

```bash
npm login
```

3. Publish:

```bash
npm publish
```

### post releasing

- [ ] delete dead branches locally
- [ ] delete remote dead branches

## Notes

### Commit types

- **feat**: new feature for the user, not a new feature for build script
- **fix**: bug fix for the user, not a fix to a build script
- **docs**: changes to the documentation
- **style**: formatting, missing semi colons, etc; no production code change
- **refactor**: refactoring production code, eg. renaming a variable
- **test**: adding missing tests, refactoring tests; no production code change
- **chore**: updating grunt tasks etc; no production code change
