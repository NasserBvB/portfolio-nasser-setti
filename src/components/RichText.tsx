"use client";

import escapeHTML from "escape-html";
import { Highlight, themes, Prism } from "prism-react-renderer";
import React, { Fragment } from "react";
import { Text } from "slate";
// eslint-disable-next-line no-use-before-define
type Children = Leaf[];

type Leaf = {
  type: string;
  value?: {
    url: string;
    alt: string;
  };

  children: Children;
  url?: string;
  [key: string]: unknown;
};

const serialize = (children: Children): React.ReactNode[] =>
  children?.map((node, i) => {
    if (Text.isText(node)) {
      let text: any = node.text;

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.code) {
        text = (
          <Highlight
            key={i}
            prism={Prism}
            theme={themes.nightOwl}
            code={node.text || ""}
            language={node.type || "javascript"}
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
        );
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.underline) {
        text = (
          <span style={{ textDecoration: "underline" }} key={i}>
            {text}
          </span>
        );
      }

      if (node.strikethrough) {
        text = (
          <span style={{ textDecoration: "line-through" }} key={i}>
            {text}
          </span>
        );
      }

      if (node.text.endsWith(" code")) {
        return null;
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case "h1":
        return <h1 key={i}>{serialize(node.children)}</h1>;
      case "h2":
        return <h2 key={i}>{serialize(node.children)}</h2>;
      case "h3":
        return <h3 key={i}>{serialize(node.children)}</h3>;
      case "h4":
        return <h4 key={i}>{serialize(node.children)}</h4>;
      case "h5":
        return <h5 key={i}>{serialize(node.children)}</h5>;
      case "h6":
        return <h6 key={i}>{serialize(node.children)}</h6>;
      case "blockquote":
        return (
          <blockquote
            key={i}
            className="border-l-4 border-primary pl-4 italic my-4"
          >
            {serialize(node.children)}
          </blockquote>
        );

      case "ul":
        return <ul key={i}>{serialize(node.children)}</ul>;
      case "ol":
        return <ol key={i}>{serialize(node.children)}</ol>;
      case "li":
        return <li key={i}>{serialize(node.children)}</li>;
      case "link":
        return (
          <a href={escapeHTML(node.url)} key={i}>
            {serialize(node.children)}
          </a>
        );

      default:
        return <div key={i}>{serialize(node.children)}</div>;
    }
  });

const RichText: React.FC<{ className?: string; content: any }> = ({
  className,
  content,
}) => {
  if (!content) {
    return null;
  }

  return <div className={className}>{serialize(content)}</div>;
};

export default RichText;
