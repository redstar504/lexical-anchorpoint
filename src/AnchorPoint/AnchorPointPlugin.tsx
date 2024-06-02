/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { $createAutoLinkNode, $isAutoLinkNode, $isLinkNode, AutoLinkNode } from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createTextNode, $isTextNode, LexicalEditor, TextNode } from 'lexical'
import { useEffect } from 'react'

type Anchor = {
  index: number
  length: number
  text: string
  url: string
}

export type AnchorPoint = (text: string) => Anchor | null

function findNextAnchor(text: string, points: AnchorPoint[]): Anchor | null {
  for (let i = 0; i < points.length; i++) {
    const anchor = points[i](text)
    if (anchor) {
      return anchor
    }
  }

  return null
}

function $handleAppendToAnchor(prevSibling: AutoLinkNode, textNode: TextNode, points: AnchorPoint[]) {
  const prevText = prevSibling.getTextContent()
  const nodeText = textNode.getTextContent()
  const combinedText = prevText + nodeText
  const rematch = findNextAnchor(combinedText, points)

  if (!rematch) {
    return
  }

  if (prevSibling.getTextContent().includes(rematch.text)) {
    return
  }

  const prevLinkTextNode = prevSibling.getFirstChild()

  if (!$isTextNode(prevLinkTextNode) || !prevLinkTextNode.isSimpleText()) {
    return
  }

  // append to the autolink node, and subtract from the text node for each additional match
  const numCharsToShift = rematch.length - prevText.length
  textNode.setTextContent(nodeText.substring(numCharsToShift))
  prevLinkTextNode.setTextContent(rematch.text)
  prevSibling.setURL(rematch.url)
}

function $matchAndCreateAnchor(textNode: TextNode, points: AnchorPoint[]) {
  const nodeText = textNode.getTextContent()
  const anchor = findNextAnchor(nodeText, points)
  let currentNode = textNode

  if (!anchor) {
    return
  }

  const matchOffset = anchor.index
  const matchLength = anchor.length
  let matchedNode

  if (matchOffset === 0) {
    [matchedNode, currentNode] = currentNode.splitText(matchLength)
  } else {
    [, matchedNode, currentNode] = currentNode.splitText(matchOffset, matchOffset + matchLength)
  }

  const linkNode = $createAutoLinkNode(anchor.url)
  linkNode.append($createTextNode(anchor.text))
  matchedNode.replace(linkNode)
}

function useAnchorPoint(editor: LexicalEditor, points: AnchorPoint[]): void {
  useEffect(() => {
    return editor.registerNodeTransform(TextNode, (textNode: TextNode) => {
      const parent = textNode.getParentOrThrow()
      const prevSibling = textNode.getPreviousSibling()

      if (!textNode.isSimpleText() || $isAutoLinkNode(parent)) {
        return
      }

      if (prevSibling && $isAutoLinkNode(prevSibling)) {
        $handleAppendToAnchor(prevSibling, textNode, points)
      }

      if (!$isLinkNode(parent)) {
        $matchAndCreateAnchor(textNode, points)
      }
    })
  }, [editor, points])
}

export default function AnchorPointPlugin({ points }: { points: AnchorPoint[] }) {
  const [editor] = useLexicalComposerContext()
  useAnchorPoint(editor, points)
  return null
}
