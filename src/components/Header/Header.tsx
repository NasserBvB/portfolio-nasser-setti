import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { Container } from "./styles";

export function Header() {
  const [isActive, setActive] = useState(false);

  function toggleTheme() {
    let html = document.getElementsByTagName("html")[0];
    html.classList.toggle("light");

    const event = new CustomEvent("themeChange", {
      detail: {
        theme: html.classList.contains("light") ? "light" : "dark",
      },
    })

    dispatchEvent(event);
  }

  function closeMenu() {
    setActive(false);
  }

  return (
    <Container className="header-fixed">
      <Router>
        <HashLink smooth to="#home" className="logo">
          <span>N</span>
          <span>asser</span>
        </HashLink>

        <input
          onChange={toggleTheme}
          className="container_toggle"
          type="checkbox"
          id="switch"
          name="mode"
        />
        <label htmlFor="switch">Toggle</label>

        <nav className={isActive ? "active" : ""}>
          <NavHashLink smooth to="#home" onClick={closeMenu}>
            Home
          </NavHashLink>
          <NavHashLink smooth to="#about" onClick={closeMenu}>
            About me
          </NavHashLink>
          <NavHashLink smooth to="#experiences" onClick={closeMenu}>
            Experiences
          </NavHashLink>
          <NavHashLink smooth to="#contact" onClick={closeMenu}>
            Contact
          </NavHashLink>
          <NavHashLink smooth to="#comments" onClick={closeMenu}>
            Leave a comment
          </NavHashLink>
          <a href="https://res.cloudinary.com/nasser-ecommerce/image/upload/v1659796841/My_work_resume-4_jabu3g.pdf" rel="noreferrer" target="_blank" download className="button">
            CV
          </a>
        </nav>

        <div
          aria-expanded={isActive ? "true" : "false"}
          aria-haspopup="true"
          aria-label={isActive ? "Close menu" : "Open menu"}
          className={isActive ? "menu active" : "menu"}
          onClick={() => {
            setActive(!isActive);
          }}
        ></div>
      </Router>
    </Container>
  );
}
