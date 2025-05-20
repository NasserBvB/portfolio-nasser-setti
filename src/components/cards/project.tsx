"use client"

import Image from "next/image";
import Link from "next/link";
import { Media, Project, Skill } from "../../payload-types";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight, Building2, ExternalLink, Code2, Layers } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const ProjectCard = ({ project, featured = false }: { project: Project; featured?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const projectIcon = project.icon as Media;
  const icon = projectIcon;

  return (
    <Card
      key={project.id}
      className={cn(
        "overflow-hidden flex flex-col transition-all duration-300 group relative border-primary/10",
        featured ? "md:flex-row md:h-[300px]" : "h-full",
        isHovered && "shadow-xl transform -translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay for hover effect */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 z-10 pointer-events-none",
        isHovered && "opacity-100"
      )} />

      {/* Project Image */}
      <div className={cn(
        "relative overflow-hidden bg-secondary/30",
        featured ? "w-full md:w-1/2 h-48 md:h-full" : "w-full h-48"
      )}>
        {icon ? (
          <Image
            src={icon.url!}
            alt={`${project.title} thumbnail`}
            className={cn(
              "object-contain p-4 transition-transform duration-500",
              isHovered && "scale-105"
            )}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={featured}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Layers className="h-16 w-16 text-primary/30" />
          </div>
        )}

        {/* Company badge */}
        <div className="absolute top-3 left-3 z-20">
          <Badge
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm border border-primary/20 px-3 py-1"
          >
            <Building2 className="mr-1 h-3 w-3" />
            {project.company}
          </Badge>
        </div>

        {/* Gradient overlay for image */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-30" />
      </div>

      <div className={cn(
        "flex flex-col",
        featured ? "md:w-1/2" : "w-full"
      )}>
        <CardHeader>
          <CardTitle
            className={cn(
              "line-clamp-2 transition-colors",
              isHovered ? "text-primary" : "text-foreground",
              featured && "text-xl md:text-2xl"
            )}
          >
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="grow flex flex-col">
          <p className={cn(
            "text-muted-foreground mb-4",
            featured ? "line-clamp-4" : "line-clamp-3"
          )}>
            {project.excerpt}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-auto mb-4">
            {(project.technologies as Skill[])?.slice(0, featured ? 6 : 3).map((item) => (
              <Badge
                key={item.id}
                variant="outline"
                className="bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                {item.title}
              </Badge>
            ))}
            {(project.technologies as Skill[])?.length > (featured ? 6 : 3) && (
              <Badge variant="outline" className="bg-secondary/10">
                +{(project.technologies as Skill[]).length - (featured ? 6 : 3)} more
              </Badge>
            )}
          </div>

          {/* Project links for featured projects */}
          {featured && (
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Check if github_url exists in project as any to avoid TypeScript errors */}
              {(project as any).github_url && (
                <Button variant="outline" size="sm" asChild className="h-8">
                  <a href={(project as any).github_url} target="_blank" rel="noopener noreferrer">
                    <Code2 className="mr-1 h-3 w-3" />
                    GitHub
                  </a>
                </Button>
              )}
              {/* Check if live_url exists in project as any to avoid TypeScript errors */}
              {(project as any).live_url && (
                <Button variant="outline" size="sm" asChild className="h-8">
                  <a href={(project as any).live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          <Link
            href={`/projects/${project.id}`}
            className={cn(
              "text-primary font-medium flex items-center transition-all",
              isHovered ? "translate-x-1" : ""
            )}
          >
            Explore Project
            <ArrowRight className={cn(
              "ml-1 h-4 w-4 transition-transform",
              isHovered && "transform translate-x-1"
            )} />
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProjectCard;
