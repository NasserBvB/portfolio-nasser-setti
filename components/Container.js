import { Box, Button, Flex, IconButton, useColorMode } from '@chakra-ui/core';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import React from 'react';
import Footer from './Footer';


const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const Container = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = {
    light: 'white',
    dark: 'gray.900'
  };
  const primarytextColor = {
    light: 'black',
    dark: 'white'
  };
  const navBgColor = {
    light: 'rgba(255, 255, 255, 0.8)',
    dark: 'rgba(23, 25, 35, 0.8)'
  };

  return (
    <>
      <StickyNav
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="900px"
        width="100%"
        bg={navBgColor[colorMode]}
        as="nav"
        p={8}
        mt={[0, 8]}
        mb={8}
        mx="auto"
        height="10vh"
      >
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'dark' ? 'sun' : 'moon'}
          onClick={toggleColorMode}
        />
        <Box display="flex" justifyContent="space-between">
          <NextLink href="/" passHref  >
            <Button as="a" variant="ghost" p={[1, 4]} className="custom-nav-button">
              Home
            </Button>
          </NextLink>
          <NextLink href="#exp" passHref>
            <Button as="a" variant="ghost" p={[1, 4]} className="custom-nav-button">
              Timeline
            </Button>
          </NextLink>

          <NextLink href="/projects" passHref>
            <Button as="a" variant="ghost" p={[1, 4]} className="custom-nav-button">
              Projects
            </Button>
          </NextLink>

        </Box>
      </StickyNav>
      <Flex
        as="main"
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
        maxWidth="900px"
        width="100%"
        bg={navBgColor[colorMode]}
        as="nav"
        p={8}
        mt={[0, 8]}
        mb={8}        mt={[0, 8]}
        mb={8}
        mx="auto"
      >
        {children}
        <Footer />
      </Flex>
    </>
  );
};

export default Container;
