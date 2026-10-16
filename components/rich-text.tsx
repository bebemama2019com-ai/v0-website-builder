import { Fragment, type ReactNode } from "react"

// Renders admin-edited text with a small, safe set of formatting:
//   **bold**   *italic*   ***bold italic***   and line breaks.
// Text is never inserted as HTML, so nothing an admin types can run as code.

// A marker must hug the text (*word*, not "5 * 3"), like Markdown.
// (No lookbehind: older Safari versions cannot parse it.)
const TOKEN = /(\*\*\*(?!\s)[^*\n]*?[^\s*]\*\*\*|\*\*(?!\s)[^*\n]*?[^\s*]\*\*|\*(?!\s)[^*\n]*?[^\s*]\*)/g

function renderLine(line: string, lineKey: number): ReactNode[] {
  return line.split(TOKEN).map((part, i) => {
    const key = `${lineKey}-${i}`
    if (part.startsWith("***") && part.endsWith("***") && part.length > 6) {
      return (
        <strong key={key}>
          <em>{part.slice(3, -3)}</em>
        </strong>
      )
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>
    }
    return <Fragment key={key}>{part}</Fragment>
  })
}

export function RichText({ text }: { text: string }) {
  const lines = text.split(/\r?\n/)
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {renderLine(line, i)}
        </Fragment>
      ))}
    </>
  )
}
