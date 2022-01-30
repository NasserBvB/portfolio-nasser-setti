import githubIcon from "../../assets/github.png";
import linkedinIcon from "../../assets/linkedin.png";
import reactIcon from "../../assets/react-icon.svg";
import twitterIcon from "../../assets/twitter-icon.svg";
import { Container } from "./styles";


export function Footer() {
  return (
    <Container className="footer">
      <a href="/" className="logo">
        <span>N</span>
        <span>asser</span>
      </a>
      <div>
        <p>
          This site was made with <img src={reactIcon} alt="React" /> and lots
          of
          <span>❤️</span>
        </p>
      </div>

      <div className="social-media">
        <a
          href="https://www.linkedin.com/in/abdennasser-es-sati-a7781a122/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedinIcon} alt="Linkedin" />
        </a>

        <a
          href="https://github.com/NasserBvB"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubIcon} alt="GitHub" />
        </a>


        <a
          href="https://twitter.com/NBvBJS"
          target="_blank"
          rel="noreferrer"
        >
          <img src={twitterIcon} alt="Twitter" />
        </a>
      </div>
    </Container>
  );
}
