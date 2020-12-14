import React, { Component } from 'react'
import { InstantSearch, Configure, SearchBox, HierarchicalMenu} from 'react-instantsearch-dom'
import { GoogleMapsLoader } from 'react-instantsearch-dom-maps'
import Content from '../components/Business/Content'
import Geo from '../components/Business/Geo'
import Layout from '../components/layout'
import { Helmet } from 'react-helmet'
import config from '../utils/siteConfig'
import '../components/Search/SearchStyles.css'
import algoliaLogo from '../../static/algolia.png'
import { Link } from 'gatsby'
import SEO from '../components/SEO'




class Business extends Component {
  render() {
    const postNode = {
    title: `Search - ${config.siteTitle}`,
  }

    return (
        <Layout>
        <Helmet>
          <title>{`Local Businesses - ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postNode={postNode} pagePath="business" customTitle />
      <InstantSearch
        appId="BT0LR5L5BU"
        apiKey="27cc5a1de7e6eb1ee713f30212d65544"
        indexName="Hilltops_business"
      >
        <Configure
          hitsPerPage={12}
          getRankingInfo
          aroundLatLngViaIP
          typoTolerance="min"
        />
        <div id="businessPage">
        <div className="darkModeDarkBackground">
        <main className="search-container">
          <div className="right-panel">
            <div id="map">
              {/* Uncomment the following widget to add a map */}
              {<div style={{ height: '100%' }}>
                <GoogleMapsLoader apiKey="AIzaSyB_P6kPwsX4vaAVC4dgNus6yTIwWLtsXH4">
                  {google => <Geo google={google} />}
                </GoogleMapsLoader>
              </div>}
            </div>
            <div id="searchbox">
              <SearchBox
                translations={{
                  placeholder: 'Search for a local business'
                }}
              />
              <img style={{
                  maxWidth: '100px',
                  marginTop: '10px',
                  marginLeft: 'auto',
                  marginBottom: '10px',
              }}
              src={algoliaLogo} alt="algolia" />
            </div>
          </div>
          <div className="left-panel">
            <HierarchicalMenu
              attributes={[
                'categories.lvl0',
                'categories.lvl1',
              ]}
            />
          </div>
        </main>
        </div>
        <div id="hits" className={'darkModeMidBackground'} style={{maxWidth:'1170px', margin: ' 0 auto', }}>
          {/* Uncomment the following widget to add hits list */}
          {<Content />}
        </div>
        <h4 style={{textAlign:'center', margin:'25px 0px',}}><span className={'darkModeText'}> Can't see your business? </span><Link to="/contact/">Please contact us</Link></h4>
        </div>
      </InstantSearch>
        </Layout>
    )
  }
}

export default Business
