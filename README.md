# Quasar Frontend (quasar)

Quasar Frontend description

## Setup config files and environment variables

Because of library issue, filenames which are started with `.` such as `.env.example` are not bundled into installer.
As a quick fix, those "dotfiles" are renamed by

- omitting the first dot
- appending `.example`

In that case, you need to rename those files back into original name by doing

```bash
rename env.example .env.example
copy .env.example .env
rename editorconfig.example .editorconfig
rename eslintignore.example .eslintignore
rename eslintrc.js.example .eslintrc.js
rename gitignore.example .gitignore
rename postcssrc.js.example .postcssrc.js
rename prettierrc.js.example .prettierrc.js
rename jsconfig.json.example jsconfig.json
```

## Prepare .env

Create `.env` file. You could see `.env.example` as referensi.

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
npm run lint
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
