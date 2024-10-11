import path from 'path'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import { revalidatePath } from 'next/cache'
import { buildConfig, CollectionAfterOperationHook, CollectionBeforeValidateHook } from 'payload'
import { Blog } from 'payload-types'
import { en } from 'payload/i18n/en'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const makeSlug = (title: string): string => {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove repeated hyphens
}

const afterOperationHookProjects: CollectionAfterOperationHook = async ({
  args, // arguments passed into the operation
  operation, // name of the operation
  req, // full express request
  result, // the result of the operation, before modifications
}) => {
  switch (operation) {
    case 'create':
    case 'delete':
    case 'deleteByID':
    case 'update':
    case 'updateByID':
      revalidatePath(`/${args.collection.config.slug}`)
      revalidatePath('/')
      break

    default:
      break
  }
  return result // return modified result as necessary
}

const beforeValidateBlog: CollectionBeforeValidateHook<Blog> = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {
  if (!data?.title) return data
  data.slug = makeSlug(data.title)
  return data // Return data to either create or update a document with
}

export default buildConfig({
  editor: slateEditor({}),
  collections: [
    {
      slug: 'users',
      auth: true,
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [],
    },
    {
      slug: 'blogs',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'thumbnail',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'excerpt',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
          required: true,
          unique: true,
        },
        {
          name: 'published',
          type: 'checkbox',
          admin: {
            position: 'sidebar',
          },
          required: true,
        },
        {
          name: 'tags',
          type: 'array',
          fields: [{ name: 'title', type: 'text' }],
          admin: {
            position: 'sidebar',
          },
          required: true,
        },
        {
          name: 'read_time',
          type: 'number',
          admin: {
            position: 'sidebar',
          },
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          editor: slateEditor({}),
          required: true,
        },
      ],
      hooks: {
        afterOperation: [afterOperationHookProjects],
        beforeValidate: [beforeValidateBlog],
      },
    },
    {
      slug: 'projects',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'excerpt',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          editor: slateEditor({}),
          required: true,
        },
        {
          name: 'technologies',
          type: 'relationship',
          relationTo: 'skills',
          required: true,
          hasMany: true,
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'company',
          type: 'text',
          required: true,
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'icon',
          relationTo: 'media',
          type: 'relationship',
          required: true,
          admin: {
            position: 'sidebar',
          },
        },
      ],

      hooks: {
        afterOperation: [afterOperationHookProjects],
      },
    },
    {
      slug: 'experiences',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'excerpt',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          editor: slateEditor({}),
          required: true,
        },
        {
          name: 'start',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
          required: true,
        },
        {
          name: 'end',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
          required: true,
        },
        {
          name: 'duration',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
          required: true,
        },
        {
          name: 'technologies',
          type: 'relationship',
          relationTo: 'skills',
          hasMany: true,
          required: true,
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'company',
          type: 'text',
          required: true,
          admin: {
            position: 'sidebar',
          },
        },
      ],
      hooks: {
        afterOperation: [afterOperationHookProjects],
      },
    },
    {
      slug: 'skills',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'level',
          type: 'select',
          options: [
            {
              label: 'Beginner',
              value: 'beginner',
            },
            {
              label: 'Intermediate',
              value: 'intermediate',
            },
            {
              label: 'Advanced',
              value: 'advanced',
            },
          ],
        },
      ],
      hooks: {
        afterOperation: [afterOperationHookProjects],
      },
    },
    {
      slug: 'media',
      upload: true,
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
      hooks: {
        afterOperation: [afterOperationHookProjects],
      },
    },
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // db: mongooseAdapter({
  //   url: process.env.DB_URI || '',
  // }),

  db: postgresAdapter({
    // idType: "uuid",
    pool: {
      connectionString: process.env.DB_URI,
    },
  }),

  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { en },
  },
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: process.env.INITIAL_EMAIL || '',
          password: process.env.INITIAL_PWD || '',
        },
      })
    }
  },
  sharp,
})
