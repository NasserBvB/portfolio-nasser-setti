import Head from 'next/head'
import { Badge, Icon, Link, Flex } from "@chakra-ui/core";

import styles from '../styles/Home.module.css'
import Container from '../components/Container';
import Welcome from "../components/Welcome";
import Projects from '../components/Projects'
import Timeline from '../components/Timeline';
export default function Home() {
  return (
    <Container className={styles.container}>

      <Head>
        <title>Nasser Setti</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Welcome />
      <div id="exp" style={{"paddingTop": "100px"}}>
        <Timeline />
      </div>
    </Container>
    
  )
}
