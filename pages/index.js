import Head from 'next/head';
import Container from '../components/Container';
import Timeline from '../components/Timeline';
import Welcome from "../components/Welcome";
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Container className={styles.container}>

      <Head>
        <title>Nasser Setti</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Welcome />
      <div id="exp" >
        <Timeline />
      </div>
    </Container>

  )
}

