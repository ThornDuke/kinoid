# TODO

## next

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
