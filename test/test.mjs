import { fileURLToPath } from 'node:url'
import markdownit from 'markdown-it'
import generate from 'markdown-it-testgen'

import inlineEach from '../index.mjs'

describe('markdown-it-for-inline', () => {
  let md

  md = markdownit()
    .use(inlineEach, 'text_replace', 'text', (tokens, idx) => {
      tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar')
    })

  generate(fileURLToPath(new URL('fixtures/text.txt', import.meta.url)), { header: true }, md)

  md = markdownit({ linkify: true })
    .use(inlineEach, 'link_replace', 'link_open', (tokens, idx) => {
      if ((tokens[idx + 2].type !== 'link_close') || (tokens[idx + 1].type !== 'text')) {
        return
      }
      tokens[idx + 1].content = tokens[idx + 1].content
        .replace(/google/g, 'shmugle')
        .replace(/^https?:\/\//, '')
        .replace(/^www./, '')
    })

  generate(fileURLToPath(new URL('fixtures/link.txt', import.meta.url)), { header: true }, md)
})
