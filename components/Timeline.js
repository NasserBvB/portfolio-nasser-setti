import {
  Button,




  Divider, Flex, Heading,





  Icon, List,
  ListItem,

  Stack, Text, useColorMode
} from '@chakra-ui/core';
import React, { useState } from 'react';

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
      <TimelineStep title="Still EHTP  🎓">
        In this year it was just the electrical studies and some of the programming competitions. I already studied some intersting tools like Latex and R language.
      </TimelineStep>
    </List>
    <YearDivider />

    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2015
    </Heading>
    <List>
      <TimelineStep title="Started at EHTP 🔥">
        My interest in getting more logic, algorithms, skills made me forget to choose which school and which field I should take .
        I started my electrical studies in Hassania High School of Public Works ( EHTP / HHSPW).
        I started realizing what goes wrong that let me choose eletrical engineering over diving into the IT world.
        I participated into so much programming competitions such as MCPC(Moroccan Collegiate Programming Contest ). The C++ was the weapon because it was the only language that we studied in the electrical field

      </TimelineStep>
    </List>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2014
    </Heading>
    <List>
      <TimelineStep title="Preparatory classes">
        After geeting a good  grade in my baccalaureate. I integrated the preparatory classes where I discovered a new subject that admired a lot. Making great things with an optimal amount of energy.
        Logic, Maths and Coding . I studied a huge amount of theorems, algorithms, mathematical problems . The thing that sharpened my brain skills.
      </TimelineStep>
    </List>
    <YearDivider />
    <Heading as="h3" size="lg" fontWeight="bold" mb={4} letterSpacing="tighter">
      2013
    </Heading>
    <List>
      <TimelineStep title="Graduated High School">
        I had my baccalaureate in this year where I was passionated by mathematics and proving things.
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
          After 9 months in Weenko. I joined 4D where I discovered new challenges . I studied new technologies.
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
        <TimelineStep title="Electrical Engineer  ✨">
          I graduated from EHTP in this year . While I was preparing my last project on the electrical field, I discovered Angular.
          I tried to understand it and try to build something with it. I prepare my CV and apply .
          I worked at Weenko (Startup in Rabat) after one week of the graduation day. I found myself in the professional world , where i should use my Angular skills .
          I studied the Node.js after realizing that I had to work on the backend as well . It was my first Node.js project.
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
