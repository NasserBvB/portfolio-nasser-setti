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
      <div style={{"display":"grid", "justifyContent":"space-around", "position": "relative", "paddingTop": "70px"}}>
        <div id="pro" style={{"height":"500px", "paddingTop":"100px"}} >
          Projects <a href="#">#</a>
        </div>
        <Divider  />
        <div id="exp" style={{"height":"500px", "paddingTop":"100px"}}>
          Experience <a href="#">#</a>
        </div>
        <Divider />
        <div id="edu" style={{"height":"500px", "paddingTop":"100px"}}>
          Education <a href="#">#</a>
        </div>
      </div>

    </Container>
  )
}
