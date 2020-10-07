import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Container from '../components/Container';
import Welcome from "../components/Home";
import { Education, Projects, Experience } from "../lib/util";

export default function Home() {
  return (
    <Container className={styles.container}>

      <Head>
        <title>Nasser Setti</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Welcome />

    </Container>
  )
}
