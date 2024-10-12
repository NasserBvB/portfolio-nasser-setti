import { notFound } from "next/navigation";
import { Breadcrumb } from "../../../../components/breadcrumb";
import BlogCard from "../../../../components/cards/blog";
import RichText from "../../../../components/richText";
import { Separator } from "../../../../components/ui/separator";
import { getBlogBySlug, getBlogs } from "../../../../lib/data";
import { formatDate } from "../../../../lib/utils";

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.docs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blogResponse = await getBlogBySlug(params.slug);

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
          { label: blog.title!, href: `/blogs/${blog.slug}` },
        ]}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-3/5">
          <h2>{blog.title}</h2>
          <div className="flex justify-between items-center flex-wrap">
            <p className="text-muted-foreground mb-4">
              Published {formatDate(blog.createdAt)}
            </p>
            <p className="text-muted-foreground mb-4">
              Last Modified {formatDate(blog.updatedAt)}
            </p>
          </div>
          <RichText content={blog.content} />
        </div>
        <Separator className="hidden md:block grow-0" orientation="vertical" />
        {related.length > 0 && (
          <div className="w-full md:w-2/5 flex flex-col">
            <h3>
              Related Blogs{" "}
              <span className="text-muted-foreground">({related.length})</span>
            </h3>
            {related.map((blog) => (
              <BlogCard blog={blog} key={blog.slug} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
