import { Breadcrumb } from "../../../../components/breadcrumb";
import RichText from "../../../../components/rich-text";
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
  params: Promise<{ id: string }>
}) {
  const id = (await params).id;
  const project = await getProjectById(id);
  console.log(
    JSON.stringify(project, null, 2)
  );

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
      <RichText content={project?.content.root.children} />
    </div>
  );
}
