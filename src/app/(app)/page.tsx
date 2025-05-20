import { ArrowRight, BookOpen, Briefcase, Code2, FileText, Layers, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "../../components/cards/blog";
import ExperienceCard from "../../components/cards/experience";
import ProjectCard from "../../components/cards/project";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  getBlogs,
  getExperiences,
  getProjects,
  getSkills,
} from "../../lib/data";

// Add metadata for the home page
export const metadata = {
  title: "Nasser Setti - Full-Stack Developer & Digital Architect",
  description: "Designing digital experiences that captivate, inspire, and engage users through creativity and innovation.",
  alternates: {
    canonical: "https://snasser.dev/",
  },
};

export default async function Portfolio() {
  const [blogs, experiences, projects, skills] = await Promise.all([
    getBlogs(3),
    getExperiences(3),
    getProjects(3),
    getSkills(),
  ]);

  // Prepare structured data for the home page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Nasser Setti",
      "jobTitle": "Full-Stack Developer & Digital Architect",
      "description": "Designing digital experiences that captivate, inspire, and engage users through creativity and innovation.",
      "knowsAbout": skills.docs.slice(0, 10).map(skill => skill.title).filter(Boolean),
      "url": "https://snasser.dev",
      "sameAs": [
        "https://github.com/nasserbvb",
        "https://www.linkedin.com/in/nasser-setti/",
        "https://x.com/NBvBJS"
      ]
    }
  };

  return (
    <>
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <main>
        {/* Hero Section */}
        <section className="py-16 px-2 md:py-24" aria-labelledby="hero-heading">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 id="hero-heading" className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Creative Developer & Architect
              </h1>
              <p className="text-xl text-muted-foreground">
                Designing digital experiences that captivate, inspire, and engage
                users through creativity and innovation, fostering meaningful
                interactions that leave a lasting impact and drive deeper
                connections.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/projects">
                    View My Work
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link href="/experiences">
                    My Experience
                    <Briefcase className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center sm:justify-end">
              <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-xl border-4 border-background">
                <Image
                  fill
                  src="/nasser.jpg"
                  alt="Nasser Setti - Creative Developer & Architect"
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-2" aria-labelledby="about-heading">
          <div className="text-center mb-12">
            <h2 id="about-heading" className="text-3xl font-bold mb-4">Discover My Story</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uncover the passion and expertise that drives my work. My journey is
              a testament to creativity, innovation, and a relentless pursuit of
              excellence in every project.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-secondary/20 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary/70" />
                My Background
              </h3>
              <p className="text-lg text-muted-foreground">
                I am a passionate developer and designer with a keen eye for detail
                and a love for creating beautiful, functional websites and
                applications. With years of experience in the industry, I bring a
                unique blend of technical expertise and creative vision to every
                project.
              </p>
            </div>
            <div className="bg-secondary/20 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Star className="mr-2 h-5 w-5 text-primary/70" />
                My Approach
              </h3>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>User-centered design focusing on intuitive experiences</li>
                <li>Clean, efficient, and maintainable code architecture</li>
                <li>Continuous learning and adaptation to new technologies</li>
                <li>Collaborative problem-solving with clients and teams</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Featured Skills */}
        <section className="py-16 px-2 bg-secondary/30 rounded-lg" aria-labelledby="skills-heading">
          <div className="text-center mb-12">
            <h2 id="skills-heading" className="text-3xl font-bold mb-4">Mastered Competencies</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the diverse skill set that empowers my work. From
              cutting-edge technologies to timeless design principles, these are
              the tools I use to bring ideas to life.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Group skills into categories */}
            <div className="bg-background/80 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Code2 className="mr-2 h-5 w-5 text-primary/70" />
                Development
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.docs
                  .filter(skill =>
                    skill.title &&
                    ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js', 'HTML', 'CSS']
                      .includes(skill.title))
                  .map((skill, index) => (
                    <Badge key={index} variant="default" className="text-sm py-1.5 px-3">
                      {skill.title}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="bg-background/80 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Layers className="mr-2 h-5 w-5 text-primary/70" />
                Design & Architecture
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.docs
                  .filter(skill =>
                    skill.title &&
                    ['UI/UX', 'Architecture', 'System Design', 'Figma', 'Adobe XD']
                      .includes(skill.title))
                  .map((skill, index) => (
                    <Badge key={index} variant="default" className="text-sm py-1.5 px-3">
                      {skill.title}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="bg-background/80 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary/70" />
                Other Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.docs
                  .filter(skill =>
                    skill.title &&
                    !['JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js', 'HTML', 'CSS',
                      'UI/UX', 'Architecture', 'System Design', 'Figma', 'Adobe XD']
                      .includes(skill.title))
                  .slice(0, 8)
                  .map((skill, index) => (
                    <Badge key={index} variant="default" className="text-sm py-1.5 px-3">
                      {skill.title}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/skills">
                View All Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 px-2" aria-labelledby="projects-heading">
          <div className="text-center mb-12">
            <h2 id="projects-heading" className="text-3xl font-bold mb-4">Showcasing Excellence</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore a curated selection of my best work. Each project represents
              a unique challenge overcome and a creative solution delivered,
              demonstrating my versatility and expertise.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.docs.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Experiences */}
        <section className="py-16 px-2 bg-secondary/30 rounded-lg" aria-labelledby="experiences-heading">
          <div className="text-center mb-12">
            <h2 id="experiences-heading" className="text-3xl font-bold mb-4">Professional Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive into my career path and see how each role has contributed to my
              growth. My experiences have shaped me into a versatile professional
              ready to tackle any challenge.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {experiences.docs.map((experience) => (
              <ExperienceCard experience={experience} key={experience.id} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/experiences">
                View All Experiences
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Blogs */}
        <section className="py-16 px-2" aria-labelledby="blogs-heading">
          <div className="text-center mb-12">
            <h2 id="blogs-heading" className="text-3xl font-bold mb-4">Insights & Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Delve into my thoughts on industry trends, innovative technologies,
              and creative processes. My blog is a window into my professional
              insights and continuous learning journey.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {blogs.docs.map((blog) => (
              <BlogCard blog={blog} key={blog.slug} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/blogs">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
