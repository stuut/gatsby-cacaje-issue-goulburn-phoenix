import React from "react";
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import indexMainStyles from './indexMainStyles.module.css'
import SectionHeading from './SectionHeading'
const _ = require('lodash')


const IndexMain = (props) => {

    const posts = props.posts
    const featuredPost = posts[0].node

    return (
      <div className={`${indexMainStyles.indexBackgroundContainer} ${'darkModeBlack'}`}>
        <div style={{maxWidth:'1200px', margin:'0 auto', overflow:'hidden'}}>
          <div className={indexMainStyles.showMobileOnly}>
            <SectionHeading text={props.heading} textColour={'whiteText'}/>
          </div>
          <div className={`${indexMainStyles.mainIndexContainer} ${indexMainStyles.dark}`}>
            <div className={indexMainStyles.top}>
              <div className={`${indexMainStyles.featured} ${indexMainStyles.indexPost} ${indexMainStyles.dark}`} key={featuredPost}>
              {featuredPost.image &&
              <Link to={`/${featuredPost.slug}/`}>
                <Img fluid={featuredPost.image.fluid} alt={featuredPost.image.title}/>
              </Link>
              }
                <div className={indexMainStyles.darkCover}></div>
                  <div className={`${indexMainStyles.indexMainTitle} ${'darkModeMidBackgroundMobile'}`}>
                    {featuredPost.category &&
                      <div className={indexMainStyles.category}><Link to={`/category/${_.kebabCase(featuredPost.category)}`}>{featuredPost.category}</Link></div>
                    }
                    {featuredPost.categories &&
                      featuredPost.categories.map((category, index) => {
                      return(
                        <div key={index} className={indexMainStyles.category}><Link to={`/category/${_.kebabCase(category.slug)}`}>{category.title}</Link></div>
                        )
                      })
                    }
                    <Link to={`/${featuredPost.slug}/`}>
                    <h4 className={indexMainStyles.mainTitle}>{featuredPost.title}</h4>
                    <p className={indexMainStyles.showMobileOnly}
                      dangerouslySetInnerHTML={{
                        __html: featuredPost.copy.childMarkdownRemark.excerpt,
                      }}
                    />
                    </Link>
                  </div>

              </div>
            </div>
            <div className={indexMainStyles.bottom}>
              {posts.slice(1, 4).map((post, index) => {
                return (
                  <div key={post.node.id} className={indexMainStyles.darkPostsRow}>
                    <div style={{height:'100%'}} className={'darkModeMidBackground'}>
                      <div>
                      {post.node.image &&
                      <Link to={`/${post.node.slug}/`}>
                        <Img fluid={post.node.image.fluid} alt={post.node.image.title}/>
                      </Link>
                      }
                      </div>
                      <div>
                        <div className={`${indexMainStyles.indexTextSmall} ${indexMainStyles.dark}`}>

                        {post.node.categories &&
                          post.node.categories.map((category, index) => {
                          return(
                            <div key={index} className={indexMainStyles.category}><Link to={`/category/${_.kebabCase(category.slug)}/`}>{category.title}</Link></div>
                            )
                          })
                        }
                          <Link to={`/${post.node.slug}/`}>
                            <h4 className={indexMainStyles.title}>{post.node.title}</h4>
                            <p style={{marginTop:'5px', lineHeight: '1.4em'}}
                              dangerouslySetInnerHTML={{
                                __html: post.node.copy.childMarkdownRemark.excerpt,
                              }}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
}

export default IndexMain
