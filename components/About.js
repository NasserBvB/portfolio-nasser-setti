import React from 'react';
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Link,
  Icon
} from '@chakra-ui/core';

import { CustomLink } from "../components/MDXComponents";
const url = 'https://leerob.io/about';
const title = 'About Me – Lee Robinson';

const About = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  return (
    <Stack
      as="main"
      spacing={8}
      justifyContent="center"
      alignItems="flex-start"
      m="0 auto 4rem auto"
      maxWidth="700px"
    >
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        maxWidth="700px"
      >
        <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
          About Me
            </Heading>
      </Flex>
    </Stack>
  );
};

export default About;
