import { Building2, Calendar, Code2, ExternalLink, FileCode2, GanttChart, Layers, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "../../../../components/breadcrumb";
import RichText, { adaptContentToLeaf } from "../../../../components/rich-text";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { getProjectById, getProjects, getRelatedProjects } from "../../../../lib/data";
import { formatDate } from "../../../../lib/utils";
import { Media, Skill } from "@/payload-types";
import { ProjectContent } from "@/components/features/project-content";

// Extended Project type with optional fields
interface ExtendedProject {
  github_url?: string;
  live_url?: string;
  type?: string;
  status?: string;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.docs.map((project) => ({
    id: String(project.id),
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  // Get related projects
  const relatedProjects = await getRelatedProjects(String(project.id), 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title!, href: `/projects/${project.id}` },
        ]}
      />

      {/* Project Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
          {project.icon && (
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-secondary/30 flex items-center justify-center">
              <Image
                src={(project.icon as Media).url!}
                alt={project.title || "Project icon"}
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <Building2 className="mr-2 h-4 w-4" />
              <span>{project.company}</span>

              {/* Project dates if available */}
              {project.createdAt && (
                <div className="flex items-center ml-4">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{formatDate(project.createdAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content - Left Side */}
        <div className="flex flex-col w-full md:w-2/3">
          {/* Project Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-lg text-muted-foreground mb-8">{project.excerpt}</p>
          </div>

          {/* Project Content */}
          <ProjectContent project={project} />
        </div>

        {/* Sidebar - Right Side */}
        <div className="w-full md:w-1/3 space-y-8">
          {/* Project Technologies */}
          {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
            <div className="bg-secondary/30 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Layers className="mr-2 h-5 w-5 text-primary/70" />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge
                    key={(tech as Skill).id}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm bg-secondary/50"
                  >
                    {(tech as Skill).title}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Project Links */}
          <div className="bg-secondary/30 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Share2 className="mr-2 h-5 w-5 text-primary/70" />
              Project Links
            </h3>
            <div className="space-y-3">
              {/* GitHub Repository */}
              {(project as ExtendedProject).github_url ? (
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <a href={(project as ExtendedProject).github_url} target="_blank" rel="noopener noreferrer">
                    <Code2 className="mr-2 h-4 w-4" />
                    GitHub Repository
                  </a>
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="w-full justify-start" disabled>
                  <Code2 className="mr-2 h-4 w-4" />
                  No Repository Available
                </Button>
              )}

              {/* Live Demo */}
              {(project as ExtendedProject).live_url ? (
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <a href={(project as ExtendedProject).live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="w-full justify-start" disabled>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  No Live Demo Available
                </Button>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-secondary/30 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FileCode2 className="mr-2 h-5 w-5 text-primary/70" />
              Project Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium">{(project as ExtendedProject).type || "Software Development"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">{(project as ExtendedProject).status || "Completed"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company:</span>
                <span className="font-medium">{project.company}</span>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects && relatedProjects.length > 0 && (
            <div className="bg-secondary/30 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <GanttChart className="mr-2 h-5 w-5 text-primary/70" />
                Related Projects
              </h3>
              <div className="space-y-4">
                {relatedProjects.map((relatedProject) => (
                  <div key={relatedProject.id} className="group">
                    <Link href={`/projects/${relatedProject.id}`} className="block hover:bg-secondary/50 p-3 rounded-lg transition-colors">
                      <h4 className="font-medium group-hover:text-primary transition-colors">{relatedProject.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{relatedProject.excerpt}</p>
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
