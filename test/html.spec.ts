import rehypeParse from 'rehype-parse'
import { unified } from 'unified'

import { prettier } from 'unified-prettier'

test('it should just work', async () => {
  const file = await unified().use(rehypeParse).use(prettier, {
    parser: 'html',
  }).process(`<!DOCTYPE html><html>
      <head><title>Hello World!</title></head><body></body>
    </html>`)
  file.cwd = ''
  expect(file).toMatchInlineSnapshot(`
    VFile {
      "cwd": "",
      "data": {},
      "history": [],
      "messages": [
        [1:16: Insert \`⏎\`],
        [2:1-2:47: Replace \`······<head><title>Hello·World!</title></head>\` with \`··<head>⏎····<title>Hello·World!</title>⏎··</head>⏎··\`],
        [3:1-3:12: Replace \`····</html>\` with \`</html>⏎\`],
      ],
      "value": "<!DOCTYPE html>
    <html>
      <head>
        <title>Hello World!</title>
      </head>
      <body></body>
    </html>
    ",
    }
  `)
})
