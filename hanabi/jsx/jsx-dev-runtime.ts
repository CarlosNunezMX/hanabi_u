import type { HtmlEscapedString } from './util/html'
import { jsx } from './index'
import type { JSXNode } from './index'
export { Fragment } from './index'

export function jsxDEV(tag: string | Function, props: Record<string, unknown>): JSXNode {
  if (!props?.children) {
    return jsx(tag, props)
  }
  const children = props.children as string | HtmlEscapedString
  delete props['children']
  return Array.isArray(children) ? jsx(tag, props, ...children) : jsx(tag, props, children)
}
