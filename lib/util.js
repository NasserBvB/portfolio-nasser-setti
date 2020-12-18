import Education from "../data/education.json";
import Experience from "../data/experience.json";
import { Projects } from "../data/projects";

export const fetchExperienceData = () => {
    return Experience;
}
export const fetchEducationData = () => {
    return Education;
}
export const fetchProjectData = () => {
    return Projects
}

export {
    Education, Experience, Projects
};
