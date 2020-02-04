import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Selector from "../components/selector"
import ContactForm from '../components/contact_form';

/** Podria crear un async request after first letter, and show the options
 * Or show them all at very first click
 */
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="BARUC" />
      <Selector />
      <ContactForm />
    </Layout>
  )
}

export default IndexPage
