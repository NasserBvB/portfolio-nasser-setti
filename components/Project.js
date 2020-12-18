import { Stack, Text } from "@chakra-ui/core";
import { Projects } from "../lib/util";
import ProjectCard from "./ProjectCard";
import { YearDivider } from "./Timeline";
export default function Project() {
    return (
        <>
            <div style={{ padding: "10px" }}>
                <Text fontWeight="medium">My Projects: </Text>
            </div>
            <YearDivider />
            <Stack display="flex" flexWrap="wrap" justifyContent="space-around">

                {
                    Projects && Projects.map((item, index) => {
                        return (
                            <>
                                <ProjectCard title={item.name} description={item.description} icon="github" key={index} />
                            </>
                        )
                    })
                }
            </Stack>
        </>
    )
}