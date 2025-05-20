"use client";

import escapeHTML from "escape-html";
import { Highlight, themes, Prism } from "prism-react-renderer";
import React, { Fragment, useEffect, useState } from "react";
import { Text } from "slate";
import { cn } from "../lib/utils";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

type Children = Leaf[];

type Leaf = {
  [key: string]: unknown
  children: Children
  type: string
  url?: string
  tag?: string
  fields?: {
    [key: string]: unknown
    blockType?: string
    language?: string
    code?: string
    image?: {
      url: string
      alt?: string
    }
    caption?: string
    url?: string
    newTab?: boolean
  }
  value?: {
    alt: string
    url: string
  }
}

// Type adapter for content from Payload CMS
export function adaptContentToLeaf(content: any[]): Children {
  if (!content) return [];

  return content.map(item => ({
    ...item,
    children: Array.isArray(item.children) ? adaptContentToLeaf(item.children) : []
  })) as Children;
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
        return (
          <blockquote key={i} className="relative pl-6 pr-2 py-2 my-6 border-l-4 border-primary/30 bg-secondary/10 rounded-r-lg">
            <div className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 text-4xl text-primary/20">&ldquo;</div>
            {serialize(node.children)}
            <div className="absolute bottom-0 right-2 transform translate-y-1/2 text-4xl text-primary/20">&rdquo;</div>
          </blockquote>
        )
      case 'heading':
        switch (node.tag) {
          case 'h1':
            return (
              <h1 key={i} className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl mb-6 mt-8">
                {serialize(node.children)}
              </h1>
            )
          case 'h2':
            return (
              <h2 key={i} className="scroll-m-20 text-2xl font-semibold tracking-tight mb-5 mt-8 border-b pb-2 border-border">
                {serialize(node.children)}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} className="scroll-m-20 text-xl font-semibold tracking-tight mb-4 mt-6">
                {serialize(node.children)}
              </h3>
            )
          case 'h4':
            return (
              <h4 key={i} className="scroll-m-20 text-lg font-semibold tracking-tight mb-4 mt-6">
                {serialize(node.children)}
              </h4>
            )
          case 'h5':
            return (
              <h5 key={i} className="scroll-m-20 text-base font-semibold tracking-tight mb-3 mt-5">
                {serialize(node.children)}
              </h5>
            )
          case 'h6':
            return (
              <h6 key={i} className="scroll-m-20 text-sm font-semibold tracking-tight mb-3 mt-5">
                {serialize(node.children)}
              </h6>
            )
        }
      case "block":
        switch (node.fields?.blockType) {
          case "Code":
            return (
              <div key={i} className="relative group my-8">
                <div className="absolute -top-5 right-2 bg-secondary/80 text-xs px-2 py-1 rounded-t-md font-mono">
                  {node.fields?.language || "javascript"}
                </div>
                <Highlight
                  key={i}
                  prism={Prism}
                  theme={themes.nightOwl}
                  code={node?.fields?.code || ""}
                  language={node.fields?.language || "javascript"}
                >
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                      className={`${className} p-4 pt-6 rounded-lg overflow-auto shadow-md border border-secondary/30`}
                      style={style}
                    >
                      {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })} key={i} className="relative group">
                          <span className="inline-block w-8 text-right pr-2 select-none opacity-50 group-hover:opacity-100 text-xs">
                            {i + 1}
                          </span>
                          {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} key={key} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            )
          case "Image":
            if (node.fields?.image && node.fields.image.url) {
              return (
                <figure key={i} className="my-8 relative">
                  <div className="relative rounded-lg overflow-hidden shadow-md mx-auto max-w-2xl">
                    <Image
                      src={node.fields.image.url}
                      alt={node.fields.image.alt || "Content image"}
                      width={800}
                      height={500}
                      className="object-cover w-full"
                    />
                  </div>
                  {node.fields.caption && (
                    <figcaption className="text-center text-sm text-muted-foreground mt-2">
                      {node.fields.caption}
                    </figcaption>
                  )}
                </figure>
              )
            }
            return null
          default:
            return <div key={i}>{serialize(node.children)}</div>
        }

      case 'listitem':
        return (
          <li key={i} className="my-1">
            {serialize(node.children)}
          </li>
        )
      case 'link':
        return (
          <a
            href={escapeHTML(node?.fields?.url)}
            target={node?.fields?.newTab ? '_blank' : '_self'}
            key={i}
            className="text-primary font-medium hover:underline inline-flex items-center"
          >
            {serialize(node.children)}
            {node?.fields?.newTab && <ExternalLink className="ml-1 h-3 w-3" />}
          </a>
        )
      case 'ol':
        return (
          <ol key={i} className="list-decimal pl-6 space-y-2 my-6">
            {serialize(node.children)}
          </ol>
        )
      case 'list':
        return (
          <ul key={i} className="list-disc pl-6 space-y-2 my-6">
            {serialize(node.children)}
          </ul>
        )

      default:
        return <div key={i}>{serialize(node.children)}</div>
    }
  })

const RichText: React.FC<{ className?: string; content: Children }> = ({
  content,
  className,
}) => {
  const [mounted, setMounted] = useState(false);

  // Add table of contents generation
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    setMounted(true);

    // Extract headings for table of contents
    if (content) {
      const extractedHeadings: { id: string; text: string; level: number }[] = [];
      for (const node of content) {
        if (node.type === 'heading' && node.tag && ['h2', 'h3'].includes(node.tag)) {
          const headingText = node.children
            .filter((child: Leaf) => Text.isText(child))
            .map((child: Leaf & { text?: string }) => child.text || '')
            .join('');

          if (headingText) {
            const id = headingText
              .toLowerCase()
              .replace(/[^\w\s]/g, '')
              .replace(/\s+/g, '-');

            extractedHeadings.push({
              id,
              text: headingText,
              level: node.tag === 'h2' ? 2 : 3
            });
          }
        }
      }
      setHeadings(extractedHeadings);
    }
  }, [content]);

  if (!content) {
    return null;
  }

  // Show table of contents only if we have headings and component is mounted
  const showToc = mounted && headings.length > 2;

  return (
    <div className={cn("editor-content", className)}>
      {showToc && (
        <div className="bg-secondary/20 rounded-lg p-4 mb-8 border border-secondary/30">
          <h4 className="text-lg font-medium mb-3">Table of Contents</h4>
          <nav>
            <ul className="space-y-1">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={cn(
                    "hover:text-primary transition-colors",
                    heading.level === 3 ? "ml-4" : ""
                  )}
                >
                  <a
                    href={`#${heading.id}`}
                    className="hover:underline"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {serialize(content)}
    </div>
  );
};

export default RichText;
