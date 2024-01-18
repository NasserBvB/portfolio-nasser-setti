import Image from "next/image";
import Link from "next/link";
import experiences from "./experiences.json";
import projects from "./projects.json";
import Experience, { IExperience } from "../components/experience";
import Project, { IProject } from "../components/project";

const containerCN = "flex flex-col min-h-screen container mx-auto";
const sectionCN = "flex flex-col gap-4 mt-6";
const h1CN = "text-2xl font-bold uppercase";
const h2CN = "text-lg font-semibold";
const pCN = "text-sm font-thin";

export default function Home() {
  return (
    <main className={containerCN}>
      <section className={sectionCN}>
        <h1 className={h1CN}>Abdennasser Es-sati </h1> <span>AKA Nasser</span>
        <h2 className={h2CN}>Full-stack developer</h2>
        <p className={pCN}>
          I am a computer engineer with a great passion for programming.
        </p>
        <div className="flex flex-wrap gap-6">
          <Link
            aria-label="Linkedin Profile"
            href="https://www.linkedin.com/in/nasser-setti/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              title="Linkedin"
              width={25}
              height={25}
              src="/linkedin.png"
              alt="Linkedin"
            />
          </Link>

          <Link
            aria-label="Github Profile"
            href="https://github.com/NasserBvB"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              width={25}
              height={25}
              src="/github.png"
              alt="GitHub"
              title="GitHub"
            />
          </Link>

          <Link
            aria-label="Twitter Profile"
            href="https://twitter.com/NBvBJS"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              width={25}
              height={25}
              src="/twitter-icon.png"
              alt="Twitter"
              title="Twitter"
            />
          </Link>
          <Link
            aria-label="Full Résumé"
            className="flex gap-4 items-center"
            href="https://asset.cloudinary.com/nasser-ecommerce/f1ec101ba340724b15990b6ba816ab46"
            target="_blank"
            rel="noreferrer"
            title="Full Résumé"
          >
            <span>Full Résumé</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 rotate-[135deg] bg-opacity-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
        </div>
      </section>

      <section className={sectionCN}>
        <h2 className={`${h2CN} uppercase`}>About</h2>
        <p className={pCN}>
          I am passionate about delivering solutions that add to people&apos;s
          lives and at the same time challenge me. Improved my skills as a
          Front-End and Back-End developer
        </p>
        <p className={pCN}>
          I develop websites and applications using HTML, CSS, and JavaScript. I
          am familiar with developing layouts that provide me. I&apos;m always
          improving myself with each project they put in my hands.
        </p>
        <p className={pCN}>
          I am a dedicated person who pursues his dreams, hardworking and
          results oriented, I always seek to achieve my best version.
        </p>
      </section>

      <section className={sectionCN}>
        <h2 className={`${h2CN} uppercase`}>Experience</h2>
        {/* 
          @TODO: Add experiences
        */}
        <div>
          {(experiences as unknown as IExperience[]).map((experience) => (
            <Experience key={experience.title} experience={experience} />
          ))}
        </div>
      </section>

      <section className={sectionCN}>
        <h2 className={`${h2CN} uppercase`}>Projects</h2>
        {/* 
          @TODO: Add projects
        */}
        <div>
          {(projects as unknown as IProject[]).map((project) => (
            <Project key={project.title} project={project} />
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-center">
        <p className="text-sm font-thin">Made with ❤️ by Nasser</p>
        <p className="text-sm font-thin">
          Copyright © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
