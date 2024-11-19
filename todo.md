# TODO

## next

- [ ] cancellare la parola `step` ovunque si trovi
- [ ] nel README indicare gli elementi costitutivi dell'id (data, step e processo)
- [ ] nel readme aggiornare gli esempi (newId())
- [ ] nel readme aggiungere che
  - [ ] gli id sono ordinabili per estrazione
  - [ ] gli id sono decodificabili

## done

- [x] Aggiungere zeri all'inizio di ogni campo per rendere certa la convertibilità in tempo,
      successione, ecc.
  - [x] `toString()` si comporta in modo strano con gli zeri all'inizio. Usare `parseInt()` come in
        questo esempio: `parseInt('0232').toString(36).padStart(3, 0)`
- [x] format the string with `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16)}`
- [x] Aggiungere Nodo e Macchina?
- [x] Aggiungere caratteri casuali per arrivare a 24 (?)
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

<https://stackoverflow.com/questions/55646698/base-36-to-bigint>
