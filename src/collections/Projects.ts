import { afterOperationHookProjects } from '@/helpers'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { SlateToLexicalFeature } from '@payloadcms/richtext-lexical/migrate'
import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: "projects",
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
      name: "technologies",
      type: "relationship",
      relationTo: "skills",
      required: true,
      hasMany: true,
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
    {
      name: "icon",
      relationTo: "media",
      type: "relationship",
      required: true,
      admin: {
        position: "sidebar",
      },
      access: {
        read: () => true,
      },
    },
  ],

  hooks: {
    afterOperation: [afterOperationHookProjects],
  },
}
