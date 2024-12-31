import { afterOperationHookProjects } from '@/helpers'
import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
    slug: "skills",
    admin: {
      useAsTitle: "title",
    },
    fields: [
      {
        name: "title",
        type: "text",
      },
      {
        name: "level",
        type: "select",
        options: [
          {
            label: "Beginner",
            value: "beginner",
          },
          {
            label: "Intermediate",
            value: "intermediate",
          },
          {
            label: "Advanced",
            value: "advanced",
          },
        ],
      },
    ],
    hooks: {
      afterOperation: [afterOperationHookProjects],
    },
}
