import React from 'react'
import contactStyles from '../components/contactStyles.module.css'
import { Helmet } from "react-helmet"
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import MasonryPosts from '../components/MasonryPosts'
import connectEmail from '../../static/connect-email.svg'
import connectFacebook from '../../static/connect-facebook.svg'
import connectInsta from '../../static/connect-insta.svg'
import connectTwitter from '../../static/connect-twitter.svg'
import connectWeb from '../../static/connect-website.svg'

class AuthorPostTemplate extends React.Component {
  render() {
    const regularPosts = this.props.data.contentfulAuthor.post
    const author = this.props.data.contentfulAuthor
    const siteMetadata = this.props.data.site.siteMetadata


    let phoneLink = author.phoneNumber;

    if (phoneLink !== null) {
      while(phoneLink.charAt(0) === '0')
      {
       phoneLink = phoneLink.substr(1);
      }
    }

    return (
      <Layout>
        <Helmet>
          <title>{`Author: ${author.title} - ${siteMetadata.title}`}</title>
          <meta
            property="og:title"
            content={`Author: ${author.title} - ${siteMetadata.title}`}
          />
          <meta property="og:url" content={`${siteMetadata.siteUrl}/author/${author.slug}/`} />
        </Helmet>
        <div>
        <div>
        <div className ={'authorBackground darkModeLightBackground'}style={{textAlign:'center', padding:'25px', position:'relative'}}>
            {author.image &&
              <div className={contactStyles.authorLogo}>
              <Img fixed={author.image.fixed} alt={author.title}/>
              </div>
            }
            <h3 style={{margin:'25px 0 10px 0'}}>{author.title}</h3>
            {author.copy &&
            <div className={'body author'} style={{margin:'0 auto 15px auto', maxWidth:'900px'}}
            dangerouslySetInnerHTML={{
                __html: author.copy.childMarkdownRemark.html,
              }}
            />
            }
            {author.phoneNumber &&
            <p style={{fontWeight:'600'}}><a href=  {`tel:+61${phoneLink}`}>PH: {author.phoneNumber}</a></p>
            }
            {author.address &&
            <p style={{fontWeight:'600'}}>{author.address}</p>
            }
            <div style={{paddingTop:'15px'}}className={contactStyles.contactContainer}>
            {author.website &&
            <div className={contactStyles.contactContainerImg}>
              <a href={author.website} target="new_window"><img src={connectWeb} alt="website"/></a>
            </div>
            }
            {author.email &&
            <div className={contactStyles.contactContainerImg}>
              <a href={`mailto:${author.email}`}><img src={connectEmail} alt="email"/></a>
            </div>
            }
            {author.facebook &&
            <div className={contactStyles.contactContainerImg}>
              <a href={author.facebook}><img src={connectFacebook} alt="facebook"/></a>
            </div>
            }
            {author.instagram &&
            <div className={contactStyles.contactContainerImg}>
              <a href={author.instagram}><img src={connectInsta} alt="instagram"/></a>
            </div>
            }
            {author.twitter &&
            <div className={contactStyles.contactContainerImg}>
              <a href={author.twitter}><img src={connectTwitter} alt="twitter"/></a>
            </div>
            }

          </div>
        </div>

            <div>
              {author.post && <h4 style={{textAlign:'center', margin:'35px 10px 25px 10px'}}>More Posts From {author.title}</h4>}
            {author.post &&
              <MasonryPosts
               posts={regularPosts}
               />
            }
            </div>

        </div>
        </div>
      </Layout>
    )
  }
}
export default AuthorPostTemplate

export const authorquery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    contentfulAuthor(slug: { eq: $slug }) {
      image{
        fixed(width: 100) {
          ...GatsbyContentfulFixed
        }
      }
      title
      slug
      address
      phoneNumber
      website
      email
      facebook
      instagram
      twitter
      copy {
        childMarkdownRemark {
          html
        }
      }
      post {
        id
        title
        slug
        publishDate(formatString: "MMM DD, YYYY")
        image {
          title
          fluid(maxWidth: 320) {
            ...GatsbyContentfulFluid
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
  }
`
