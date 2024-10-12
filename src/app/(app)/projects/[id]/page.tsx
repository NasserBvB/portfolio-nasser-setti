import { Breadcrumb } from "../../../../components/breadcrumb";
import RichText from "../../../../components/richText";
import { getProjectById, getProjects } from "../../../../lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.docs.map((project) => ({
    id: String(project.id),
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title!, href: `/projects/${project.id}` },
        ]}
      />

      <h2>{project.title}</h2>
      <RichText content={project?.content} />
    </div>
  );
}
