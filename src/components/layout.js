import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './header'
import Footer from './Footer'
import '../styles/global.css'


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          keywords
          siteUrl
        }
      }
    }
  `)




  return (

    <>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
        <meta charSet= 'utf-8' />
        <meta name= 'viewport' content= 'width=device-width, initial-scale=1' />
        <meta name= 'description' content= {data.site.siteMetadata.description}/>
        <meta name= 'keywords' content= {data.site.siteMetadata.keywords}/>
        <html lang="en" />
        <meta property="og:title" content={data.site.siteMetadata.title} />
        <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={data.site.siteMetadata.title} />
    </Helmet>
    <Header siteTitle={data.site.siteMetadata.title} />


        <div>
          {children}
        </div>

      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
