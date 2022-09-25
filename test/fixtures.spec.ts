import fs from 'node:fs/promises'
import path from 'node:path'

import { unified } from 'unified'

import { prettier } from 'unified-prettier'

test('it should just work', async () => {
  const fixturesPath = path.resolve('test/fixtures')
  const files = await fs.readdir(fixturesPath)
  for (const file of files) {
    const filePath = path.resolve(fixturesPath, file)
    const vFile = await unified()
      .use(prettier)
      .process({
        path: filePath,
        value: await fs.readFile(filePath),
      })
    expect(vFile.value).toMatchSnapshot(file)
  }
})
