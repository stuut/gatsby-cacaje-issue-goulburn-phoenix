import React from "react";
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import indexMainStyles from './indexMainStyles.module.css'
import SectionHeading from './SectionHeading'
const _ = require('lodash')


const IndexCategory = (props) => {


  const posts = props.posts
  const featuredPost = posts[0].node
  return (
    <div>
      <div style={{maxWidth:'1200px', margin:'0 auto', overflow:'hidden'}}>
            <SectionHeading text={props.heading} link={props.link}/>
          <div className={`${indexMainStyles.mainIndexContainer} ${indexMainStyles.light}`}>
            <div className={indexMainStyles.left}>
              <div className={`${indexMainStyles.featured} ${indexMainStyles.indexPost} ${indexMainStyles.dark} ${'darkModeMidBackground'}`} key={featuredPost}>
              {featuredPost.heroImage &&
                <Img fluid={featuredPost.heroImage.fluid} alt={featuredPost.heroImage.title}/>
              }
                <div className={indexMainStyles.darkCover}></div>

                  <div className={indexMainStyles.indexMainTitle}>
                  {featuredPost.category &&
                    <div className={indexMainStyles.category}><Link to={`/category/${_.kebabCase(featuredPost.category)}/`}>{featuredPost.category}</Link></div>
                    }
                    <Link to={`/${featuredPost.slug}/`}>
                    <h4>{featuredPost.title}</h4>
                    <p className={indexMainStyles.showMobileOnly}
                      dangerouslySetInnerHTML={{
                        __html: featuredPost.body.childMarkdownRemark.excerpt,
                      }}
                    />
                    </Link>
                  </div>

              </div>
            </div>
            <div className={indexMainStyles.right}>
              {posts.slice(1, 4).map((post, index) => {
                return (
                  <div key={post.node.id} className={indexMainStyles.indexPost}>
                    <div className={indexMainStyles.indexRightSmall}>
                      <div>
                      {post.node.heroImage &&
                      <Link to={`/${post.node.slug}/`}>
                        <Img fluid={post.node.heroImage.fluid} alt={post.node.heroImage.title}/>
                      </Link>
                      }
                      </div>
                      <div>
                        <div className={`${indexMainStyles.indexTextSmall} ${indexMainStyles.categorySection}`}>
                          {post.node.categories &&
                            post.node.categories.map((category, index) => {
                            return(
                              <div key={index} className={indexMainStyles.category}><Link to={`/category/${_.kebabCase(category.slug)}/`}>{category.title}</Link></div>
                              )
                            })
                          }
                          <Link to={`/${post.node.slug}/`}>
                            <h4 className={'darkModeText'}>{post.node.title}</h4>
                            <p className={`${indexMainStyles.indexRightSmallText} ${'darkModeText'}`}
                              dangerouslySetInnerHTML={{
                                __html: post.node.body.childMarkdownRemark.excerpt,
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

export default IndexCategory
