# TODO

## next

- [ ] Aggiungere zeri all'inizio di ogni campo per rendere certa la convertibilità in tempo,
      successione, ecc.
  - [ ] `toString()` si comporta in modo strano con gli zeri all'inizio. Usare `parseInt()` come in
        questo esempio: `parseInt('0232').toString(36).padStart(3, 0)`
- [ ] format the string with `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16)}`
- [ ] Aggiungere Nodo e Macchina?
- [ ] nel README indicare gli elementi costitutivi dell'id (data, step e processo)
- [ ] nel readme aggiornare gli esempi (newId())
- [ ] nel readme aggiungere che
  - [ ] gli id sono ordinabili per estrazione
  - [ ] gli id sono decodificabili

## done

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
