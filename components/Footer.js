import React from 'react';
import NextLink from 'next/link';
import { Flex, Link, IconButton } from '@chakra-ui/core';


const Footer = () => (
  <Flex align="center" mb={4} direction="column">
    <div>
      <NextLink href="/uses" passHref>
        <Link
          fontSize="sm"
          color="gray.500"
          minWidth="100px"
          mr={2}
          title="Uses"
        >
          /uses
        </Link>
      </NextLink>
      <Link
        fontSize="sm"
        color="gray.500"
        minWidth="100px"
        mr={2}
        href="https://photos.leerob.io/"
        title="Photos"
        isExternal
      >
        /photos
      </Link>
      <NextLink href="/newsletter" passHref>
        <Link
          fontSize="sm"
          color="gray.500"
          minWidth="100px"
          mr={2}
          title="Newsletter"
        >
          /newsletter
        </Link>
      </NextLink>
    </div>
  </Flex>
);

export default Footer;
