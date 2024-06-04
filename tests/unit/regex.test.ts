import { expect, test } from 'vitest'
import { regexExpectations } from './expectations'
import { DEFAULT_URL_REGEX } from '../../src/AnchorPoint'

test('URL matching regex matches input text according to expectations ', () => {
  regexExpectations.forEach(expectation => {
    const match = expectation.inputtedText.match(DEFAULT_URL_REGEX)
    if (expectation.matchedUrl === false) {
      try {
        expect(match).toBe(null)
      } catch (e) {
        throw new Error(`Did not expect ${expectation.inputtedText} to match a URL. (matched: ${match![0]})`);
      }
      return
    }

    try {
      expect(match).not.toBe(null)
      expect(match![0]).toBe(expectation.matchedUrl === true ? expectation.inputtedText : expectation.matchedUrl)
    } catch (e) {
      throw new Error(`Expectation failed on '${expectation.inputtedText}', matched: '${match?.[0] ?? null}'`);
    }
  })
})