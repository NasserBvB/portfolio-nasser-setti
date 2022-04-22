import { Container } from "./styles";
import githubIcon from "../../assets/github-icon.svg"
import ScrollAnimation from "react-animate-on-scroll";


export function Portfolio() {
  return (
    <Container id="blogs">
      <h2>My blogs list</h2>

      <div className="projects">

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b " stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><title>Folder</title><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              <div className="project-links">
                <a href="https://github.com/joaotuliojt/fc-squad43" target="_blank" rel="noreferrer">
                  <img src={githubIcon} alt="GitHub" />
                </a>
              </div>
            </header>
            <div className="body">
              <h3>FCallendar</h3>
              <p>Uma aplicação Web realizada durante o Hackathon do programa de formação da <a href="https://www.fcamara.com.br/"> FCamara</a>. Esta aplicação serve para ajudar na volta do trabalho remoto para o presencial.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>Node</li>
                <li>Express</li>
                <li>MySql</li>
                <li>Ejs</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>
      </div>
    </Container>
  );
}