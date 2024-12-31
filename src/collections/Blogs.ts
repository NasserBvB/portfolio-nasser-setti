import { afterOperationHookProjects, beforeValidateBlog } from '@/helpers'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { SlateToLexicalFeature } from '@payloadcms/richtext-lexical/migrate'
import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: "blogs",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "thumbnail",
      type: "relationship",
      relationTo: "media",
      required: true,
      access: {
        read: () => true,
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "excerpt",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      required: true,
      unique: true,
    },
    {
      name: "published",
      type: "checkbox",
      admin: {
        position: "sidebar",
      },
      required: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "title", type: "text" }],
      admin: {
        position: "sidebar",
      },
      required: true,
    },
    {
      name: "read_time",
      type: "number",
      admin: {
        position: "sidebar",
      },
      required: true,
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          SlateToLexicalFeature({})],
      }),
      required: true,
    },
  ],
  hooks: {
    afterOperation: [afterOperationHookProjects],
    beforeValidate: [beforeValidateBlog],
  },
}
