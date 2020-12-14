import React from 'react'
import { Helmet } from "react-helmet"
import config from '../utils/siteConfig'
import Layout from '../components/layout'
import SectionHeading from '../components/SectionHeading'
import SEO from '../components/SEO'

const Success = ({ data }) => {
  const postNode = {
    title: `Contact - ${config.siteTitle}`,
  }

  return (
    <Layout>
      <Helmet>
        <title>{`Thank You - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postNode={postNode} pagePath="thanks" customTitle />
      <div style={{maxWidth:'700px', margin:' 0 auto', padding:'0px 10px 25px 10px', minHeight:'250px', textAlign:'center'}}>
      <SectionHeading text={'Thanks For Your Submission'} />
        <h4>Thanks for contacting us!</h4>
        <p>We will contact you shortly</p>
      </div>
    </Layout>
  )
}

export default Success
