import './style.css'
import { FaAnchor, FaGithub } from 'react-icons/fa'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import AnchorPointPlugin from './AnchorPoint/AnchorPointPlugin.tsx'
import { createAnchorPoint } from './AnchorPoint/util.ts'
import { DEFAULT_URL_REGEX } from './AnchorPoint/const.ts'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter'
import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('bash', bash);


const ANCHOR_POINTS = [
  createAnchorPoint(DEFAULT_URL_REGEX, text => {
    return text.startsWith('http') ? text : `https://${text}`
  }),
]

function App() {
  const initialConfig = {
    namespace: 'AnchorPoint',
    nodes: [
      AutoLinkNode,
      LinkNode,
    ],
    onError: (error: Error) => {
      throw error
    },
  }

  return (
    <>
      <div id="container">
        <section>
          <h1><FaAnchor /> Lexical AnchorPoint</h1>
          <p>This plugin aims to provide a drop-in replacement for the Lexical AutoLink plugin included with the Lexical
            React package. This plugin passes the most critical e2e tests of the original AutoLink plugin in only ~100
            lines of easy to comprehend code.</p>

          <p>By leveraging rigorous regex testing, combined with a simple aggregate-matching node transformer, it easily
            identifies links within TextNodes and converts them to AutoLink nodes. It solves the major shortcoming of
            the AutoLink plugin’s inability to match some obvious URLs. Parts of the plugin are inspired by the original
            plugin, but at it’s core, it chooses a different approach.</p>

          <p><i>Note: This project is experimental and likely has a variety of issues. It meets the use case of a simple
            Lexical implementation being developed by the author. You are encouraged to test this plugin thoroughly and
            report any issues in the GitHub repository. See additional contributing notes below.</i></p>
        </section>

        <section>
          <h2>Try it and see</h2>
          <LexicalComposer initialConfig={initialConfig}>
            <div id="editorContainer">
              <AnchorPointPlugin points={ANCHOR_POINTS} />
              <RichTextPlugin
                contentEditable={
                  <div id="editor">
                    <ContentEditable id="contentEditable" />
                  </div>
                }
                placeholder={
                  <div id="editorPlaceholder">Type a URL or embed them in some text to see AnchorPoint in
                    action&hellip;</div>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
            </div>
          </LexicalComposer>
          <p className="flex-center flex-col-gap">
            <FaGithub />
            Found a bug? Please
            <a href="https://github.com/redstar504/lexical-anchorpoint/issues/new">open an issue</a>
            on Github.
          </p>
        </section>

        <section>
          <h2>Typical Installation</h2>
          <p>Run the following command in your Lexical React project’s root:</p>
          <SyntaxHighlighter language="bash" style={agate} customStyle={{padding: '1em 1.5em'}}>
            {`npm i lexical-anchorpoint`}
          </SyntaxHighlighter>
          <p>Create the matchers, which in this plugin are referred to as anchor points, that specify the URL
            patterns:</p>
          <SyntaxHighlighter language="react" style={agate} customStyle={{padding: '1em 1.5em'}}>
{`const ANCHOR_POINTS = [
  createAnchorPoint(DEFAULT_URL_REGEX, text => {
  return text.startsWith('http') ? text : \`https://\${text}\`})
]`}
          </SyntaxHighlighter>

          <p>Nest the plugin as a child of your Lexical Composer component:</p>
          <SyntaxHighlighter language="react" style={agate} customStyle={{padding: '1em 1.5em'}}>
            {`<AnchorPointPlugin points={ANCHOR_POINTS} />`}
          </SyntaxHighlighter>
        </section>

        <section>
          <h2>Project Details</h2>
          <p>By utilizing a comprehensive Regex pattern, combined with a simple aggregate text-matcher, this
            plugin is able to pass the most critical e2e tests of the original AutoLink plugin, while resolving some of
            the most commonly reported issues.</p>

          <p>There were some tests that were deemed unimportant for the purposes of an early release of this
            implementation, and therefore were not included in this project’s e2e tests:</p>

          <ul>
            <li>
              <IoIosArrowDroprightCircle />
              We don’t forcibly “destruct” links if additional characters are placed before or after the original link
              node. For instance, if you type “http://example.com”, and subsequently append a symbol such as ! in front
              of the URL, we do not invalidate the link node. It simply retains the plain-text ! at the beginning.
            </li>
            <li>
              <IoIosArrowDroprightCircle />
              The tests for the inclusion of styling in or around the AutoLink were not thoroughly considered. The
              author intends to spend more time focusing on style applications as those features are necessary, either
              by personal use or community requests.
            </li>
          </ul>

          <p>This project is in early infancy. It only meets the use case for a project being developed by the author.
            As such, there are likely many edge cases, and bugs that have not been identified. You are encouraged to
            raise an issue to report any problems, or to open a pull request to provide any missing functionality.</p>
        </section>

        <section>
          <h2>Additional Information</h2>
          <p>Lexical's React package ships with a plugin called AutoLink. The goal of AutoLink is to provide a node
            transformer that transforms any link like text typed or pasted into the editor into an AutoLink node.</p>

          <p>Several issues have been reported due to the AutoLink plugin’s inability to match some simple URLs. A common
            example is when typing a URL with a subdomain, such as http://www.google.com in the editor, it does not
            include the `.com` portion as being part of the link.</p>

          <p>The author of this plugin originally set out to contribute a resolution to the issues identified with the
            AutoLink plugin. After reviewing the variety of PRs that have been raised to solve the core issues, and
            their corresponding nuances, he determined that it would be easier to rewrite a simple implementation, since
            the same functionality could be achieved with a lot less code, while meeting the use case of his project.</p>

          <p>Perhaps in the future, if this plugin is able to exceed the standards of the original AutoLink plugin, in a
            reliably tested fashion, it can be integrated into the core Lexical package.</p>
        </section>

        <section>
          <h2>Contributing</h2>
          <p>This project is in early infancy. It only meets the use case for a project being developed by the
            author.</p>
          <p>As such, there are likely many edge cases, and bugs that have not been identified. You are encouraged to
            raise
            an issue or a PR, to report any problems, or provide any missing functionality.</p>

          <a href="https://github.com/redstar504/lexical-anchorpoint" target="_blank" id="contribLink">
            <FaGithub />
            View the project on Github
          </a>
        </section>
      </div>
    </>
  )
}

export default App
