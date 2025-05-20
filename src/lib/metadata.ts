import { Metadata } from "next";
import { Blog, Experience, Project } from "../payload-types";

const robots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
} as const;

// Base URL for the website
export const siteConfig = {
  name: "Nasser Setti",
  url: "https://snasser.dev",
  description: "Full-Stack Developer & Digital Architect specializing in creating captivating digital experiences",
  keywords: ["portfolio", "developer", "full-stack", "architect", "web development", "projects", "experiences", "blogs", "skills"],
  authors: [
    {
      name: "Nasser Setti",
      url: "https://snasser.dev",
    },
  ],
  creator: "Nasser Setti",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: [
      {
        url: "/nasser.jpg",
        sizes: "32x32",
        type: "image/jpeg",
      },
      {
        url: "/nasser.jpg",
        sizes: "16x16",
        type: "image/jpeg",
      },
    ],
    apple: [
      {
        url: "/nasser.jpg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://snasser.dev",
    title: "Nasser Setti - Full-Stack Developer & Digital Architect",
    description: "Explore my portfolio to discover my professional journey, featured projects, mastered competencies, and insights on industry trends.",
    siteName: "Nasser Setti Portfolio",
    images: [
      {
        url: "/nasser.jpg",
        width: 1200,
        height: 630,
        alt: "Nasser Setti - Full-Stack Developer & Digital Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasser Setti - Full-Stack Developer & Digital Architect",
    description: "Explore my portfolio to discover my professional journey, featured projects, mastered competencies, and insights on industry trends.",
    images: ["/nasser.jpg"],
    creator: "@NBvBJS",
  },
  robots,
};

// Default metadata for the site
export const defaultMetadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Full-Stack Developer & Digital Architect`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  icons: siteConfig.icons,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  robots: siteConfig.robots,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
};

// Generate metadata for blog pages
export function generateBlogMetadata(blog: Blog): Metadata {
  const title = `${blog.title} | Blog`;
  const description = blog.excerpt;
  const url = `${siteConfig.url}/blogs/${blog.slug}`;
  const imageUrl = blog.thumbnail && typeof blog.thumbnail !== 'number' ? blog.thumbnail.url : "/nasser.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...siteConfig.openGraph,
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: imageUrl || "/nasser.jpg",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: siteConfig.authors.map(author => author.name),
      tags: blog.tags?.map(tag => tag.title).filter(Boolean) as string[],
    },
    twitter: {
      ...siteConfig.twitter,
      title,
      description,
      images: [imageUrl || "/nasser.jpg"],
    },
  };
}

// Generate metadata for project pages
export function generateProjectMetadata(project: Project): Metadata {
  const title = `${project.title} | Project`;
  const description = project.excerpt;
  const url = `${siteConfig.url}/projects/${project.id}`;
  const imageUrl = project.icon && typeof project.icon !== 'number' ? project.icon.url : "/nasser.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...siteConfig.openGraph,
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: imageUrl || "/nasser.jpg",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
    },
    twitter: {
      ...siteConfig.twitter,
      title,
      description,
      images: [imageUrl || "/nasser.jpg"],
    },
  };
}

// Generate metadata for experience pages
export function generateExperienceMetadata(experience: Experience): Metadata {
  const title = `${experience.title} at ${experience.company} | Experience`;
  const description = experience.excerpt;
  const url = `${siteConfig.url}/experiences/${experience.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...siteConfig.openGraph,
      title,
      description,
      url,
      type: "article",
      publishedTime: experience.createdAt,
      modifiedTime: experience.updatedAt,
    },
    twitter: {
      ...siteConfig.twitter,
      title,
      description,
    },
  };
}
