import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  FileText,
  GanttChart,
  Layers,
  MapPin,
  Milestone
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "../../../../components/breadcrumb";
import RichText, { adaptContentToLeaf } from "../../../../components/rich-text";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { getExperienceById, getExperiences, getRelatedExperiences } from "../../../../lib/data";
import { generateExperienceMetadata } from "../../../../lib/metadata";
import { Skill } from "@/payload-types";
import { ExperienceContent } from "@/components/features/experience-content";

// Extended Experience type with optional fields
interface ExtendedExperience {
  location?: string;
  achievements?: string[];
}

export async function generateStaticParams() {
  const experiences = await getExperiences();
  return experiences?.docs?.map((experience) => ({
    id: String(experience.id),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const id = (await params).id;
  const experience = await getExperienceById(id);

  if (!experience) {
    return {
      title: "Experience Not Found",
    };
  }

  return generateExperienceMetadata(experience);
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const experience = await getExperienceById(id);

  if (!experience) {
    notFound();
  }

  // Get related experiences
  const relatedExperiences = await getRelatedExperiences(experience.id + "", 3);

  // Determine if this is a current position
  const isCurrent = experience.end?.toLowerCase() === 'present' || experience.end?.toLowerCase() === 'current';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Experiences", href: "/experiences" },
          { label: experience.title!, href: `/experiences/${experience.id}` },
        ]}
      />

      {/* Experience Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h1 className="text-4xl font-bold">{experience.title}</h1>

          {/* Current position indicator */}
          {isCurrent && (
            <Badge variant="default" className="bg-primary text-primary-foreground ml-2">
              Current
            </Badge>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center">
            <Building2 className="mr-2 h-5 w-5 text-primary/70" />
            <span className="text-xl font-medium">{experience.company}</span>

            {/* Location if available */}
            {(experience as ExtendedExperience).location && (
              <div className="flex items-center ml-3 text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{(experience as ExtendedExperience).location}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{experience.start} - {experience.end}</span>
            </div>

            <div className="flex items-center text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>{experience.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content - Left Side */}
        <div className="flex flex-col w-full md:w-2/3">
          {/* Experience Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary/70" />
              Summary
            </h2>
            <p className="text-lg text-muted-foreground">{experience.excerpt}</p>
          </div>

          <Separator className="my-8" />

          {/* Experience Content */}
          <ExperienceContent experience={experience} />

          {/* Navigation between experiences */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/experiences" className="flex items-center">
                  <GanttChart className="mr-2 h-4 w-4" />
                  All Experiences
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar - Right Side */}
        <div className="w-full md:w-1/3 space-y-8">
          {/* Technologies Used */}
          {experience.technologies && Array.isArray(experience.technologies) && experience.technologies.length > 0 && (
            <div className="bg-secondary/30 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Layers className="mr-2 h-5 w-5 text-primary/70" />
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <Badge
                    key={(tech as Skill).id}
                    variant="outline"
                    className={`px-3 py-1.5 text-sm ${isCurrent ? "border-primary/30" : "border-secondary/50"}`}
                  >
                    {(tech as Skill).title}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Experience Details */}
          <div className="bg-secondary/30 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Milestone className="mr-2 h-5 w-5 text-primary/70" />
              Experience Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company:</span>
                <span className="font-medium">{experience.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Position:</span>
                <span className="font-medium">{experience.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{experience.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Period:</span>
                <span className="font-medium">{experience.start} - {experience.end}</span>
              </div>
              {(experience as ExtendedExperience).location && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{(experience as ExtendedExperience).location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Key Achievements */}
          {(experience as ExtendedExperience).achievements && Array.isArray((experience as ExtendedExperience).achievements) && (experience as ExtendedExperience).achievements!.length > 0 && (
            <div className="bg-secondary/30 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary/70" />
                Key Achievements
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                {(experience as ExtendedExperience).achievements!.map((achievement: string, index: number) => (
                  <li key={index} className="text-muted-foreground">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Experiences */}
          {relatedExperiences && relatedExperiences.length > 0 && (
            <div className="bg-secondary/30 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <GanttChart className="mr-2 h-5 w-5 text-primary/70" />
                Related Experiences
              </h3>
              <div className="space-y-4">
                {relatedExperiences.map((relatedExperience) => (
                  <div key={relatedExperience.id} className="group">
                    <Link href={`/experiences/${relatedExperience.id}`} className="block hover:bg-secondary/50 p-3 rounded-lg transition-colors">
                      <h4 className="font-medium group-hover:text-primary transition-colors">{relatedExperience.title}</h4>
                      <p className="text-sm text-muted-foreground">{relatedExperience.company}</p>
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
