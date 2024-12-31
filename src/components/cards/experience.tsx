import Link from "next/link";
import { Experience } from "../../payload-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <Card key={experience.id}>
      <CardHeader>
        <CardTitle className="line-clamp-2">{experience.title}</CardTitle>
        <CardDescription>
          {experience.company} | {experience.start} - {experience.end}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-5">
          {experience.excerpt}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex grow justify-end items-center">
          <Link
            href={`/experiences/${experience.id}`}
            className="text-primary hover:underline"
          >
            See More
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExperienceCard;
