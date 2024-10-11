import { Breadcrumb } from "../../../components/breadcrumb";
import ProjectCard from "../../../components/cards/project";
import { getProjects } from "../../../lib/data";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
        ]}
      />
      <h1 className="text-4xl font-bold mb-8">All Projects</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.docs.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
}
