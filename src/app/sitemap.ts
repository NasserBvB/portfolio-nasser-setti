import { getBlogs, getExperiences, getProjects } from '@/lib/data'
import { MetadataRoute } from 'next'

const baseUrl = 'https://snasser.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, projects, experiences] = await Promise.all([
    getBlogs(),
    getProjects(),
    getExperiences(),
  ])

  let lastModifiedBlogsDate = new Date(blogs.docs[0].updatedAt)
  let lastModifiedProjectsDate = new Date(projects.docs[0].updatedAt)
  let lastModifiedExperiencesDate = new Date(experiences.docs[0].updatedAt)

  // Generate blogs urls
  const blogs_urls = blogs.docs.map((blog) => {
    if (new Date(blog.updatedAt).getTime() > lastModifiedBlogsDate.getTime()) {
      lastModifiedBlogsDate = new Date(blog.updatedAt)
    }

    return {
      url: baseUrl + `/blogs/${blog.slug}`,
      lastModified: new Date(blog.updatedAt).toLocaleString('en-GB', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      changeFrequency: 'monthly',
      priority: 0.8,
    } as MetadataRoute.Sitemap[0]
  })

  // Generate projects urls
  const projects_urls = projects.docs.map((project) => {
    if (new Date(project.updatedAt).getTime() > lastModifiedProjectsDate.getTime()) {
      lastModifiedProjectsDate = new Date(project.updatedAt)
    }
    return {
      url: baseUrl + `/projects/${project.id}`,
      lastModified: new Date(project.updatedAt).toLocaleString('en-GB', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      changeFrequency: 'monthly',
      priority: 0.5,
    } as MetadataRoute.Sitemap[0]
  })

  // Generate experiences urls

  const experiences_urls = experiences.docs.map((experience) => {
    if (new Date(experience.updatedAt).getTime() > lastModifiedExperiencesDate.getTime()) {
      lastModifiedExperiencesDate = new Date(experience.updatedAt)
    }

    return {
      url: baseUrl + `/experiences/${experience.id}`,
      lastModified: new Date(experience.updatedAt).toLocaleString('en-GB', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      changeFrequency: 'monthly',
      priority: 0.5,
    } as MetadataRoute.Sitemap[0]
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: baseUrl + '/blogs',
      // format it to be in DD/MM/YYYY HH:MM
      lastModified: lastModifiedBlogsDate.toLocaleString('en-GB', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: baseUrl + '/projects',
      lastModified: lastModifiedProjectsDate.toLocaleString('en-GB', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: baseUrl + '/experiences',
      lastModified: lastModifiedExperiencesDate.toLocaleString('en-GB', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...blogs_urls,
    ...projects_urls,
    ...experiences_urls,
  ]
}
