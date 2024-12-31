import Image from "next/image";
import Link from "next/link";
import { Media, Project, Skill } from "../../payload-types";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ProjectCard = ({ project }: { project: Project }) => {
  const projectIcon = project.icon as Media;
  const icon = projectIcon;
  return (
    <Card key={project.id}>
      <CardHeader>
        <CardTitle className="line-clamp-2">{project.title}</CardTitle>
        <div className="flex gap-2">
          {(project.technologies as Skill[]).slice(0, 3).map((item) => {
            return <Badge key={item.id}>{item.title}</Badge>;
          })}
        </div>
      </CardHeader>
      <CardContent className="grow">
        {icon && (
          <div className="flex relative rounded-md overflow-hidden my-4">
            <Image
              src={icon.url!}
              alt={`${project.title} thumbnail`}
              className="grow max-h-64 aspect-auto object-cover"
              width={150}
              height={150}
            />
          </div>
        )}
        <p className="line-clamp-4">{project.excerpt}</p>
      </CardContent>
      <CardFooter>
        <div className="grow flex justify-between items-center">
          <span className="font-bold text-lg text-muted-foreground">
            {project.company}
          </span>
          <Link
            href={`/projects/${project.id}`}
            className="text-primary hover:underline"
          >
            Explore More
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
