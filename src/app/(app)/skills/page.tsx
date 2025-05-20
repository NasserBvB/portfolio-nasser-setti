import { Metadata } from "next";
import { Breadcrumb } from "../../../components/breadcrumb";
import { Badge } from "../../../components/ui/badge";
import { getSkills } from "../../../lib/data";
import { Code2, Layers, BookOpen, Star, Database, Cloud, Server, Globe, Palette, Terminal } from "lucide-react";

// Add metadata for the skills page
export const metadata: Metadata = {
  title: "Skills & Competencies | Nasser Setti",
  description: "Explore my diverse skill set spanning development, design, architecture, and more. These are the tools and technologies I use to bring ideas to life.",
  alternates: {
    canonical: "https://snasser.dev/skills",
  },
};

// Define skill categories with their icons
const skillCategories = [
  {
    name: "Frontend Development",
    icon: <Code2 className="h-5 w-5 text-primary/70" />,
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Angular", "HTML", "CSS", "SCSS", "Tailwind CSS"]
  },
  {
    name: "Backend Development",
    icon: <Server className="h-5 w-5 text-primary/70" />,
    skills: ["Node.js", "Express", "NestJS", "Python", "Django", "Flask", "Java", "Spring Boot", "PHP", "Laravel"]
  },
  {
    name: "Database & Storage",
    icon: <Database className="h-5 w-5 text-primary/70" />,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Elasticsearch", "DynamoDB", "SQLite"]
  },
  {
    name: "Cloud & DevOps",
    icon: <Cloud className="h-5 w-5 text-primary/70" />,
    skills: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Jenkins", "Terraform"]
  },
  {
    name: "Design & UI/UX",
    icon: <Palette className="h-5 w-5 text-primary/70" />,
    skills: ["UI/UX", "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "Design Systems", "Wireframing", "Prototyping"]
  },
  {
    name: "Architecture & System Design",
    icon: <Layers className="h-5 w-5 text-primary/70" />,
    skills: ["Architecture", "System Design", "Microservices", "Serverless", "API Design", "Event-Driven Architecture", "Domain-Driven Design"]
  },
  {
    name: "Mobile Development",
    icon: <Globe className="h-5 w-5 text-primary/70" />,
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Progressive Web Apps", "Responsive Design"]
  },
  {
    name: "Tools & Methodologies",
    icon: <Terminal className="h-5 w-5 text-primary/70" />,
    skills: ["Git", "Agile", "Scrum", "Kanban", "TDD", "BDD", "Clean Code", "SOLID Principles", "Design Patterns"]
  },
  {
    name: "Other Skills",
    icon: <BookOpen className="h-5 w-5 text-primary/70" />,
    skills: ["Technical Writing", "Project Management", "Team Leadership", "Mentoring", "Public Speaking", "Problem Solving"]
  }
];

export default async function SkillsPage() {
  const skills = await getSkills();
  
  // Create a map of skill titles to their level
  const skillLevelMap = new Map();
  skills.docs.forEach(skill => {
    if (skill.title) {
      skillLevelMap.set(skill.title, skill.level || 'intermediate');
    }
  });
  
  // Function to get badge variant based on skill level
  const getBadgeVariant = (skill: string) => {
    const level = skillLevelMap.get(skill);
    if (level === 'advanced') return "default";
    if (level === 'intermediate') return "secondary";
    return "outline";
  };

  // Function to check if a skill exists in the database
  const skillExists = (skill: string) => skillLevelMap.has(skill);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Skills", href: "/skills" },
        ]}
      />
      
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Skills & Competencies</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Explore my diverse skill set spanning development, design, architecture, and more. 
          These are the tools and technologies I use to bring ideas to life and solve complex problems.
        </p>
      </div>
      
      {/* Skills Categories */}
      <div className="space-y-12">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-secondary/20 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIndex) => (
                <Badge 
                  key={skillIndex} 
                  variant={getBadgeVariant(skill)}
                  className={`text-base py-2 px-4 ${!skillExists(skill) ? 'opacity-60' : ''}`}
                >
                  {skill}
                  {skillLevelMap.get(skill) === 'advanced' && (
                    <Star className="ml-1 h-3 w-3 text-yellow-400 inline" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": skillCategories.map((category, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": category.name,
              "item": {
                "@type": "Thing",
                "name": category.name,
                "description": `${category.name} skills and competencies`
              }
            }))
          })
        }}
      />
    </div>
  );
}
