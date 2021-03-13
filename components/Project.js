import { Stack, Text } from "@chakra-ui/core";
import React from "react";
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import ProjectCard from "./ProjectCard";
import { YearDivider } from "./Timeline";

export default function Project() {
    const { data } = useSWR('/api/projects', fetcher);
    return (
        <>
            <div style={{ padding: "10px" }}>
                <Text fontWeight="medium">My Projects: </Text>
            </div>
            <YearDivider />
            <Stack display="flex" flexWrap="wrap" justifyContent="space-around">

                {
                    data && data.map((item, index) => {
                        return (
                            <ProjectCard title={item.name} id={item.id} description={item.description} href={item.href} icon="github" key={item.id} />
                        )
                    })
                }
            </Stack>
        </>
    )
}