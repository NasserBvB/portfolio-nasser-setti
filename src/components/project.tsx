import React from "react";
import { Tech } from "./tech";
import Link from "next/link";

export interface IProject {
  title: string;
  abstract: string;
  description: string;
  technologies: string[];
  links: {
    github?: string;
    website?: string;
    label: string;
  }[];
}

interface IProps {
  project: IProject;
}

export default function Project({ project }: IProps) {
  return (
    <div className="col-span-1 md:col-span-8 flex flex-col gap-2 my-8">
      {project?.links?.length > 0 ? (
        <Link
          key={project?.links?.at(0)?.label}
          href={
            project?.links?.at(0)?.github ||
            project?.links?.at(0)?.website ||
            "#"
          }
          aria-label={project.title}
          className="flex gap-4 items-center text-teal-400 hover:underline text-lg font-semibold"
        >
          {project.title}
        </Link>
      ) : (
        <h3 className="text-lg font-semibold">{project.title}</h3>
      )}
      <p className="text-sm">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Tech key={tech} tech={tech} />
        ))}
      </div>
    </div>
  );
}
