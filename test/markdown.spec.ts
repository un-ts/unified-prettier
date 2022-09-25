import remarkParse from 'remark-parse'
import { unified } from 'unified'

import { prettier } from 'unified-prettier'

it('should just work', async () => {
  const file = await unified().use(remarkParse).use(prettier, {
    parser: 'markdown',
  }).process(`import {Demo} from 'demo';
  export {Demo}

  # Header
  1. List item 1
  2. List item 2
  1.  List item 3`)
  file.cwd = ''
  expect(file).toMatchInlineSnapshot(`
    VFile {
      "cwd": "",
      "data": {},
      "history": [],
      "messages": [
        [2:1-2:3: Delete \`··\`],
        [4:1-4:3: Delete \`··\`],
        [5:1-5:3: Replace \`··\` with \`⏎\`],
        [6:1-6:3: Delete \`··\`],
        [7:1-7:18: Replace \`··1.··List·item·3\` with \`3.·List·item·3⏎\`],
      ],
      "value": "import {Demo} from 'demo';
    export {Demo}

    # Header

    1. List item 1
    2. List item 2
    3. List item 3
    ",
    }
  `)
})
