import React, { useState } from 'react';
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Button,
  List,
  ListItem,
  Icon,
  Stack,
  Divider
} from '@chakra-ui/core';

const YearDivider = () => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: 'gray.200',
    dark: 'gray.600'
  };

  return <Divider borderColor={borderColor[colorMode]} my={8} w="100%" />;
};

const TimelineStep = ({ title, children }) => {
  const { colorMode } = useColorMode();
  const color = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  return (
    <ListItem>
      <Stack ml={2} mb={4}>
        <Flex align="center">
          <Icon name="check-circle" mr={2} color="whatsapp.500" />
          <Text fontWeight="medium">{title}</Text>
        </Flex>
        <Text color={color[colorMode]} ml={6}>
          {children}
        </Text>
      </Stack>
    </ListItem>
  );
};

const FullTimeline = () => (
  <>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2018
    </Heading>
    <List>
      <TimelineStep title="Ba9ii  f EHTP  🎓">
        MNANAUK HHHHHHHHHHH
      </TimelineStep>
    </List>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2017
    </Heading>
    <List>
      <TimelineStep title="Ba9ii  f EHTP  🎓">
        MZZAAAAAAAL f EHTP hhhhhhhhhhh
      </TimelineStep>
    </List>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2016
    </Heading>
    <List>
      <TimelineStep title="Ba9ii  f EHTP  🎓">
        hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
      </TimelineStep>
    </List>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2015
    </Heading>
    <List>
      <TimelineStep title="Started at EHTP 🔥">
        hhhhh hhhhhhhhh hhhhhhhhhh hhhhhhhhhhhhhhhhhh
      </TimelineStep>
    </List>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2014
    </Heading>
    <List>
      <TimelineStep title="Preparatory classes">
        HAD L3AMM KANAT 3JBANI L9RAYA hhhhhhhhh
      </TimelineStep>
    </List>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2013
    </Heading>
    <List>
      <TimelineStep title="Graduated High School">
        hlejrgejmkrjg rkfkjrz reggkljlmkerg erlgjkj.
      </TimelineStep>
    </List>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      1995
    </Heading>
    <List>
      <TimelineStep title="Born 👶🏼🍼" />
    </List>
  </>
);

const Timeline = () => {
  const [isShowingFullTimeline, showFullTimeline] = useState(false);

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      maxWidth="700px"
      mt={8}
    >
      <Heading letterSpacing="tight" mb={4} size="xl" fontWeight="bold">
        Timeline
      </Heading>
      <Heading
        as="h3"
        size="lg"
        fontWeight="bold"
        mb={4}
        letterSpacing="tighter"
      >
        2020
      </Heading>
      <List>
        <TimelineStep title="Joined 4D">
          Finally hhhhhhhhhhh
        </TimelineStep>
      </List>
      <YearDivider />
      <Heading
        as="h3"
        size="lg"
        fontWeight="bold"
        mb={4}
        letterSpacing="tighter"
      >
        2019
      </Heading>
      <List>
        <TimelineStep title="Software Engineer III ✨">
          Kont knsalli f weenko
        </TimelineStep>
      </List>
      {isShowingFullTimeline ? (
        <FullTimeline />
      ) : (
          <Button
            my={4}
            mx="auto"
            fontWeight="medium"
            rightIcon="chevron-down"
            variant="ghost"
            onClick={() => showFullTimeline(true)}
          >
            See More
          </Button>
        )}
    </Flex>
  );
};

export default Timeline;
