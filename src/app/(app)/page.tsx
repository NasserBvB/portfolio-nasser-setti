import BlogCard from '@/components/cards/blog'
import ExperienceCard from '@/components/cards/experience'
import ProjectCard from '@/components/cards/project'
import { Badge } from '@/components/ui/badge'
import { getBlogs, getExperiences, getProjects, getSkills } from '@/lib/data'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export default async function Portfolio() {
  const [blogs, experiences, projects, skills] = await Promise.all([
    getBlogs(3),
    getExperiences(3),
    getProjects(3),
    getSkills(),
  ])

  return (
    <main>
      {/* Hero Section */}
      <section className="py-16 px-2 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-5xl">
              Creative Developer & Architect
            </h1>
            <p className="text-xl text-muted-foreground">
              Designing digital experiences that captivate, inspire, and engage users through
              creativity and innovation, fostering meaningful interactions that leave a lasting
              impact and drive deeper connections.
            </p>
          </div>
          <div className="relative flex items-center justify-center sm:justify-end rounded-xl overflow-hidden">
            <Image
              width={400}
              height={400}
              objectFit="contain"
              src="/nasser.jpg"
              alt="Hero Image"
              className="rounded-lg aspect-auto"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-2">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Discover My Story</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uncover the passion and expertise that drives my work. My journey is a testament to
            creativity, innovation, and a relentless pursuit of excellence in every project.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <p className="text-lg text-muted-foreground text-left">
            I am a passionate developer and designer with a keen eye for detail and a love for
            creating beautiful, functional websites and applications. With years of experience in
            the industry, I bring a unique blend of technical expertise and creative vision to every
            project.
          </p>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold my-0">My Approach</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>User-centered design</li>
              <li>Clean and efficient code</li>
              <li>Continuous learning and improvement</li>
              <li>Collaborative problem-solving</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-16 px-2">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mastered Competencies</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the diverse skill set that empowers my work. From cutting-edge technologies to
            timeless design principles, these are the tools I use to bring ideas to life.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.docs.map((skill, index) => (
            <Badge key={index} variant="default" className="text-lg py-2 px-4">
              {skill.title}
            </Badge>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-2 bg-secondary/50 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Showcasing Excellence</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore a curated selection of my best work. Each project represents a unique challenge
            overcome and a creative solution delivered, demonstrating my versatility and expertise.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.docs.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/projects">View All Projects</Link>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-16 px-2">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Professional Journey</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive into my career path and see how each role has contributed to my growth. My
            experiences have shaped me into a versatile professional ready to tackle any challenge.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {experiences.docs.map((experience, index) => (
            <ExperienceCard experience={experience} key={experience.id} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/experiences">View All Experiences</Link>
        </div>
      </section>

      {/* Blogs */}
      <section className="py-16 px-2 bg-secondary/50 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Insights & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Delve into my thoughts on industry trends, innovative technologies, and creative
            processes. My blog is a window into my professional insights and continuous learning
            journey.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogs.docs.map((blog) => (
            <BlogCard blog={blog} key={blog.slug} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/blogs">View All Blogs</Link>
        </div>
      </section>
    </main>
  )
}
