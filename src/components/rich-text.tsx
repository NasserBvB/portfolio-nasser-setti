"use client";

import escapeHTML from "escape-html";
import { Highlight, themes, Prism } from "prism-react-renderer";
import React, { Fragment } from "react";
import { Text } from "slate";

type Children = Leaf[];

type Leaf = {
  [key: string]: unknown
  children: Children
  type: string
  url?: string
  fields?: {
    [key: string]: any
  }
  value?: {
    alt: string
    url: string
  }
}

const serialize = (children: Children): React.ReactNode[] =>
  children?.map((node, i) => {
    if (Text.isText(node)) {
      let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />

      if (node.bold) {
        text = <strong key={i}>{text}</strong>
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>
      }

      if (node.underline) {
        text = (
          <span key={i} style={{ textDecoration: 'underline' }}>
            {text}
          </span>
        )
      }

      if (node.strikethrough) {
        text = (
          <span key={i} style={{ textDecoration: 'line-through' }}>
            {text}
          </span>
        )
      }

      return <Fragment key={i}>{text}</Fragment>
    }

    if (!node) {
      return null
    }

    switch (node.type) {
      case 'blockquote':
        return <blockquote key={i}>{serialize(node.children)}</blockquote>
      case 'heading':
        switch (node.tag) {
          case 'h1':
            return <h1 key={i}>{serialize(node.children)}</h1>
          case 'h2':
            return <h2 key={i}>{serialize(node.children)}</h2>
          case 'h3':
            return <h3 key={i}>{serialize(node.children)}</h3>
          case 'h4':
            return <h4 key={i}>{serialize(node.children)}</h4>
          case 'h5':
            return <h5 key={i}>{serialize(node.children)}</h5>
          case 'h6':
            return <h6 key={i}>{serialize(node.children)}</h6>
        }
      case "block":
        switch (node.fields?.blockType) {
          case "Code":
            return <Highlight
              key={i}
              prism={Prism}
              theme={themes.nightOwl}
              code={node?.fields?.code || ""}
              language={node.fields?.language || "javascript"}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} p-4 rounded-lg overflow-auto`}
                  style={style}
                >
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })} key={i}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} key={key} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          default:
            return <div key={i}>{serialize(node.children)}</div>
        }

      case 'listitem':
        return <li key={i}>{serialize(node.children)}</li>
      case 'link':
        return (
          <a href={escapeHTML(node?.fields?.url)} target={
            node?.fields?.newTab ? '_blank' : '_self'
          } key={i}>
            {serialize(node.children)}
          </a>
        )
      case 'ol':
        return <ol key={i}>{serialize(node.children)}</ol>
      case 'list':
        return <ul key={i}>{serialize(node.children)}</ul>

      default:
        return <div key={i}>{serialize(node.children)}</div>
    }
  })

const RichText: React.FC<{ className?: string; content: any }> = ({
  content,
}) => {
  if (!content) {
    return null;
  }

  return <div className={`editor-content container`}>{serialize(content)}</div>;
};

export default RichText;
