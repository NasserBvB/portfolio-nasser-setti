import Head from 'next/head';
import Container from '../components/Container';
import Project from '../components/Project';
import styles from '../styles/Home.module.css';
export default function Projects() {
    return (
        <Container className={styles.container}>

            <Head>
                <title>Nasser Setti</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div id="exp">
                <Project />
            </div>
        </Container>
    )
}