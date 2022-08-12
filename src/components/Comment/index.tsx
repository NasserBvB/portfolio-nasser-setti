import React, { useEffect } from 'react'
import { Container } from '../Main/styles'
import Giscus from '@giscus/react';

function getBrowserLocales(options = {}) {
  const defaultOptions = {
    languageCodeOnly: false,
  };

  const opt = {
    ...defaultOptions,
    ...options,
  };

  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages;

  if (!browserLocales) {
    return undefined;
  }

  return browserLocales.map(locale => {
    const trimmedLocale = locale.trim();

    return opt.languageCodeOnly
      ? trimmedLocale.split(/-|_/)[0]
      : trimmedLocale;
  });
}
export default function Comments() {

  const [theme, setTheme] = React.useState(() => {
    const html = document.getElementsByTagName("html")[0];

    return html.classList.contains("light") ? "light" : "dark"
  });
  const [language, setLanguage] = React.useState("");


  useEffect(() => {
    // Register to a custom event called themeChange

    window.addEventListener("themeChange", (e: any) => {
      e.stopImmediatePropagation();

      setTheme(e.detail.theme);
    })

    const language = getBrowserLocales({ languageCodeOnly: true })?.at(0);

    setLanguage(language || "en");

  }, []);
  return (
    <Container id='comments'>
      <Giscus
        id="comments"
        repo="NasserBvB/portfolio-nasser-setti"
        repoId="DEwOlJlcG9zaXRvcnkzMDE5ODgzODc="
        category="General"
        categoryId="DIC_kwDOEf_6I84CQy-9"
        mapping="specific"
        term="Welcome to my portfolio"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang={language}
        loading="lazy"
      />
    </Container>
  )
}
