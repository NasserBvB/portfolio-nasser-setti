import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Container from '../components/Container';
import Welcome from "../components/Welcome";
import { Divider } from "@chakra-ui/core";
export default function Home() {
  return (
    <Container className={styles.container}>

      <Head>
        <title>Nasser Setti</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Welcome />
      <div style={{"display":"grid", "justifyContent":"space-around"}}>
        <div id="pro" >
          Projects <a href="#">#</a>
        </div>
        <Divider  />
        <div id="exp" >
          Experience <a href="#">#</a>
        </div>
        <Divider  />
        <div id="edu">
          Education <a href="#">#</a>
        </div>
      </div>

    </Container>
  )
}
