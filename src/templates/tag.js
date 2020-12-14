import React from 'react'
import { Helmet } from "react-helmet"
import { graphql } from 'gatsby'
import { orderBy } from 'lodash'
import moment from 'moment'
import Layout from '../components/layout'
import MasonryPosts from '../components/MasonryPosts'
import SectionHeading from '../components/SectionHeading'
import Slider from "react-slick";
import Img from 'gatsby-image'



const TagPostTemplate = (props) => {

    var settings = {
      dots: false,
      arrows: false,
      fade: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 500,
      slidesToShow: 1,
    }

      const adModule = props.data.contentfulAdManager

      function displayAdsAbove(data){
        if (adModule && adModule.displayAds === true && adModule.ads.length > 0){
          var adsArray = [];
          var displayAdsAbove;
          adModule.ads.map(function(advertisement){
            console.log('advertisement tags page', advertisement)
            if(advertisement.adPosition.includes("Above")){
              var targetingArray = []
              if (advertisement.targeting){
                targetingArray = advertisement.targeting
              }
                return(
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
                var matchTagArray = []
                adsArray.map(function(advertisement) {
                   return(
                    advertisement.targeting.map(function (target) {
                      if (target.internal.type === 'ContentfulTag'){
                        console.log('advertisementtag', advertisement)

                        matchTagArray = adsArray.filter(function (node) {
                            return node.targeting.some(function (elem) {
                              return elem.slug === props.data.contentfulTag.slug
                            });
                        });
                        console.log('matchTagArray', matchTagArray)
                      }else{
                        return false
                      }
                      return false
                    })
                  )
                })

                if (matchTagArray.length > 0){
                  matchArray.push(matchTagArray)
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


    const posts = orderBy(
      props.data.contentfulTag.post,
      // eslint-disable-next-line
      [object => new moment(object.publishDate, "MM-DD-YYYY")],
      ['desc']
    )
    const metapost= props.data.contentfulTag
    const siteMetadata = props.data.site.siteMetadata
    return (
      <Layout>
        <Helmet>
        <title>{`Tag: ${metapost.title} - ${siteMetadata.title}`}</title>
          <meta
            property="og:title"
            content={`Tag: ${metapost.title} - ${siteMetadata.title}`}
          />
        <meta property="og:url" content={`${siteMetadata.siteUrl}/tag/${metapost.slug}/`} />
        </Helmet>
        <div>
        {displayAdsAbove(props.data)}

          <SectionHeading text={props.data.contentfulTag.title} />
            {posts &&
            <MasonryPosts
            posts={posts}
            />
            }
        </div>

      </Layout>
    )

}
export default TagPostTemplate

export const tagquery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    contentfulTag(slug: { eq: $slug }) {
      title
      id
      slug
      post {
        id
        title
        categories {
          title
          slug
        }
        slug
        publishDate(formatString: "MMMM DD, YYYY")
        image {
          title
          fluid(maxWidth: 320) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
        copy {
          childMarkdownRemark {
            html
            excerpt(pruneLength: 80)
          }
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
