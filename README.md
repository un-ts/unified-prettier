# unified-prettier

[![GitHub Actions](https://github.com/un-ts/unified-prettier/workflows/CI/badge.svg)](https://github.com/un-ts/unified-prettier/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/github/un-ts/unified-prettier.svg)](https://codecov.io/gh/un-ts/unified-prettier)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/un-ts/unified-prettier.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/un-ts/unified-prettier/context:javascript)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fun-ts%2Funified-prettier%2Fmain%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![npm](https://img.shields.io/npm/v/unified-prettier.svg)](https://www.npmjs.com/package/unified-prettier)
[![GitHub Release](https://img.shields.io/github/release/un-ts/unified-prettier)](https://github.com/un-ts/unified-prettier/releases)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-176de3.svg)](https://github.com/changesets/changesets)

A `prettier` serializer/stringifier for `unified` ecosystem (rehype/remark/mdx)

## TOC <!-- omit in toc -->

- [Usage](#usage)
  - [Install](#install)
  - [CLI](#cli)
  - [API](#api)
- [Acknowledgements](#acknowledgements)
- [Sponsors](#sponsors)
- [Backers](#backers)
- [Changelog](#changelog)
- [License](#license)

## Usage

### Install

```sh
# pnpm
pnpm add unified-prettier

# yarn
yarn add unified-prettier

# npm
npm i unified-prettier
```

### CLI

```sh
remark --use unified-prettier .
```

The above command may yield:

```log
README.md
  18:30-19:1  warning  Replace `⏎` with `·`  replace  prettier
        38:1  warning  Insert `⏎`            insert   prettier
  40:32-41:1  warning  Delete `⏎`            delete   prettier
```

This can also be spcified in a `.remarkrc` file:

```jsonc
{
  "plugins": ["unified-prettier"]
}
```

### API

This plugin can also be used with programmatically:

```js
import { unified } from 'unified'
import { prettier } from 'unified-prettier'
import { readSync } from 'to-vfile'

unified()
  .use(prettier, {
    parser: 'markdown', // or `html`, or `mdx`,
    // other `prettier` options
  })
  .process('# Hello World')
  .then(({ messages, value }) => {
    // Formatted content
    console.log(value)

    // Prettier formatting violations
    console.dir(messages)
  })

// or
unified()
  .use(prettier, {
    // no `parser` required if you're using correct `VFile#path`
    // `prettier` options except parser
  })
  .process(readSync('README.md'))
  .then(({ messages, value }) => {
    // Formatted content
    console.log(value)

    // Prettier formatting violations
    console.dir(messages)
  })
```

## Acknowledgements

[remark-prettier][]

## Sponsors

| 1stG                                                                                                                               | RxTS                                                                                                                               | UnTS                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/organizations.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/organizations.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/organizations.svg)](https://opencollective.com/unts) |

## Backers

[![Backers](https://raw.githubusercontent.com/1stG/static/master/sponsors.svg)](https://github.com/sponsors/JounQin)

| 1stG                                                                                                                             | RxTS                                                                                                                             | UnTS                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/individuals.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/individuals.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/individuals.svg)](https://opencollective.com/unts) |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
[remark-prettier]: https://github.com/remcohaszing/remark-prettier
