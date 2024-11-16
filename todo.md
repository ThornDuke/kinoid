# TODO

- [x] Creare un file di test esterno
- [x] Aggiungere l'identificativo del processo

```javascript
var pid = typeof process !== "undefined" && process.pid ? process.pid.toString(36) : "";
```

- [ ] Rivedere il naming
  - [x] nomi delle variabili
  - [ ] nome della funzione
  - [ ] nome del package
    - [ ] Controllare i nomi su NPM
- [ ] Creare l'ambiente NPM
  - [ ] Da usare con `import` e con `require`. Vedi
    - <https://www.npmjs.com/package/uniqid>
    - <https://dev.to/gulshanaggarwal/npm-packages-to-generate-unique-ids-for-your-next-project-1p3b>
- [ ] Scrivere il `README`
- [ ] Pubblicare su NPM
- [ ] Notificare su Mastodon
