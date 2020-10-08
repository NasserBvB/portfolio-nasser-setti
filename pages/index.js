import Head from 'next/head'
import { Badge, Icon, Link, Flex } from "@chakra-ui/core";

import styles from '../styles/Home.module.css'
import Container from '../components/Container';
import Welcome from "../components/Welcome";
import Projects from '../components/Projects'
export default function Home() {
  return (
    <Container className={styles.container}>

      <Head>
        <title>Nasser Setti</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Welcome />
      <Flex align="center" mb={8} direction="column">
        <div id="pro" style={{ "paddingTop": "100px" }} >
          <Link href="#">
            <a>
              <Badge variant="outline" variantColor="purple">
                Projects
            </Badge> <Icon name="triangle-up" size="22px" color="purple.300" />
            </a>
          </Link>
          <Projects />
        </div>
        <div id="exp" style={{ "paddingTop": "100px" }}>
          <Link href="#">
            <a >
              <Badge variant="outline" variantColor="purple">
                Timeline
            </Badge> <Icon name="triangle-up" size="22px" color="purple.300" />
            </a>
          </Link>

        </div>
      </Flex>

    </Container>
  )
}
