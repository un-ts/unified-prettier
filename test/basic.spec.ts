import { unified } from 'unified'

import { prettier } from 'unified-prettier'

it('should throw for plain text and no parser provided', () => {
  return expect(() =>
    unified().use(prettier).process('Hello, world!'),
  ).rejects.toMatchInlineSnapshot(
    '[TypeError: [unified-prettier]: `parser` option is required when `file.path` is not provided]',
  )
})
