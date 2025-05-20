import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "../../../../components/breadcrumb";
import RichText, { adaptContentToLeaf } from "../../../../components/rich-text";
import { getBlogBySlug, getBlogs } from "../../../../lib/data";
import { formatDate } from "../../../../lib/utils";
import Image from "next/image";
import { Badge } from "../../../../components/ui/badge";
import {
  BookOpen,
  CalendarIcon,
  ClockIcon,
  FileText,
  Hash,
  Share2,
  User
} from "lucide-react";
import { generateBlogMetadata } from "../../../../lib/metadata";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { BlogContent } from "@/components/features/blog-content";


export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.docs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const blogResponse = await getBlogBySlug(slug);

  if (!blogResponse || !blogResponse.doc) {
    return {
      title: "Blog Not Found",
    };
  }

  return generateBlogMetadata(blogResponse.doc);
}

type PageProps = {
  params: Promise<{ [key: string]: string }>
  searchParams: Promise<{ [key: string]: string | string[] }>
};

export default async function BlogDetailPage({
  params,
}: PageProps) {
  const slug = (await params).slug;
  const blogResponse = await getBlogBySlug(slug);

  if (!blogResponse) {
    notFound();
  }

  const { doc: blog, related } = blogResponse;

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blogs" },
          {
            label: blog.title!.length > 30 ? blog.title!.slice(0, 30) + '...' : blog.title!,
            href: `/blogs/${blog.slug}`
          },
        ]}
      />

      {/* Blog Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Published {formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <ClockIcon className="mr-2 h-4 w-4" />
            <span>{blog.read_time} min read</span>
          </div>

          {/* Author if available */}
          {(blog as { author?: string }).author && (
            <div className="flex items-center text-muted-foreground">
              <User className="mr-2 h-4 w-4" />
              <span>{(blog as { author?: string }).author}</span>
            </div>
          )}
        </div>

        {/* Featured Image with overlay */}
        {blog.thumbnail && typeof blog.thumbnail !== 'number' && (
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8 group">
            <Image
              src={blog.thumbnail.url!}
              alt={blog.title || "Blog featured image"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60"></div>

            {/* Tags overlay */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end max-w-[50%]">
                {blog.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="bg-background/80 backdrop-blur-sm border border-primary/20 px-3 py-1"
                  >
                    #{tag.title}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content - Left Side */}
        <div className="flex flex-col w-full md:w-2/3">
          {/* Blog Excerpt/Summary */}
          {blog.excerpt && (
            <div className="mb-8 bg-secondary/20 p-6 rounded-xl border-l-4 border-primary/30">
              <p className="text-lg italic text-muted-foreground">{blog.excerpt}</p>
            </div>
          )}

          {/* Blog Content */}
          <BlogContent blog={blog} />

          {/* Tags at the bottom of content */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-muted-foreground">Tags:</span>
                {blog.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="px-3 py-1 text-sm hover:bg-secondary/30 transition-colors"
                  >
                    <Link
                      href={`/blogs?tag=${tag.title}`}
                      className="no-underline text-foreground"
                    >
                      #{tag.title}
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Navigation between blogs */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/blogs" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  All Articles
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar - Right Side */}
        <div className="w-full md:w-1/3 space-y-8">
          {/* Blog Details */}
          <div className="bg-secondary/30 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary/70" />
              Article Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Published:</span>
                <span className="font-medium">{formatDate(blog.createdAt)}</span>
              </div>
              {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated:</span>
                  <span className="font-medium">{formatDate(blog.updatedAt)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reading Time:</span>
                <span className="font-medium">{blog.read_time} min</span>
              </div>
              {(blog as { author?: string }).author && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Author:</span>
                  <span className="font-medium">{(blog as { author?: string }).author}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="bg-secondary/30 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Hash className="mr-2 h-5 w-5 text-primary/70" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="px-3 py-1 text-sm hover:bg-secondary transition-colors"
                  >
                    <Link
                      href={`/blogs?tag=${tag.title}`}
                      className="no-underline text-foreground"
                    >
                      #{tag.title}
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="bg-secondary/30 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Share2 className="mr-2 h-5 w-5 text-primary/70" />
              Share This Article
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(`https://snasser.dev/blogs/${blog.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://snasser.dev/blogs/${blog.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="bg-secondary/30 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary/70" />
                Related Articles <span className="text-muted-foreground ml-1">({related.length})</span>
              </h3>
              <div className="space-y-4">
                {related.map((relatedBlog) => (
                  <div key={relatedBlog.slug} className="group">
                    <Link href={`/blogs/${relatedBlog.slug}`} className="block hover:bg-secondary/50 p-3 rounded-lg transition-colors">
                      <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">{relatedBlog.title}</h4>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        <span>{formatDate(relatedBlog.createdAt)}</span>
                        <span className="mx-2">•</span>
                        <ClockIcon className="mr-1 h-3 w-3" />
                        <span>{relatedBlog.read_time} min read</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
