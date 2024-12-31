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
  const payload = await getPayload({ config})

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

export const getSkills = async () => {
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'skills',
  })

  return data
}
