import prettier from 'prettier'

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