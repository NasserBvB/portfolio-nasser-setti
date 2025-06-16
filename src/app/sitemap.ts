import { MetadataRoute } from "next";
import { getBlogs, getExperiences, getProjects } from "../lib/data";

// Base URL for the website - update this to your actual domain
const baseUrl = "https://snasser.dev";

// Helper function to format date to ISO 8601 format (YYYY-MM-DD)
function formatDateToISO(date: Date | string): string {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, projects, experiences] = await Promise.all([
    getBlogs(),
    getProjects(),
    getExperiences(),
  ]);

  let lastModifiedBlogsDate = new Date(blogs.docs[0].updatedAt);
  let lastModifiedProjectsDate = new Date(projects.docs[0].updatedAt);
  let lastModifiedExperiencesDate = new Date(experiences.docs[0].updatedAt);

  // Generate blogs urls
  const blogs_urls = blogs.docs.map((blog) => {
    if (new Date(blog.updatedAt).getTime() > lastModifiedBlogsDate.getTime()) {
      lastModifiedBlogsDate = new Date(blog.updatedAt);
    }

    return {
      url: baseUrl + `/blogs/${blog.slug}`,
      lastModified: formatDateToISO(blog.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    } as MetadataRoute.Sitemap[0];
  });

  // Generate projects urls
  const projects_urls = projects.docs.map((project) => {
    if (
      new Date(project.updatedAt).getTime() > lastModifiedProjectsDate.getTime()
    ) {
      lastModifiedProjectsDate = new Date(project.updatedAt);
    }
    return {
      url: baseUrl + `/projects/${project.id}`,
      lastModified: formatDateToISO(project.updatedAt),
      changeFrequency: "monthly",
      priority: 0.5,
    } as MetadataRoute.Sitemap[0];
  });

  // Generate experiences urls

  const experiences_urls = experiences.docs.map((experience) => {
    if (
      new Date(experience.updatedAt).getTime() >
      lastModifiedExperiencesDate.getTime()
    ) {
      lastModifiedExperiencesDate = new Date(experience.updatedAt);
    }

    return {
      url: baseUrl + `/experiences/${experience.id}`,
      lastModified: formatDateToISO(experience.updatedAt),
      changeFrequency: "monthly",
      priority: 0.5,
    } as MetadataRoute.Sitemap[0];
  });

  return [
    {
      url: baseUrl,
      lastModified: formatDateToISO(new Date()),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: baseUrl + "/blogs",
      lastModified: formatDateToISO(lastModifiedBlogsDate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: baseUrl + "/projects",
      lastModified: formatDateToISO(lastModifiedProjectsDate),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: baseUrl + "/experiences",
      lastModified: formatDateToISO(lastModifiedExperiencesDate),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogs_urls,
    ...projects_urls,
    ...experiences_urls,
  ];
}
