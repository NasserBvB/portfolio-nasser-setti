import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Blog, Media } from 'payload-types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

const BlogCard = ({ blog }: { blog: Blog }) => {
  const blogThumbnail = blog.thumbnail as Media
  const thumbnail = blogThumbnail
  return (
    <Card key={blog.slug}>
      <CardHeader>
        <CardTitle
          title={blog.title}
          className="line-clamp-2"
        >
          {blog.title}
        </CardTitle>
        <CardDescription>Published {formatDate(blog.updatedAt)}</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        {thumbnail && (
          <div className="flex relative rounded-md overflow-hidden my-4">
            <Image
              src={thumbnail.url!}
              alt={`${blog.title} thumbnail`}
              className="grow max-h-64 aspect-auto object-cover"
              width={150}
              height={150}
            />
          </div>
        )}
        <p className="text-muted-foreground mb-4 line-clamp-4">{blog.excerpt}</p>
      </CardContent>
      <CardFooter>
        <div className="flex grow justify-between items-center">
          <span className="text-muted-foreground font-light text-sm">
            {blog.read_time} mins read
          </span>
          <Link href={`/blogs/${blog.slug}`} className="text-primary hover:underline">
            Read More
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default BlogCard
