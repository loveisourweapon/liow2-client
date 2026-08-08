# The Love is our Weapon Campaign

## Client / Front-end

Source code for the re-development of [loveisourweapon.com](https://loveisourweapon.com/)

### Checks

CI runs lint, typecheck, the unit tests and a Prettier format check on every pull request (see
`.github/workflows/ci.yml`).

Lint, typecheck and the unit tests run inside Docker. The app is pinned to Node 8 - node-sass
4.5.3 only ships bindings for that ABI - and `Dockerfile.ci` also brings its own browser for
karma, so the same commands work locally:

```
docker build -f Dockerfile.ci -t liow2-client-ci .
docker run --rm liow2-client-ci yarn lint
docker run --rm liow2-client-ci yarn typecheck
docker run --rm liow2-client-ci yarn test:ci
```

On an arm64 machine add `--platform linux/amd64` to each of those commands.

Formatting is checked with Prettier, which needs a modern Node and so isn't a devDependency.
Run it with a pinned version:

```
npx prettier@3.9.6 --write .
```

Templates are formatted with `trailingComma: none` because Angular 4's expression parser
rejects trailing commas inside bindings.
