type URITransformer = (text: string) => string

export function createAnchorPoint(pattern: RegExp, transform: URITransformer = text => text) {
  return (text: string) => {
    const match = pattern.exec(text);
    return match ? {
      index: match.index,
      length: match[0].length,
      text: match[0],
      url: transform(match[0]),
    } : null;
  };
}