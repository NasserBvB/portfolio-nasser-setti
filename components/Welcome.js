import { Stack, Heading, Box, PseudoBox, SimpleGrid, Image, Text, Link, useColorMode } from "@chakra-ui/core";
import { Education, Projects, Experience } from "../lib/util";


export default function Welcome() {
    const { colorMode } = useColorMode();
    const bg = { light: "white", dark: "gray.800" };
    const color = { light: "black", dark: "white" };
    return (
        <>
            <SimpleGrid minChildWidth="120px" spacing="80px" marginBottom="40px" display="flex" justifyContent="space-around" >
                <Box>
                    <PseudoBox role="group" maxW="sm" overflow="hidden" p={12} cursor="pointer" bg={bg[colorMode]} boxShadow="md" borderRadius="50px">
                        <Stack spacing={8} maxWidth="700px">
                            <PseudoBox fontWeight="bold" fontSize="sm" mb={20} color={color[colorMode]} >
                                <Image rounded="full" size="100px" src="/nasser.jpg" alt="Nasser Setti" />
                                <Heading as="h4" size="md" color={color[colorMode]}>Hey, I’m Nasser Setti</Heading>
                            </PseudoBox>
                            <PseudoBox color={color[colorMode]} mb={8} >
                                <Text fontSize="lg">
                                    I’m a developer. I work at 4D as a Studies and development engineer.
                                    You’ve found my personal slice of the internet – everything you want to know and more is here.
                                </Text>
                            </PseudoBox>
                        </Stack>
                    </PseudoBox>
                </Box>
            </SimpleGrid>
            <SimpleGrid minChildWidth="120px" spacing="30px" justifyContent="center" display="flex" flexWrap="wrap">
                <Box>
                    <Link href="#exp">
                        <a>
                            <PseudoBox role="group" maxW="sm" overflow="hidden" p={8} cursor="pointer" bg={bg[colorMode]} boxShadow="md" borderRadius="50px" >
                                <PseudoBox fontWeight="bold" fontSize="lg" mb={1} color={color[colorMode]} >
                                    Experiences
                                </PseudoBox>
                            </PseudoBox>
                        </a>
                    </Link>
                </Box>
                <Box>
                    <Link href="#edu">
                        <a>
                            <PseudoBox role="group" maxW="sm" overflow="hidden" p={8} cursor="pointer" bg={bg[colorMode]} boxShadow="md" borderRadius="50px" >
                                <PseudoBox fontWeight="bold" fontSize="lg" mb={1} color={color[colorMode]} >
                                    Education
                                </PseudoBox>
                            </PseudoBox>
                        </a>
                    </Link>
                </Box>
                <Box>
                    <Link href="#pro">
                        <a>

                            <PseudoBox role="group" maxW="sm" overflow="hidden" p={8} cursor="pointer" bg={bg[colorMode]} boxShadow="md" borderRadius="50px" >
                                <PseudoBox fontWeight="bold" fontSize="lg" mb={1} color={color[colorMode]} >
                                    Projects
                        </PseudoBox>
                            </PseudoBox>
                        </a>
                    </Link>

                </Box>
            </SimpleGrid>
        </>
    )
}