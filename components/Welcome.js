import { Stack, Heading, Box, PseudoBox, SimpleGrid, Image, Text, Link, useColorMode } from "@chakra-ui/core";


export default function Welcome() {
    const { colorMode } = useColorMode();
    const bg = { light: "white", dark: "gray.800" };
    const color = { light: "black", dark: "white" };
    return (
        <div style={{width: "100%","display":"flex", "justifyContent": "center", height: "90vh"}}>
                <PseudoBox role="group" maxW="xl" height="80%" overflow="hidden" p={2} cursor="pointer" bg={bg[colorMode]} boxShadow="lg" borderRadius="50px" padding="150px" >
                    <Stack spacing={8} maxWidth="700px">
                        <PseudoBox fontWeight="bold" fontSize="sm" mb={20} color={color[colorMode]} >
                            <Image rounded="full" size="150px" src="/nasser.jpg" alt="Nasser Setti" />
                            <Heading as="h4" size="md" color={color[colorMode]}>Hey, I’m Abdennasser Es-sati (aka Nasser)</Heading>
                        </PseudoBox>
                        <PseudoBox color={color[colorMode]} mb={8} >
                            <Text fontSize="lg">
                                I’m a developer. I work at 4D as a Studies and development engineer.
                                You’ve found my personal slice of the internet – everything you want to know and more is here.
                                </Text>
                        </PseudoBox>
                    </Stack>
                </PseudoBox>
        </div>
    )
}