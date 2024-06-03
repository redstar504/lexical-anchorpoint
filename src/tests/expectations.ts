/**
 * For matching a URL within text, include a string containing a URL as inputtedText, and the URL that should be matched
 * in the matchedUrl property.
 *
 * For matching a URL literal, include only the URL in the inputtedText property, and `true` in the matchedUrl property.
 *
 * For negating a URL match, include a string containing an invalid URL, or just the invalid URL itself in the inputtedText
 * property, and pass `false` for the matchedUrl property.
 */
export const regexExpectations = [
  { inputtedText: 'http://foo.com', matchedUrl: true },
  { inputtedText: 'Hey guys, check out this URL: http://foo.com', matchedUrl: 'http://foo.com' },
  { inputtedText: 'https://barbaz.com', matchedUrl: true },
  { inputtedText: 'One time I went to https://barbaz.com, and it blew my mind', matchedUrl: 'https://barbaz.com' },
  { inputtedText: 'https://foo.bar.baz.something.ca', matchedUrl: true },
  { inputtedText: 'http://example.com/path/to/resource', matchedUrl: true },
  {
    inputtedText: 'Visit this site: http://example.com/path?name=value&age=30',
    matchedUrl: 'http://example.com/path?name=value&age=30',
  },
  {
    inputtedText: 'Check out https://example.com#section for more details',
    matchedUrl: 'https://example.com#section',
  },
  { inputtedText: 'http://sub.example.com', matchedUrl: true },
  { inputtedText: 'http://sub.example.com:8080/path', matchedUrl: true },
  { inputtedText: 'URL with hyphens: http://example-domain.com', matchedUrl: 'http://example-domain.com' },
  {
    inputtedText: 'Another URL: https://example.com/with-dashes-and_numbers123',
    matchedUrl: 'https://example.com/with-dashes-and_numbers123',
  },
  {
    inputtedText: 'A URL ending with punctuation: https://example.com/path.',
    matchedUrl: 'https://example.com/path',
  },
  { inputtedText: 'URL with port: http://example.com:8080', matchedUrl: 'http://example.com:8080' },
  {
    inputtedText: 'URL with query string: https://example.com/search?q=test',
    matchedUrl: 'https://example.com/search?q=test',
  },
  { inputtedText: 'URL with fragment: https://example.com/about#team', matchedUrl: 'https://example.com/about#team' },
  { inputtedText: 'URL with user info: http://user:pass@example.com', matchedUrl: 'http://user:pass@example.com' },
  { inputtedText: 'URL with IP address: http://192.168.0.1', matchedUrl: 'http://192.168.0.1' },
  {
    inputtedText: 'URL with subdirectory: http://example.com/dir/subdir/',
    matchedUrl: 'http://example.com/dir/subdir/',
  },
  {
    inputtedText: 'URL with encoded characters: http://example.com/%20space%20',
    matchedUrl: 'http://example.com/%20space%20',
  },
  // { inputtedText: 'URL with comma inside: http://example.com/path,with,commas', matchedUrl: 'http://example.com/path,with,commas' },
  { inputtedText: 'URL with mixed case: http://Example.Com/Path', matchedUrl: 'http://Example.Com/Path' },
  { inputtedText: 'URL with long TLD: http://example.comprehensive', matchedUrl: 'http://example.comprehensive' },
  { inputtedText: 'URL with unusual TLD: http://example.museum', matchedUrl: 'http://example.museum' },
  {
    inputtedText: 'URL with multiple subdomains: http://a.b.c.d.example.com',
    matchedUrl: 'http://a.b.c.d.example.com',
  },
  { inputtedText: 'URL with underscore: http://example_domain.com', matchedUrl: 'http://example_domain.com' },
  {
    inputtedText: 'URL with all valid characters: http://example.com/path/to/resource?name=value&age=30#section',
    matchedUrl: 'http://example.com/path/to/resource?name=value&age=30#section',
  },
  { inputtedText: 'URL with minimal parts: http://e.co', matchedUrl: 'http://e.co' },
  { inputtedText: 'Secure URL with port: https://example.com:443/path', matchedUrl: 'https://example.com:443/path' },
  {
    inputtedText: 'URL with query and fragment: http://example.com/path?query=1#frag',
    matchedUrl: 'http://example.com/path?query=1#frag',
  },
  { inputtedText: 'FTP URL: ftp://example.com/resource', matchedUrl: 'ftp://example.com/resource' },
  { inputtedText: 'URL with internationalized domain: http://xn--fsq.com', matchedUrl: 'http://xn--fsq.com' },
  {
    inputtedText: 'URL with mixed protocols: http://example.com and https://secure.example.com',
    matchedUrl: 'http://example.com',
  },
  {
    inputtedText: 'Embedded URL: Text with a URL http://example.com embedded in it.',
    matchedUrl: 'http://example.com',
  },
  { inputtedText: 'URL with trailing hyphen: http://example-.com', matchedUrl: 'http://example-.com' },
  { inputtedText: 'URL with trailing underscore: http://example_.com', matchedUrl: 'http://example_.com' },
  // Additional edge cases
  { inputtedText: 'URL with trailing slash: http://example.com/', matchedUrl: 'http://example.com/' },
  { inputtedText: 'URL with file extension: http://example.com/file.txt', matchedUrl: 'http://example.com/file.txt' },
  {
    inputtedText: 'URL with parenthesis: http://example.com/path(with)parens',
    matchedUrl: 'http://example.com/path',
  },
  // { inputtedText: 'URL with exclamation mark: http://example.com/path!', matchedUrl: 'http://example.com/path!' },
  // { inputtedText: 'URL with single quote: http://example.com/path\'s', matchedUrl: 'http://example.com/path\'s' }
  { inputtedText: 'http://exa!mple.com', matchedUrl: false }, // Exclamation mark in domain
  { inputtedText: 'http://exa#mple.com', matchedUrl: false }, // Hash symbol in domain
  { inputtedText: 'http://exa$mple.com', matchedUrl: false }, // Dollar sign in domain
  { inputtedText: 'http://exa%mple.com', matchedUrl: false }, // Percent sign in domain
  { inputtedText: 'http://exa^mple.com', matchedUrl: false }, // Caret symbol in domain
  { inputtedText: 'http://exa&mple.com', matchedUrl: false }, // Ampersand in domain
  { inputtedText: 'http://exa*mple.com', matchedUrl: false }, // Asterisk in domain
  { inputtedText: 'http://exa(mple.com', matchedUrl: false }, // Open parenthesis in domain
  { inputtedText: 'http://exa)mple.com', matchedUrl: false }, // Close parenthesis in domain
  { inputtedText: 'http://exa+mple.com', matchedUrl: false }, // Plus sign in domain
  { inputtedText: 'http://example.com.', matchedUrl: 'http://example.com' }, // Plus sign in domain
  { inputtedText: 'http://example.com-', matchedUrl: 'http://example.com' }, // Plus sign in domain
  { inputtedText: ',http://example.com-', matchedUrl: 'http://example.com' }, // Plus sign in domain

  // Spaces in the URL
  { inputtedText: 'http://example .com', matchedUrl: false }, // Space in domain
  { inputtedText: 'http:// example.com', matchedUrl: false }, // Space before domain
  { inputtedText: 'http://example.com /path', matchedUrl: 'http://example.com' }, // Space in path

  // Invalid TLDs
  // 'http://example.c', // Single character TLD
  // 'http://example.123', // Numeric TLD

  // No TLD
  // 'http://example', // Domain without TLD

  // Only a fragment
  { inputtedText: '#fragment', matchedUrl: false }, // Only a fragment without URL

  // Localhost without protocol
  { inputtedText: 'localhost', matchedUrl: false }, // Only localhost without protocol
  { inputtedText: 'localhost:8080', matchedUrl: false }, // Localhost with port but no protocol

  // Incomplete URL
  { inputtedText: 'http://example.', matchedUrl: false }, // Trailing dot with no TLD
  { inputtedText: 'http://.com', matchedUrl: false }, // Leading dot without domain

  // Email addresses (commonly mistaken for URLs)
  { inputtedText: 'user@example.com', matchedUrl: false }, // Email address

  // Relative paths
  { inputtedText: '/path/to/resource', matchedUrl: false }, // Relative path without domain
  { inputtedText: '../path/to/resource', matchedUrl: false }, // Relative path with parent directory reference
  { inputtedText: './path/to/resource', matchedUrl: false }, // Relative path with current directory reference

  { inputtedText: 'htp://example.com', matchedUrl: false },
  { inputtedText: 'http:///path', matchedUrl: false },
  { inputtedText: 'www.example.com', matchedUrl: 'www.example.com' },
  { inputtedText: 'www.example', matchedUrl: false },
  { inputtedText: 'example.com', matchedUrl: false },
  { inputtedText: 'http://www.google.com....', matchedUrl: 'http://www.google.com'}
]