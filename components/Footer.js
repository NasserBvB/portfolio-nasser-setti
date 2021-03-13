import { Flex, IconButton, Link } from '@chakra-ui/core';
import React from 'react';


const Footer = () => (
  <Flex align="center" mb={4} justifyContent='center' alignItems='center'>
      <Link href="https://twitter.com/NBvBJS" title="Twitter" isExternal>
        <IconButton
          aria-label="Twitter"
          icon="twitter"
          size="lg"
          color="gray.500"
          variant="ghost"
        />
      </Link>
      <Link href="https://github.com/NasserBvB" title="GitHub" isExternal>
        <IconButton
          aria-label="GitHub"
          icon="github"
          size="lg"
          color="gray.500"
          variant="ghost"
        />
      </Link>
      <Link
        href="https://www.linkedin.com/in/abdennasser-es-sati-a7781a122/"
        title="LinkedIn"
        isExternal
      >
        <IconButton
          aria-label="LinkedIn"
          icon="linkedin"
          size="lg"
          color="gray.500"
          variant="ghost"
        />
      </Link>
      <Link href="mailto:me@leerob.io" title="Email" isExternal>
        <IconButton
          aria-label="Email"
          icon="mail"
          size="lg"
          color="gray.500"
          variant="ghost"
        />
    </Link>
  </Flex>
);

export default Footer;
