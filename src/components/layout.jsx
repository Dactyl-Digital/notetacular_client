/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import axios from "axios"
import { createGlobalStyle } from "styled-components"
import { Provider } from "react-redux"
import { store } from "../store"

import Header from "./header"
import "./layout.css"

axios.defaults.withCredentials = true

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => (props.theme === "purple" ? "purple" : "white")};
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // NOTE: This style rule is because I don't intend to support mobile/tablets
  // TODO: Implement useEffect to check screen width and show an overlay w/ a message
  // to notify the user.
  // @media (max-width: 1082px) {
  //   background: lime;
  // }

  return (
    <Provider store={store}>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: "description", content: "Sample" },
          { name: "keywords", content: "sample, something" },
        ]}
      >
        <html lang="en" />
        <link
          href="https://fonts.googleapis.com/css?family=Blinker:400,800|Lexend+Exa&display=swap"
          rel="stylesheet"
        />
        {/* TODO: Unpuck this situation w/ the quill editor 
            Need that damn syntax highlighting and katex math formulas.
        */}
        {/* <link
          rel="stylesheet"
          href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.quilljs.com/1.3.6/quill.bubble.css"
        /> */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/monokai-sublime.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js"></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.css"
          integrity="sha384-dbVIfZGuN1Yq7/1Ocstc1lUEm+AT+/rCkibIcC/OmWo5f0EA48Vf8CytHzGrSwbQ"
          crossorigin="anonymous"
        />
        <script
          ref="preload"
          src="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.js"
          integrity="sha384-2BKqo+exmr9su6dir+qCw08N2ZKRucY4PrGQPPWU1A7FtlCGjmEGFqXCv5nyM5Ij"
          crossorigin="anonymous"
        ></script>
      </Helmet>
      <GlobalStyle theme="white" />
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <main>{children}</main>
      {/* <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer> */}
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
