import { Divider, Heading, Image, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'

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
                <Image src='#' alt='Header image' />
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