import config from '@payload-config'
import { getPayload } from 'payload'

export const getBlogs = async (limit?: number) => {
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'blogs',
    where: {
      published: {
        equals: true,
      },
    },
    limit,
  })

  return data
}

export const getBlogBySlug = async (slug: string) => {
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'blogs',
    where: {
      slug: { equals: slug },
    },
  })

  if (data.docs && data.docs.length > 0 && data.totalDocs > 0) {
    const related = await payload.find({
      collection: 'blogs',
      where: {
        slug: { not_equals: data.docs.at(0)?.slug },
        published: { equals: true },
        'tags.title': {
          in: data.docs.at(0)?.tags.map((tag) => tag.title),
        },
      },
      limit: 5,
    })

    return {
      doc: data.docs.at(0),
      related: related.docs,
    }
  }

  return
}

export const getProjects = async (limit?: number) => {
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'projects',
    limit,
  })

  return data
}

export const getProjectById = async (id: string) => {
  const payload = await getPayload({ config })

  const data = await payload.findByID({
    collection: 'projects',
    id,
  })

  return data
}

export const getRelatedProjects = async (projectId: string, limit: number = 3) => {
  const payload = await getPayload({ config })

  // First get the current project to access its technologies
  const currentProject = await payload.findByID({
    collection: 'projects',
    id: projectId,
  })

  if (!currentProject || !currentProject.technologies || !Array.isArray(currentProject.technologies)) {
    return []
  }

  // Get the technology IDs from the current project
  const techIds = currentProject.technologies.map(tech =>
    typeof tech === 'object' ? tech.id : tech
  )

  // Find projects with similar technologies but exclude the current project
  const relatedProjects = await payload.find({
    collection: 'projects',
    where: {
      and: [
        {
          id: {
            not_equals: projectId,
          },
        },
        {
          or: techIds.map(techId => ({
            'technologies.id': {
              equals: techId,
            },
          })),
        },
      ],
    },
    limit,
  })

  return relatedProjects.docs
}

export const getExperiences = async (limit?: number) => {
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'experiences',
    limit,
    sort: 'createdAt',
  })

  return data
}

export const getExperienceById = async (id: string) => {
  const payload = await getPayload({ config })

  const data = await payload.findByID({
    collection: 'experiences',
    id,
  })

  return data
}

export const getRelatedExperiences = async (experienceId: string, limit: number = 3) => {
  const payload = await getPayload({ config })

  // First get the current experience to access its technologies
  const currentExperience = await payload.findByID({
    collection: 'experiences',
    id: experienceId,
  })

  if (!currentExperience || !currentExperience.technologies || !Array.isArray(currentExperience.technologies)) {
    return []
  }

  // Get the technology IDs from the current experience
  const techIds = currentExperience.technologies.map(tech =>
    typeof tech === 'object' ? tech.id : tech
  )

  // Find experiences with similar technologies but exclude the current experience
  const relatedExperiences = await payload.find({
    collection: 'experiences',
    where: {
      and: [
        {
          id: {
            not_equals: experienceId,
          },
        },
        {
          or: techIds.map(techId => ({
            'technologies.id': {
              equals: techId,
            },
          })),
        },
      ],
    },
    limit,
  })

  return relatedExperiences.docs
}

export const getSkills = async () => {
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'skills',
  })

  return data
}
