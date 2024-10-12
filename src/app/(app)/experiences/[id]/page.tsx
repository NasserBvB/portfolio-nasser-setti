import { Breadcrumb } from "../../../../components/breadcrumb";
import RichText from "../../../../components/richText";
import { getExperienceById, getExperiences } from "../../../../lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const experiences = await getExperiences();
  return experiences?.docs.map((experience) => ({
    id: String(experience.id),
  }));
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const experience = await getExperienceById(params.id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Experiences", href: "/experiences" },
          { label: experience.title!, href: `/experiences/${experience.id}` },
        ]}
      />
      <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>

      <div className="flex justify-between items-center">
        <p className="mb-4">{experience.company}</p>
        <p className="text-lg mb-4 text-muted-foreground">
          {experience.start} - {experience.end}
        </p>
      </div>
      <RichText content={experience.content} />
    </div>
  );
}
