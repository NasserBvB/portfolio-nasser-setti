import { Breadcrumb } from '@/components/breadcrumb'
import ExperienceCard from '@/components/cards/experience'
import { getExperiences } from '@/lib/data'

export default async function ExperiencesPage() {
  const experiences = await getExperiences()
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Experiences', href: '/experiences' },
        ]}
      />
      <h1 className="text-4xl font-bold mb-8">All Experiences</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {experiences.docs.map((experience) => (
          <ExperienceCard experience={experience} key={experience.id} />
        ))}
      </div>
    </div>
  )
}
