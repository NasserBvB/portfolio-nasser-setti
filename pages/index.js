import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Container from '../components/Container';
import { Stack, Heading, Box, List, ListItem, PseudoBox, SimpleGrid, Image, Text } from "@chakra-ui/core";

import { Education, Projects, Experience } from "../lib/util";

export default function Home() {
  return (
    <Container className={styles.container}>

      <Head>
        <title>Nasser Setti</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <SimpleGrid minChildWidth="120px" spacing="80px" marginBottom="40px" display="flex" justifyContent="space-around">
        <Box >
          <PseudoBox role="group" maxW="sm" overflow="hidden" p={12} cursor="pointer" bg="white" boxShadow="md" _hover={{ bg: "blue.100" }} >
            <Stack spacing={8} maxWidth="700px">
              <PseudoBox fontWeight="bold" fontSize="sm" mb={20} color="gray.900" _groupHover={{ color: "white" }}>
                <Image rounded="full" size="100px" src="/nasser.jpg" alt="Nasser Setti" />
                <Heading as="h4" size="md">Hey, I’m Nasser Setti</Heading>
              </PseudoBox>
              <PseudoBox color="gray.700" mb={8} _groupHover={{ color: "white" }}>
                <Text fontSize="lg">
                  I’m a developer. I work at 4D as a Studies and development engineer.
                  You’ve found my personal slice of the internet – everything you want to know and more is here.
            </Text>
              </PseudoBox>
            </Stack>
          </PseudoBox>
        </Box>
      </SimpleGrid>
      <SimpleGrid minChildWidth="120px" spacing="40px">
        <Box  >
          <PseudoBox role="group" maxW="sm" overflow="hidden" p={8} cursor="pointer" bg="white" boxShadow="md" _hover={{ bg: "blue.500" }} >
            <PseudoBox fontWeight="bold" fontSize="lg" mb={1} color="gray.900" _groupHover={{ color: "white" }}>
              Experiences
            </PseudoBox>
            <PseudoBox color="gray.700" mb={2} _groupHover={{ color: "white" }}>
              Discover my wonderful experiences .
            </PseudoBox>
          </PseudoBox>
        </Box>
        <Box  >
          <PseudoBox role="group" maxW="sm" overflow="hidden" p={8} cursor="pointer" bg="white" boxShadow="md" _hover={{ bg: "blue.500" }} >
            <PseudoBox fontWeight="bold" fontSize="lg" mb={1} color="gray.900" _groupHover={{ color: "white" }}>
              Education
            </PseudoBox>
            <PseudoBox color="gray.700" mb={2} _groupHover={{ color: "white" }}>
              Explore my career.
            </PseudoBox>
          </PseudoBox>
        </Box>
        <Box  >
          <PseudoBox role="group" maxW="sm" overflow="hidden" p={8} cursor="pointer" bg="white" boxShadow="md" _hover={{ bg: "blue.500" }} >
            <PseudoBox fontWeight="bold" fontSize="lg" mb={1} color="gray.900" _groupHover={{ color: "white" }}>
              Projects
            </PseudoBox>
            <PseudoBox color="gray.700" mb={2} _groupHover={{ color: "white" }}>
              Discover my wonderful experiences .
            </PseudoBox>
          </PseudoBox>
        </Box>
      </SimpleGrid>
    </Container>
  )
}
