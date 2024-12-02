# TODO

## next

## done

- [x] riorganizzare il folder
  - [x] aggiornare `.gitignore`?
- [x] README.md
  - [x] aggiungere un commento con il secondo CDN
  - [x] aggiungere al CDN l'identificatore della versione
- [x] index.js
  - [x] aggiungere la stringa 'unique ID generator' da qualche parte nel commento iniziale
  - [x] il commento iniziale va riscritto in [jsdoc](https://jsdoc.app/tags-file)
- [x] pubblicare sui servizi per il browser
  - [x] branch: **dev-cdn-publish**
  - [x] pubblicare su [unpkg](https://unpkg.com)
    - [x] `browser` e `unpkg`
      - <https://areknawo.com/whats-what-package-json-cheatsheet/#:~:text=g.%20window).-,unpkg,-Maybe%20it%E2%80%99s%20not>
      - <https://docs.npmjs.com/cli/v10/configuring-npm/package-json#browser>
      - <https://medium.com/@gaute.meek/how-to-publish-a-js-library-to-npm-and-cdn-9d0bf9b48e11>
    - [x] <https://kentcdodds.com/blog/unpkg-an-open-source-cdn-for-npm>
    - [x] Testare sul browser
  - [x] pubblicare su [jsdelivr](https://www.jsdelivr.com/)
  - [x] README
    - [x] aggiungere esempi di importazione con il browser
      - <https://www.npmjs.com/package/@redlotus/uniqid#:~:text=//%20%2D%3E%204n5pxq24kriob12ogd%2C%204n5pxq24ksiob12ogl-,Usage%20in%20Browser,-Take%20advantage%20of>
      - `kinoid().newId()`
      - `kinoid().decodeId()`
    - [x] aggiungere due righe sul readme per le differenze tra `Node` e browser
- [x] README.md: passare a gemini anche i paragraphi non ancora guardati
- [x] refactor: {index.js} `lastTimeStamp` needs to change to `prevTimeStamp`
- [x] README.md: paragrafo "Warning": rivederlo
- [x] index.js: il testo dell'errore è sempre uguale. Forse va in un apposita costante.
- [x] far partire il timer da novembre 2024
- [x] benchmark.md: è sempre Node che fa girare il benchmark?
- [x] index.js:
  - [x] controlli sulla dimensione raggiunta dalle stringhe, in modo da intercettare il maggior
        numero di errori anche se in modo generico <https://jsdoc.app/tags-throws>,
        <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error>.
  - [x] [?] dettagli jsdoc: <https://jsdoc.app/howto-commonjs-modules>
- [x] benchmark.js: portare tutte le misure a bigint
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
2. Update the version number into the comment of `<index.js>`
3. Update CHANGELOG
4. push `main` to repo
5. create and push tag to repo

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

- [ ] delete dead branches locally
- [ ] delete remote dead branches

## Notes

### Commit types

<https://gist.github.com/ThornDuke/b9cdad1065a617486ad0575426f53c36>
