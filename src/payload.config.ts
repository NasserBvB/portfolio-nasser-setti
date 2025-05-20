// storage-adapter-import-placeholder
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from "@payloadcms/db-postgres";
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { resendAdapter } from '@payloadcms/email-resend'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Skills } from './collections/Skills'
import { Blogs } from './collections/Blogs'
import { Experiences } from './collections/Experiences'
import { Projects } from './collections/Projects'


import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { SlateToLexicalFeature } from '@payloadcms/richtext-lexical/migrate';
import { languages } from './components/features/languages';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Skills, Blogs, Experiences, Projects],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      SlateToLexicalFeature({}),
      BlocksFeature({
        blocks: [
          {
            slug: 'Code',
            fields: [
              {
                type: 'select',
                name: 'language',
                options: Object.entries(languages).map(([key, value]) => ({
                  label: value,
                  value: key,
                })),
                defaultValue: 'ts',
              },
              {
                admin: {
                  components: {
                    Field: 'src/components/features/code-component',
                  },

                },
                name: 'code',
                type: 'code',
              },
            ],
          }
        ],
        inlineBlocks: [],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DB_URI,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: 'do-not-reply@snasser.dev',
    defaultFromName: 'Snasser.dev',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
})
