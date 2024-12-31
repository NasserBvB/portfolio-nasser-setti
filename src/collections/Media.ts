import { afterOperationHookProjects } from '@/helpers'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: "media",
    upload: true,
    fields: [
      {
        name: "text",
        type: "text",
      },
    ],
    hooks: {
      afterOperation: [afterOperationHookProjects],
    },
    access: {
      read: () => true,
    },
}
