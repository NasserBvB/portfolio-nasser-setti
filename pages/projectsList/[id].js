import Head from 'next/head';
import Container from '../../components/Container';
import ProjectPage from "../../components/ProjectPage";
import styles from '../../styles/Home.module.css';

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://localhost:3000/api/projects');
    const data = await res.json();
    // Get the paths we want to pre-render based on posts
    const paths = data.map((project) => `/projectsList/${project.id}`)

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}
// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`http://localhost:3000/api/projects`)
    const projects = await res.json()
    const project = projects.find((project) => project.id === params.id)
    // Pass post data to the page via props
    console.log(project);
    return { props: { project } }
}
export default function Project({ project }) {
    return <Container className={styles.container}>

        <Head>
            <title>{project.name}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div id="exp">
            <ProjectPage project={project} />
        </div>
    </Container>
}

