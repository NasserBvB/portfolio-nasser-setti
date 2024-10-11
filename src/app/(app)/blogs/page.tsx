import { Breadcrumb } from '@/components/breadcrumb'
import BlogCard from '@/components/cards/blog'
import { getBlogs } from '@/lib/data'

export default async function BlogsPage() {
  const blogs = await getBlogs()
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blogs' },
        ]}
      />
      <h1 className="text-4xl font-bold mb-8">All Blog Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {blogs.docs.map((blog) => (
          <BlogCard blog={blog} key={blog.slug} />
        ))}
      </div>
    </div>
  )
}
