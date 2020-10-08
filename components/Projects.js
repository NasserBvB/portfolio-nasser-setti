import { Stack } from "@chakra-ui/core";
import { Projects } from "../lib/util";
import ProjectCard from "./ProjectCard";
export default function Project() {
    return (
        <Stack >
            {
                Projects && Projects.map((item, index) => {
                    return <ProjectCard title={item.name} description={item.name} icon="github" key={index}/>
                })
            }
        </Stack>
    )
}