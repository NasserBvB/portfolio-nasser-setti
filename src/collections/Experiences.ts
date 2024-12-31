import { afterOperationHookProjects } from '@/helpers'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { SlateToLexicalFeature } from '@payloadcms/richtext-lexical/migrate'
import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: "experiences",
  admin: {
    useAsTitle: "title",
  },
  fields: [
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
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          SlateToLexicalFeature({})],
      }),
      required: true,
    },
    {
      name: "start",
      type: "text",
      admin: {
        position: "sidebar",
      },
      required: true,
    },
    {
      name: "end",
      type: "text",
      admin: {
        position: "sidebar",
      },
      required: true,
    },
    {
      name: "duration",
      type: "text",
      admin: {
        position: "sidebar",
      },
      required: true,
    },
    {
      name: "technologies",
      type: "relationship",
      relationTo: "skills",
      hasMany: true,
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "company",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterOperation: [afterOperationHookProjects],
  },
}
