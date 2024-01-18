import Link from "next/link";
import React from "react";
import { Tech } from "./tech";

export interface IExperience {
  title: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  links: {
    github?: string;
    website?: string;
    label: string;
  }[];
}

interface IProps {
  experience: IExperience;
}

export default function Experience({ experience }: IProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 my-8">
      <span className="font-light col-span-1 md:col-span-4">
        {experience.startDate} - {experience.endDate}
      </span>
      <div className="col-span-1 md:col-span-8 flex flex-col gap-2">
        {experience?.links?.length > 0 ? (
          <Link
            key={experience?.links?.at(0)?.label}
            href={
              experience?.links?.at(0)?.github ||
              experience?.links?.at(0)?.website ||
              "#"
            }
            aria-label={experience.title}
            className="text-lg font-semibold flex gap-4 items-center text-teal-400 hover:underline"
          >
            {experience.title}
          </Link>
        ) : (
          <h3 className="text-lg font-semibold">{experience.title}</h3>
        )}
        <span className="text-sm font-medium opacity-80">{experience.role}</span>
        <span className="text-sm font-medium opacity-75">{experience.company}</span>
        <p className="text-sm font-light opacity-65">
          {experience.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <Tech key={tech} tech={tech} />
          ))}
        </div>
      </div>
      <hr className="col-span-full" />
    </div>
  );
}
