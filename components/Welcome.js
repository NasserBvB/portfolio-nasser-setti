import { Stack, Heading, Box, PseudoBox, SimpleGrid, Image, Text, Link } from "@chakra-ui/core";
import { Education, Projects, Experience } from "../lib/util";


export default function Welcome() {
    return (
        <>
            <SimpleGrid minChildWidth="120px" spacing="80px" marginBottom="40px" display="flex" justifyContent="space-around" >
                <Box>
                    <PseudoBox role="group" maxW="sm" overflow="hidden" p={12} cursor="pointer" bg="white" boxShadow="md" borderRadius="50px">
                        <Stack spacing={8} maxWidth="700px">
                            <PseudoBox fontWeight="bold" fontSize="sm" mb={20} color="gray.900" >
                                <Image rounded="full" size="100px" src="/nasser.jpg" alt="Nasser Setti" />
                                <Heading as="h4" size="md">Hey, I’m Nasser Setti</Heading>
                            </PseudoBox>
                            <PseudoBox color="gray.700" mb={8} >
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
                    <PseudoBox role="group" maxW="sm" overflow="hidden" p={8} cursor="pointer" bg="white" boxShadow="md" borderRadius="50px" >
                        <PseudoBox fontWeight="bold" fontSize="lg" mb={1} color="gray.900" >
                            Experiences
                        </PseudoBox>
                        <PseudoBox color="gray.700" mb={2} >
                        <Link href="#exp" color="teal.500">See more</Link>

                        </PseudoBox>
                    </PseudoBox>
                </Box>
                <Box>
                    <PseudoBox role="group" maxW="sm" overflow="hidden" p={8} cursor="pointer" bg="white" boxShadow="md" borderRadius="50px" >
                        <PseudoBox fontWeight="bold" fontSize="lg" mb={1} color="gray.900" >
                            Education
                        </PseudoBox>
                        <PseudoBox color="gray.700" mb={2}>
                        <Link href="#edu" color="teal.500">See more</Link>
                        </PseudoBox>
                    </PseudoBox>
                </Box>
                <Box>
                    <PseudoBox role="group" maxW="sm" overflow="hidden" p={8} cursor="pointer" bg="white" boxShadow="md" borderRadius="50px" >
                        <PseudoBox fontWeight="bold" fontSize="lg" mb={1} color="gray.900" >
                            Projects
                        </PseudoBox>
                        <PseudoBox color="gray.700" mb={2} >
                            <Link href="#pro" color="teal.500">See more</Link>
                        </PseudoBox>
                    </PseudoBox>
                </Box>
            </SimpleGrid>
        </>
    )
}