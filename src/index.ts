import { type Options, format, getFileInfo, resolveConfig } from 'prettier'
import { generateDifferences, showInvisibles } from 'prettier-linter-helpers'
import { type Plugin } from 'unified'
import { type VFile } from 'vfile'
import { location } from 'vfile-location'

export interface UnifiedPrettierOptions extends Options {
  parser?: 'html' | 'markdown' | 'mdx'
}

const getPrettierOptions = (
  { parser, ...options }: UnifiedPrettierOptions,
  { path }: VFile,
): Options | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!parser && path == null) {
    throw new TypeError(
      '[unified-prettier]: `parser` option is required when `file.path` is not provided',
    )
  }

  const fileInfo = path
    ? getFileInfo.sync(path, {
        resolveConfig: true,
      })
    : null

  return {
    ...(path && resolveConfig.sync(path, { editorconfig: true })),
    parser: fileInfo?.inferredParser ?? parser,
    ...options,
  }
}

export const prettier: Plugin<[UnifiedPrettierOptions?]> = function (
  options = {},
) {
  // parser is not required for this plugin, so if no `Parser` provided, we provide a fake one
  if (!this.Parser) {
    this.Parser = () => ({ type: 'root' })
  }

  this.Compiler = (_tree, file) => {
    file.value = format(String(file.value), getPrettierOptions(options, file))
  }

  return (_ast, file) => {
    const original = String(file)
    const formatted = format(original, getPrettierOptions(options, file))

    if (original === formatted) {
      return
    }

    const differences = generateDifferences(original, formatted)
    const { toPoint } = location(file)

    for (const {
      deleteText = '',
      insertText = '',
      offset,
      operation,
    } of differences) {
      const position = {
        start: toPoint(offset),
        end: toPoint(offset + deleteText.length),
      }

      const toDelete = `\`${showInvisibles(deleteText)}\``
      const toInsert = `\`${showInvisibles(insertText)}\``

      const message =
        operation === generateDifferences.DELETE
          ? file.message(`Delete ${toDelete}`, position, 'prettier:delete')
          : operation === generateDifferences.REPLACE
          ? file.message(
              `Replace ${toDelete} with ${toInsert}`,
              position,
              'prettier:replace',
            )
          : file.message(
              `Insert ${toInsert}`,
              position.start,
              'prettier:insert',
            )

      message.url = 'https://github.com/un-ts/unified-prettier'
      message.expected = [insertText]
    }
  }
}

export default prettier
