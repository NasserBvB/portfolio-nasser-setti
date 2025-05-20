"use client"

import Link from "next/link";
import { Experience, Skill } from "../../payload-types";
import { cn } from "../../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight, Briefcase, Building2, Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";

const ExperienceCard = ({ experience, featured = false }: { experience: Experience; featured?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine if this is a current position
  const isCurrent = experience.end?.toLowerCase() === 'present' || experience.end?.toLowerCase() === 'current';

  return (
    <Card
      key={experience.id}
      className={cn(
        "overflow-hidden flex flex-col transition-all duration-300 group relative border-primary/10",
        featured ? "md:flex-row md:h-[280px]" : "",
        isHovered && "shadow-xl transform -translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline indicator */}
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full transition-colors",
        isCurrent ? "bg-primary/60 group-hover:bg-primary" : "bg-primary/30 group-hover:bg-primary/70"
      )}></div>

      {/* Gradient overlay for hover effect */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 z-10 pointer-events-none",
        isHovered && "opacity-100"
      )} />

      {/* Current position indicator */}
      {isCurrent && (
        <div className="absolute top-3 right-3 z-20">
          <Badge variant="default" className="bg-primary text-primary-foreground px-2 py-1 text-xs">
            Current
          </Badge>
        </div>
      )}

      <div className={cn(
        "flex flex-col w-full",
        featured && "md:w-full"
      )}>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-2 mb-2">
            {/* Company and location row */}
            <div className="flex flex-wrap items-center text-sm">
              <Building2 className="mr-2 h-4 w-4 text-primary/70 flex-shrink-0" />
              <span className="font-medium text-base truncate">{experience.company}</span>

              {/* Location if available */}
              {(experience as any).location && (
                <div className="flex items-center ml-2 text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{(experience as any).location}</span>
                </div>
              )}
            </div>

            {/* Date and duration row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3 flex-shrink-0" />
                <span className="whitespace-nowrap">{experience.start} - {experience.end}</span>
              </div>

              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3 flex-shrink-0" />
                <span className="whitespace-nowrap">{experience.duration}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Briefcase className={cn(
              "h-5 w-5 mt-1 flex-shrink-0",
              isCurrent ? "text-primary" : "text-primary/70"
            )} />
            <div className="flex-1 min-w-0">
              <CardTitle
                className={cn(
                  "line-clamp-2 transition-colors break-words",
                  isHovered ? "text-primary" : "text-foreground",
                  featured ? "text-xl" : "text-base sm:text-lg"
                )}
              >
                {experience.title}
              </CardTitle>

              {/* Responsibilities or achievements indicator */}
              {featured && (
                <CardDescription className="mt-2">
                  {(experience as any).responsibilities ? "Key Responsibilities" : "Key Achievements"}
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="grow p-4 sm:p-6 pt-0">
          <p className={cn(
            "text-muted-foreground mb-4",
            featured ? "line-clamp-4" : "line-clamp-3"
          )}>
            {experience.excerpt}
          </p>

          {experience.technologies && Array.isArray(experience.technologies) && experience.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {(experience.technologies as Skill[]).slice(0, featured ? 6 : 3).map((tech) => (
                <Badge
                  key={tech.id}
                  variant="secondary"
                  className={cn(
                    "text-xs",
                    isCurrent ? "bg-primary/10 hover:bg-primary/20" : "bg-secondary/20 hover:bg-secondary/30"
                  )}
                >
                  {tech.title}
                </Badge>
              ))}
              {(experience.technologies as Skill[]).length > (featured ? 6 : 3) && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs",
                    isCurrent ? "bg-primary/5" : "bg-secondary/10"
                  )}
                >
                  +{(experience.technologies as Skill[]).length - (featured ? 6 : 3)} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 sm:p-6 pt-0">
          <Link
            href={`/experiences/${experience.id}`}
            className={cn(
              "text-primary font-medium flex items-center transition-all",
              isHovered ? "translate-x-1" : ""
            )}
          >
            View Details
            <ArrowRight className={cn(
              "ml-1 h-4 w-4 transition-transform",
              isHovered && "transform translate-x-1"
            )} />
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ExperienceCard;
