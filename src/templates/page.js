import React from 'react'
import { Helmet } from "react-helmet"
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/SEO'
import PostBody from '../components/PostBody'
import PDFViewer from 'mgr-pdf-viewer-react';
import './blogPost.css'
import downloadStyles from '../components/downloadStyles.module.css'
import Search from "../components/Search"
import '../components/Search/SearchStyles.css'
import SectionHeading from '../components/SectionHeading'
import ContactUpload from '../components/ContactUpload'
import Slider from "react-slick";
import Img from 'gatsby-image'
import Mailchimp from '../components/Mailchimp'


class pageTemplate extends React.Component {
  render() {
    var displayAdAboveGlobal = false
    const page = this.props.data.contentfulPage
    const siteMetadata = this.props.data.site.siteMetadata
    const pageNode = this.props.data.contentfulPage
    let pageImage = null
    if (this.props.data.contentfulPage.metaImage){
     pageImage = this.props.data.contentfulPage.metaImage.resize.src
    }
    const adModule = this.props.data.contentfulAdManager

    var settings = {
      dots: false,
      arrows: false,
      fade: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 500,
      slidesToShow: 1,
    }

    function displayAdsAbove(data){
      if (adModule && adModule.displayAds === true && adModule.ads.length > 0){
        var adsArray = [];
        var displayAdsAbove;
        adModule.ads.map(function(advertisement){
          if(advertisement.adPosition.includes("Above")){
            var targetingArray = []
            if (advertisement.targeting){
              targetingArray = advertisement.targeting
            }
              return(
                displayAdAboveGlobal = true,
                displayAdsAbove = true,
                adsArray.push({'image': advertisement.image.fluid, 'title': advertisement.title, 'link': advertisement.link, 'targeting' : targetingArray})
            )
          }else{
            return false
          }
        })
          if (displayAdsAbove === true) {
              var finalAdsArray = []
              var matchArray = []
              var matchPageArray = []
              adsArray.map(function(advertisement) {
                 return(
                  advertisement.targeting.map(function (target) {
                    if (target.internal.type === 'ContentfulPage'){
                      matchPageArray = adsArray.filter(function (node) {
                          return node.targeting.some(function (elem) {
                            return elem.slug === page.slug
                          });
                      });
                    }else{
                      return false
                    }
                    return false
                  })
                )
              })

              if (matchPageArray.length > 0){
                matchArray.push(matchPageArray)
              }

              matchArray = [].concat.apply([], matchArray);

              if (matchArray.length === 0){
                finalAdsArray = adsArray
              }else{
                finalAdsArray = matchArray
              }
            return(
              <div style={{maxWidth:'730px', margin: '0 auto'}}>
                <Slider {...settings}>
                    {finalAdsArray.map((ad, index) => {
                  return(
                      <div key={index} style={{maxWidth:'730px', margin: '0 auto'}}>
                        <div style={{padding:'25px 10px 10px 10px'}}>
                          <a href={ad.link}>
                            <Img fluid={ad.image} alt={ad.title}/>
                          </a>
                        </div>
                      </div>
                  )
                })}
                </Slider>
            </div>
          )
          }
        }else{
        return <div></div>
      }
    }
    return (
      <Layout>
        <Helmet>
          <title>{`${page.title} | ${siteMetadata.title}`}</title>
        </Helmet>
        <SEO pagePath={page.slug} postNode={pageNode} pageImage={pageImage} pageSEO/>
        {displayAdsAbove(this.props.data)}
        {page.title === 'Contact' &&
          <div style={{maxWidth:'900px', margin:'0 auto'}}>
          <SectionHeading text={page.title} />
          <ContactUpload />
          </div>
        }
        {page.title === 'Download' &&
          <div style={{maxWidth:'900px', margin:'0 auto'}}>
          <SectionHeading text={'Download Previous Issues'} />
          <div  style={{background:'#ffffff'}} className={downloadStyles.iframeContainer}>
          <iframe title="download" src="https://drive.google.com/embeddedfolderview?id=1HqOLasXttbiQk2oXoZ_w9uYTX-v12NVT#list" style={{width:'100%', height:'600px', border:'0'}}></iframe>
          </div>
          </div>
        }
        {page.title === 'Subscribe' &&
          <div id={'subscribePage'} style={{maxWidth:'700px', margin:' 0 auto', padding:'0 10px 50px 10px'}}>
          <SectionHeading text={'SUBSCRIBE'} />
          <Mailchimp />
          </div>
        }
        {page.title === 'Search' &&
          <>
          <div>
          {displayAdAboveGlobal &&
            <SectionHeading text={page.title} />
          }
            <Search/>
          </div>
          </>
        }
        {page.pdfUrl &&
          <div style={{maxWidth:'900px', margin:'0 auto'}}>
            <div className='pdf-viewer'>
              <PDFViewer
                document={{
                    url: page.pdfUrl
                }}
                css="customCanvas"
              />
            </div>
          </div>
        }
          <div>
          {(page.copy && page.title !== 'Search' && page.title !== 'Subscribe' && page.title !== 'Download' && page.title !== 'Contact' && !page.pdfUrl) &&
            <div style={{maxWidth:'900px', margin:'0 auto'}}>
              <PostBody page body={page.copy} />
            </div>
          }
          </div>



      </Layout>
    )
  }
}
export default pageTemplate
export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    contentfulPage(slug: { eq: $slug }) {
      id
      title
      slug
      pdfUrl
      seoTitle
      metaDescription {
        internal {
          content
        }
      }
      metaImage {
        resize(width: 1200) {
          src
          width
          height
        }
    	}
      copy {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 120)
        }
      }
    }
    contentfulAdManager(title: {eq: "Goulburn Phoenix Ad Manager"}) {
       id
       title
       displayAds
       ads {
          __typename
          ... on Node {
            ... on ContentfulAdModule {
               id
               title
               image {
                 fluid(maxWidth: 730, quality: 80) {
                   ...GatsbyContentfulFluid
                 }
               }
               link
               adPosition
               targeting {
                 ... on Node {
                   ... on ContentfulPost {
                     id
                     title
                     slug
                     internal {
                       type
                     }
                   }
                 }
                 ... on Node {
                   ... on ContentfulTag {
                     id
                     title
                     slug
                     internal {
                       type
                     }
                   }
                 }
                 ... on Node {
                   ... on ContentfulCategory {
                     id
                     title
                     slug
                     internal {
                       type
                     }
                   }
                 }
                 ... on Node {
                   ... on ContentfulPage {
                     id
                     title
                     slug
                     internal {
                       type
                     }
                   }
                 }
                 ... on Node {
                   ... on ContentfulAuthor {
                     id
                     title
                     slug
                     internal {
                       type
                     }
                   }
                 }
               }
             }
          }
       }
     }
  }
`
