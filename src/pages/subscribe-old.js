import React from 'react'
import { Helmet } from "react-helmet"
import config from '../utils/siteConfig'
import Layout from '../components/layout'
import SectionHeading from '../components/SectionHeading'
import Mailchimp from '../components/Mailchimp'
import SEO from '../components/SEO'

const Subscribe = ({ data }) => {
  const postNode = {
    title: `Subscribe - ${config.siteTitle}`,
  }

  return (
    <Layout>
      <Helmet>
        <title>{`Subscribe - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postNode={postNode} pagePath="subscribe-to-the-hilltops-phoenix" customTitle />
      <div id={'subscribePage'} style={{maxWidth:'700px', margin:' 0 auto', padding:'0 10px 50px 10px'}}>
        <SectionHeading text={'SUBSCRIBE'} />
        <Mailchimp />
        </div>
    </Layout>
  )
}

export default Subscribe
