import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Selector from "../components/selector"

/** Podria crear un async request after first letter, and show the options
 * Or show them all at very first click
 */
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="BARUC" />
      <h3>Escribí tu pecado:</h3>
      <Selector />
    </Layout>
  )
}

export default IndexPage
