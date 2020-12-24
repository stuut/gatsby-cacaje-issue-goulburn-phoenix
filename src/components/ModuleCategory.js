import React from "react";
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import indexMainStyles from './indexMainStyles.module.css'
import SectionHeading from './SectionHeading'
import { orderBy } from 'lodash'
import moment from 'moment'

const _ = require('lodash')


class ModuleCategory extends React.Component {
  render() {
    var postArray = [];
    var pageArray = [];
    var authorArray = [];
    var realEstateArray = [];

    this.props.posts.map((node) => {
      if (node.__typename === 'ContentfulCategory' || node.__typename === 'ContentfulTag'){
        if (node.post){
          node.post.map((node) => {
            return(postArray.push(node));
          })
        }else if (node.realestate){
          node.realestate.map((node) => {
            return(realEstateArray.push(node));
          })
        }
      }else if (node.__typename === 'ContentfulPost'){
        return postArray.push(node);
      }else if (node.__typename === 'ContentfulRealEstate'){
        return realEstateArray.push(node);
      }else if (node.__typename === 'ContentfulAuthor'){
        return authorArray.push(node);
      }else if (node.__typename === 'ContentfulPage'){
              return pageArray.push(node);
      }else{
        return null
      }
      return null
    })

    var finalArray = [];
    finalArray.push(postArray);
    finalArray.push(realEstateArray);
    finalArray.push(authorArray)
    finalArray.push(pageArray)
    finalArray = [].concat.apply([], finalArray);
    finalArray = finalArray.filter( (ele, index) => index === finalArray.findIndex( elem => elem.slug === ele.slug))

    finalArray = orderBy(finalArray, function(item) {
           return [object => new moment(object.publishDate, "YYYY-MM-DD")];
    }, ['desc']);

    if (this.props.coverStory || this.props.coverStory === true){
      var coverStory = true
      finalArray = finalArray.filter(function (node) {
          return node.coverStory !== coverStory
      });
    }

    finalArray = finalArray.slice(0, 4)

      const featuredPost =  finalArray[0]

  return (
    <div>
    <div style={{maxWidth:'1200px', margin:'0 auto', overflow:'hidden'}}>
          <SectionHeading text={this.props.title}/>
        <div className={`${indexMainStyles.mainIndexContainer} ${indexMainStyles.light}`}>
          <div className={indexMainStyles.left}>
           <div className={`${indexMainStyles.featured} ${indexMainStyles.indexPost} ${indexMainStyles.dark} ${'darkModeMidBackground'}`} key={featuredPost}>
              {featuredPost.image &&
                <Img fluid={featuredPost.image.fluid} alt={featuredPost.image.title}/>
              }
              {featuredPost.internal.type === 'ContentfulPage' &&
                <>
                  {featuredPost.metaImage &&
                    <Img fluid={featuredPost.metaImage.fluid} alt={featuredPost.metaImage.title}/>
                  }
                </>
              }
              <div className={indexMainStyles.darkCover}></div>
                <div className={indexMainStyles.indexMainTitle}>
                  {featuredPost.categories &&
                    featuredPost.categories.map((category, index) => {
                    return(
                      <div key={index} className={indexMainStyles.category}><Link to={`/category/${_.kebabCase(category.slug)}/`}>{category.title}</Link></div>
                      )
                    })
                  }
                  <Link to={`/${featuredPost.slug}/`}>
                  <h4 className={indexMainStyles.showDesktopOnly}>{featuredPost.title.length > 40 ? featuredPost.title.slice(featuredPost.title, 40) + '...' : featuredPost.title }</h4>
                  <h4 className={indexMainStyles.showMobileOnly}>{featuredPost.title }</h4>
                  {featuredPost.copy ? (
                    <>
                       <p className={indexMainStyles.showMobileOnly}
                        dangerouslySetInnerHTML={{
                          __html: featuredPost.copy.childMarkdownRemark.excerpt,
                        }}
                      />
                    </>
                    ):(
                      <>
                      {featuredPost.internal.type === 'ContentfulPage' &&
                          <>
                          {featuredPost.metaDescription &&
                            <p className={indexMainStyles.showMobileOnly}>
                              {featuredPost.metaDescription.internal.content}
                            </p>
                          }
                          </>
                        }
                      </>
                    )
                  }
                  </Link>
                </div>
            </div>
          </div>
          <div className={indexMainStyles.right}>
            {finalArray.slice(1, 4).map((post, index) => {
              return (
                    <div key={post.id} className={indexMainStyles.indexPost}>
                      <div className={indexMainStyles.indexRightSmall}>
                        <div>
                          {post.image &&
                          <Link to={`/${post.slug}/`}>
                            <Img fluid={post.image.fluid} alt={post.image.title}/>
                          </Link>
                          }
                          {post.metaImage &&
                          <Link to={`/${post.slug}/`}>
                            <Img fluid={post.metaImage.fluid} alt={post.metaImage.title}/>
                          </Link>
                          }
                        </div>
                        <div>
                          <div className={`${indexMainStyles.indexTextSmall} ${indexMainStyles.categorySection}`}>
                            {post.categories &&
                              post.categories.map((category, index) => {
                              return(
                                <div key={index} className={indexMainStyles.category}><Link to={`/category/${_.kebabCase(category.slug)}/`}>{category.title}</Link></div>
                                )
                              })
                            }
                            {post.internal.type === 'ContentfulAuthor' &&
                              <div key={index} className={indexMainStyles.category}><Link to={`/authors/${_.kebabCase(post.slug)}/`}>Author</Link></div>
                            }
                            {post.internal.type === 'ContentfulPost' &&
                            <Link to={`/${post.slug}/`}>
                              <h4 className={`${'darkModeText'} ${indexMainStyles.showDesktopOnly}`}>{post.title.length > 43 ? post.title.slice(post.title, 43) + '...'  : post.title}</h4>
                              <h4 className={`${'darkModeText'} ${indexMainStyles.showMobileOnly}`}>{post.title}</h4>
                              <p className={`${indexMainStyles.indexRightSmallText} ${'darkModeText'}`}
                                dangerouslySetInnerHTML={{
                                  __html: post.copy.childMarkdownRemark.excerpt,
                                }}
                              />
                            </Link>
                            }
                            {post.internal.type === 'ContentfulAuthor' &&
                            <Link to={`/author/${post.slug}/`}>
                              <h4 className={`${'darkModeText'} ${indexMainStyles.showDesktopOnly}`}>{post.title.length > 43 ? post.title.slice(post.title, 43) + '...'  : post.title}</h4>
                              <h4 className={`${'darkModeText'} ${indexMainStyles.showMobileOnly}`}>{post.title}</h4>
                              <p className={`${indexMainStyles.indexRightSmallText} ${'darkModeText'}`}
                                dangerouslySetInnerHTML={{
                                  __html: post.copy.childMarkdownRemark.excerpt,
                                }}
                              />
                            </Link>
                            }
                            {post.internal.type === 'ContentfulPage' &&
                            <Link to={`/${post.slug}/`}>
                              <h4 className={`${'darkModeText'} ${indexMainStyles.showDesktopOnly}`}>{post.title.length > 43 ? post.title.slice(post.title, 43) + '...'  : post.title}</h4>
                              <h4 className={`${'darkModeText'} ${indexMainStyles.showMobileOnly}`}>{post.title}</h4>
                              {post.copy ? (
                              <>
                              <p className={`${indexMainStyles.indexRightSmallText} ${'darkModeText'}`}
                                dangerouslySetInnerHTML={{
                                  __html: post.copy.childMarkdownRemark.excerpt,
                                }}
                              />
                              </>
                              ) : (
                                <>
                                {post.metaDescription &&
                                  <p className={`${indexMainStyles.indexRightSmallText} ${'darkModeText'}`}>
                                  {post.metaDescription.internal.content}
                                  </p>
                                }
                                </>
                              )
                              }
                            </Link>
                            }

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
}

export default ModuleCategory
