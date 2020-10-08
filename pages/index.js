import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Container from '../components/Container';
import Welcome from "../components/Welcome";
import { Badge, Icon } from "@chakra-ui/core";
export default function Home() {
  return (
    <Container className={styles.container}>

      <Head>
        <title>Nasser Setti</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Welcome />
      <div style={{ "display": "grid", "justifyContent": "space-around", "position": "relative", "paddingTop": "70px" }}>
        <div id="pro" style={{ "height": "500px", "paddingTop": "100px" }} >
          <a href="#">
            <Badge variant="outline" variantColor="purple">
              Projects
            </Badge> <Icon name="triangle-up" size="22px" color="purple.300" />
          </a>
        </div>
        <div id="exp" style={{ "height": "500px", "paddingTop": "100px" }}>
          <a href="#">
            <Badge variant="outline" variantColor="purple">
              Experiences
            </Badge> <Icon name="triangle-up" size="22px" color="purple.300" />
          </a>
        </div>
        <div id="edu" style={{ "height": "500px", "paddingTop": "100px" }}>
          <a href="#">
            <Badge variant="outline" variantColor="purple">
              Education
          </Badge> <Icon name="triangle-up" size="22px" color="purple.300" />
          </a>
        </div>
      </div>

    </Container>
  )
}
