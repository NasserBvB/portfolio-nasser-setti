import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Container from '../components/Container';
import { Stack } from "@chakra-ui/core";

export default function Home() {
  return (
    <Container className={styles.container}>

      <Head>
        <title>Nasser Setti</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="700px"
      >
        <div>
          Welcome home
        </div>
      </Stack>
    </Container>
  )
}
