import prettier from 'prettier'

export const E2E_PORT = process.env.E2E_PORT || 5172

export async function prettifyHTML(string: string) {
  const transformedHTML = await prettier
    .format(string, {
      attributeGroups: ['$DEFAULT', '^data-'],
      attributeSort: 'ASC',
      bracketSameLine: true,
      htmlWhitespaceSensitivity: 'ignore',
      parser: 'html',
    })

  return transformedHTML.trim()
}