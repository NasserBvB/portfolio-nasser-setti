"use client"

import Image from "next/image";
import Link from "next/link";
import { Blog, Media } from "../../payload-types";
import { cn, formatDate } from "../../lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight, Calendar, Clock, Tag, User, BookOpen, Flame } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Separator } from "../ui/separator";

const BlogCard = ({ blog, featured = false }: { blog: Blog; featured?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const blogThumbnail = blog.thumbnail as Media;
  const thumbnail = blogThumbnail;

  // Check if the blog post is recent (less than 7 days old)
  const isRecent = () => {
    const publishDate = new Date(blog.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - publishDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <Card
      key={blog.slug}
      className={cn(
        "overflow-hidden flex flex-col transition-all duration-300 group relative border",
        featured ? "md:flex-row md:h-[280px]" : "hover:shadow-lg",
        isHovered && "shadow-xl transform -translate-y-1 border-primary/30",
        isRecent() && !isHovered && "border-primary/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay for hover effect */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 z-10 pointer-events-none",
        isHovered && "opacity-100"
      )} />

      {/* Pattern background for visual interest */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yNCAzMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTI0IDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')]" />

      {/* Thumbnail */}
      {thumbnail && (
        <div className={cn(
          "relative overflow-hidden",
          featured ? "w-full md:w-1/2 h-48 md:h-full" : "w-full h-52"
        )}>
          <Image
            src={thumbnail.url!}
            alt={`${blog.title} thumbnail`}
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && "scale-105"
            )}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={featured}
          />

          {/* Category tag */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="absolute top-3 left-3 z-20">
              <Badge
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm border border-primary/20 px-3 py-1 text-xs font-medium"
              >
                <Tag className="mr-1 h-3 w-3" />
                {blog.tags[0].title}
              </Badge>
            </div>
          )}

          {/* New post indicator */}
          {isRecent() && (
            <div className="absolute top-3 right-3 z-20">
              <Badge
                variant="default"
                className="bg-primary/90 backdrop-blur-sm px-3 py-1 text-xs font-medium animate-pulse"
              >
                <Flame className="mr-1 h-3 w-3" />
                New
              </Badge>
            </div>
          )}

          {/* Date overlay for featured card */}
          {featured && (
            <div className="absolute bottom-3 left-3 z-20">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm px-3 py-1">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDate(blog.updatedAt)}
              </Badge>
            </div>
          )}

          {/* Gradient overlay for image */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-60" />
        </div>
      )}

      <div className={cn(
        "flex flex-col",
        featured ? "md:w-1/2" : "w-full"
      )}>
        <CardHeader className="pb-2">
          <CardTitle
            title={blog.title}
            className={cn(
              "line-clamp-2 transition-colors",
              isHovered ? "text-primary" : "text-foreground",
              featured && "text-xl md:text-2xl"
            )}
          >
            {blog.title}
          </CardTitle>

          <div className={cn(
            "flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2",
            featured && "text-base"
          )}>
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{formatDate(blog.updatedAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>{blog.read_time} min read</span>
            </div>
            {(blog as any).author && (
              <div className="flex items-center">
                <User className="mr-1 h-3 w-3" />
                <span>{(blog as any).author}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <Separator className="mx-6 bg-border/50" />

        <CardContent className="grow pt-4">
          <p className={cn(
            "text-muted-foreground mb-4",
            featured ? "line-clamp-4" : "line-clamp-2"
          )}>
            {blog.excerpt}
          </p>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
              {blog.tags.slice(0, featured ? 5 : 2).map(tag => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="bg-secondary/20 hover:bg-secondary/30 transition-colors text-xs"
                >
                  #{tag.title}
                </Badge>
              ))}
              {blog.tags.length > (featured ? 5 : 2) && (
                <Badge variant="outline" className="bg-secondary/10 text-xs">
                  +{blog.tags.length - (featured ? 5 : 2)} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          <Link
            href={`/blogs/${blog.slug}`}
            className={cn(
              "text-primary font-medium flex items-center transition-all",
              isHovered ? "translate-x-1" : "",
              featured && "text-base"
            )}
          >
            Read Article
            <ArrowRight className={cn(
              "ml-1 h-4 w-4 transition-transform",
              isHovered && "transform translate-x-1"
            )} />
          </Link>

          {featured && (
            <div className="flex items-center ml-auto">
              <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">Article</span>
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

export default BlogCard;
