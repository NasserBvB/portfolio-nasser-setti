import { ColorModeProvider, CSSReset, ThemeProvider, useColorMode } from "@chakra-ui/core";
import { css, Global } from "@emotion/core";
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from "../components/MDXComponents";
import '../styles/globals.css';
import { prismDarkTheme, prismLightTheme } from '../styles/prism';
import theme from "../styles/theme";


const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};

          ::selection {
            background-color: #47a3f3;
            color: #fefefe;
          }

          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === 'light' ? 'white' : '#171923'};
          }
        `}
      />
      {children}
    </>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={MDXComponents}>
        <ColorModeProvider value="light">
          <GlobalStyle>
            <Component {...pageProps} />
          </GlobalStyle>
        </ColorModeProvider>
      </MDXProvider>
    </ThemeProvider>
  )
}

export default MyApp
