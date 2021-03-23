import { Divider, Heading, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { IconAngular, IconIonic, IconMongoDB, IconMSSQL, IconMYSQL, IconNodejs, IconReact, IconSpringBoot, IconTypescript, IconWSO2 } from "./Icons";
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border: 1px solid #666666;
    border-radius: 10px;
    padding: 16px;
`
const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const TechnologiesWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const BodyWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const FooterWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

export default function ProjectPage({ project }) {
    return (
        <Wrapper>
            <HeaderWrapper>
                <Heading
                    as="h4"
                    size="md"
                    fontWeight="bold"
                    mb={4}
                    letterSpacing="tighter"
                >
                    {project.name}
                </Heading>
                <TechnologiesWrapper>
                    {
                        project.techs && project.techs.map(item => {
                            switch (item)
                            {
                                case "React":
                                    return <IconReact key={item} />
                                case "Nodejs":
                                    return <IconNodejs key={item} />
                                case "Angular":
                                    return <IconAngular key={item} />
                                case "MSSQL":
                                    return <IconMSSQL key={item} />
                                case "MYSQL":
                                    return <IconMYSQL key={item} />
                                case "MongoDB":
                                    return <IconMongoDB key={item} />
                                case "SpringBoot":
                                    return <IconSpringBoot key={item} />
                                case "Ionic":
                                    return <IconIonic key={item} />
                                case "WSO2":
                                    return <IconWSO2 key={item} />
                                case "Typescript":
                                    return <IconTypescript key={item} />

                                default:
                                    return null;
                            }
                        })
                    }
                </TechnologiesWrapper>
            </HeaderWrapper>
            <Divider />
            <BodyWrapper>
                <Text>
                    {project.description}
                </Text>
            </BodyWrapper>
            <Divider />
            <FooterWrapper>Footer</FooterWrapper>
        </Wrapper>
    )
}