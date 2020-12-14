import React from 'react'
import './blogPost.css'
import { Helmet } from "react-helmet"
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import Tabs from '../components/Tabs'
import TagList from '../components/TagList'
import PostBody from '../components/PostBody'
import MobileSocial from '../components/MobileSocial'
import Social from '../components/Social'
import Card from '../components/card'
import CardContainer from '../components/CardContainer'
import CounterNumber from '../components/CounterNumber'
import Mailchimp from '../components/Mailchimp'
import Contact from '../components/Contact'
import Sticky from 'react-sticky-el';
import SEO from '../components/SEO'
import Slider from "react-slick";


const _ = require('lodash')

class BlogPostTemplate extends React.Component {


  render() {
    var settings = {
      dots: false,
      arrows: false,
      fade: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 500,
      slidesToShow: 1,
    }


    const post = this.props.data.contentfulPost
    const adModule = this.props.data.contentfulAdManager
    const siteMetadata = this.props.data.site.siteMetadata
    const postNode = this.props.data.contentfulPost
    let relatedPosts = this.props.data.allContentfulPost.edges
    const finalrelatedPosts = relatedPosts.filter(filteredrelatedposts => filteredrelatedposts.node.id !== post.id)

    let bodyWidth  = 'stickyArea'



    function displayAdsAbove(data){
      if (adModule && adModule.displayAds === true && adModule.ads.length > 0){
        var adsArray = [];
        var displayAdsAbove;

        adModule.ads.map(function(advertisement){
          if(advertisement.adPosition.includes("Above")){
            console.log('advertisement', advertisement)
            var targetingArray = []
            if (advertisement.targeting){
              targetingArray = advertisement.targeting
            }
            var checkShowArray = []

            advertisement.dontShow ? checkShowArray = advertisement.dontShow.filter(node => node.slug === post.slug) : checkShowArray = [];

            if (checkShowArray.length === 0){
              return(
                   displayAdsAbove = true,
                   adsArray.push({'image': advertisement.image.fluid, 'title': advertisement.title, 'link': advertisement.link, 'targeting' : targetingArray})
               )
            }else{
              return false
            }
          }else{
            return false
          }
        })
          if (displayAdsAbove === true) {
            if (post){
              var finalAdsArray = []
              var matchArray = []
              var matchPostArray = []
              var matchAuthorArray = []
              var matchCategoryArray = []
              var matchTagArray = []

              adsArray.map(function(advertisement) {
                 return(
                  advertisement.targeting.map(function (target) {
                    if (target.internal.type === 'ContentfulCategory' && post.categories){
                      matchCategoryArray = adsArray.filter(function (node) {
                          return node.targeting.some(function (elem) {
                                return post.categories.some(item => item.slug === elem.slug);
                              });
                      });

                    }else if (target.internal.type === 'ContentfulTag' && post.tags){
                      matchTagArray = adsArray.filter(function (node) {
                          return node.targeting.some(function (elem) {
                                return post.tags.some(item => item.slug === elem.slug);
                              });
                      });


                    }else if (target.internal.type === 'ContentfulPost'){
                      matchPostArray = adsArray.filter(function (node) {
                          return node.targeting.some(function (elem) {
                            return elem.slug === post.slug
                          });
                      });

                    }else if (target.internal.type === 'ContentfulAuthor' && post.author){
                      matchAuthorArray = adsArray.filter(function (node) {
                          return node.targeting.some(function (elem) {
                                return(
                                  elem.slug ===  post.author.slug
                                )
                              });
                      });

                    }else{
                      return false
                    }
                    return false
                  })
                )
              })

              if (matchPostArray.length > 0){
                matchArray.push(matchPostArray)
              }

              if (matchAuthorArray.length > 0 && matchPostArray.length === 0){
                matchArray.push(matchAuthorArray)
              }

              if (matchCategoryArray.length > 0 && matchAuthorArray.length === 0 && matchPostArray.length === 0){
                matchArray.push(matchCategoryArray)
              }
              if (matchTagArray.length > 0 && matchAuthorArray.length === 0 && matchPostArray.length === 0){
                matchArray.push(matchTagArray)
              }
              matchArray = [].concat.apply([], matchArray);

              if (matchArray.length === 0){
                finalAdsArray = adsArray
                finalAdsArray = finalAdsArray.filter(function(val) {
                  return val.targeting.length < 1;
                });
              }else{
                finalAdsArray = matchArray
              }

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



    function displayAdsBelow(data){
      if (adModule && adModule.displayAds === true && adModule.ads.length > 0){
        var adsArray = [];
        var displayAdsBelow;
        adModule.ads.map(function(advertisement){
          if(advertisement.adPosition.includes("Below")){
            var targetingArray = []
            if (advertisement.targeting){
              targetingArray = advertisement.targeting
            }
            var checkShowArray = []

            advertisement.dontShow ? checkShowArray = advertisement.dontShow.filter(node => node.slug === post.slug) : checkShowArray = [];

            if (checkShowArray.length === 0){
              return(
                   displayAdsBelow = true,
                   adsArray.push({'image': advertisement.image.fluid, 'title': advertisement.title, 'link': advertisement.link, 'targeting' : targetingArray})
               )
            }else{
              return false
            }
          }else{
            return false
          }
        })
        if (displayAdsBelow === true) {
          if (post){
            var finalAdsArray = []
            var matchArray = []
            var matchPostArray = []
            var matchAuthorArray = []
            var matchCategoryArray = []
            var matchTagArray = []
            adsArray.map(function(advertisement){
              return(
                advertisement.targeting.map(function(target) {
                  if (target.internal.type === 'ContentfulCategory'){
                    matchCategoryArray = adsArray.filter(function (node) {
                        return node.targeting.some(function (elem) {
                              return post.categories.some(item => item.slug === elem.slug);
                            });
                    });
                  }else if (target.internal.type === 'ContentfulTag'){
                    matchTagArray = adsArray.filter(function (node) {
                        return node.targeting.some(function (elem) {
                              return post.tags.some(item => item.slug === elem.slug);
                            });
                    });
                  }else if (target.internal.type === 'ContentfulPost'){
                    matchPostArray = adsArray.filter(function (node) {
                        return node.targeting.some(function (elem) {
                            console.log('elem.slug', elem.slug)
                          return elem.slug === post.slug
                        });
                    });
                  }else if (target.internal.type === 'ContentfulAuthor' && post.author){
                    matchAuthorArray = adsArray.filter(function (node) {
                        return node.targeting.some(function (elem) {
                              return(
                                elem.slug ===  post.author.slug
                              )
                            });
                    });
                  }else{
                    return false
                  }
                  return false
                })
              )
            })

            if (matchPostArray.length > 0){
              matchArray.push(matchPostArray)
            }

            if (matchAuthorArray.length > 0 && matchPostArray.length === 0){
              matchArray.push(matchAuthorArray)
            }

            if (matchCategoryArray.length > 0 && matchAuthorArray.length === 0 && matchPostArray.length === 0){
              matchArray.push(matchCategoryArray)
            }
            if (matchTagArray.length > 0 && matchAuthorArray.length === 0 && matchPostArray.length === 0){
              matchArray.push(matchTagArray)
            }


            matchArray = [].concat.apply([], matchArray);


            if (matchArray.length === 0){
              finalAdsArray = adsArray
              finalAdsArray = finalAdsArray.filter(function(val) {
                return val.targeting.length < 1;
              });
            }else{
              finalAdsArray = matchArray
            }
          }
          return(
            <div style={{maxWidth:'730px', margin: '0 auto'}}>
              <Slider {...settings}>
                  {finalAdsArray.map(function(ad, index) {
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

    function displayAdsSide(data, sticky){
      if (adModule && adModule.displayAds === true && adModule.ads.length > 0){
        var adsArray = [];
        var displayAdsSide
        adModule.ads.map(function(advertisement){
          if(advertisement.adPosition.includes("Side")){
            var targetingArray = []
            if (advertisement.targeting){
              targetingArray = advertisement.targeting
            }
            var checkShowArray = []
            advertisement.dontShow ? checkShowArray = advertisement.dontShow.filter(node => node.slug === post.slug) : checkShowArray = [];
            if (checkShowArray.length === 0){
              return(
                   displayAdsSide = true,
                   adsArray.push({'image': advertisement.image.fluid, 'title': advertisement.title, 'link': advertisement.link, 'targeting' : targetingArray})
               )
            }else{
              return false
            }
          }else{
            return false
          }
        })
        if (displayAdsSide === true) {
          if (post){
            var finalAdsArray = []
            var matchArray = []
            var matchPostArray = []
            var matchAuthorArray = []
            var matchCategoryArray = []
            var matchTagArray = []
            adsArray.map(function(advertisement){
              return(
                advertisement.targeting.map(function (target) {
                  if (target.internal.type === 'ContentfulCategory'){
                    matchCategoryArray = adsArray.filter(function (node) {
                        return node.targeting.some(function (elem) {
                              return post.categories.some(item => item.slug === elem.slug);
                            });
                    });
                  }else if (target.internal.type === 'ContentfulTag' && post.tags){
                    matchTagArray = adsArray.filter(function (node) {
                        return node.targeting.some(function (elem) {
                              return post.tags.some(item => item.slug === elem.slug);
                            });
                    });
                  }else if (target.internal.type === 'ContentfulPost'){
                    matchPostArray = adsArray.filter(function (node) {
                        return node.targeting.some(function (elem) {
                          return elem.slug === post.slug
                        });
                    });
                  }else if (target.internal.type === 'ContentfulAuthor' && post.author){
                    matchAuthorArray = adsArray.filter(function (node) {
                        return node.targeting.some(function (elem) {
                              return(
                                elem.slug ===  post.author.slug
                              )
                            });
                    });
                  }else{
                    return false
                  }
                  return false
                })
              )
            })



            if (matchPostArray.length > 0){
              matchArray.push(matchPostArray)
            }

            if (matchAuthorArray.length > 0 && matchPostArray.length === 0){
              matchArray.push(matchAuthorArray)
            }

            if (matchCategoryArray.length > 0 && matchAuthorArray.length === 0 && matchPostArray.length === 0){
              matchArray.push(matchCategoryArray)
            }
            if (matchTagArray.length > 0 && matchAuthorArray.length === 0 && matchPostArray.length === 0){
              matchArray.push(matchTagArray)
            }

            matchArray = [].concat.apply([], matchArray);

            if (matchArray.length === 0){
              finalAdsArray = adsArray
              finalAdsArray = finalAdsArray.filter(function(val) {
                return val.targeting.length < 1;
              });
            }else{
              finalAdsArray = matchArray
            }
          }
          if (sticky === true && finalAdsArray.length > 0){
            return(
            <div style={{display:'flex', minWidth:'250px', position:'relative'}} className='showDesktop'>
              <Sticky boundaryElement=".postContainer" style={{position:'relative'}} hideOnBoundaryHit={false}>
                <div style={{width:'250px', paddingTop:'3em'}}>
                  <div >
                    <Slider {...settings}>
                      {finalAdsArray.map((ad, index) => {
                        return(
                            <div key={index}>
                                <a href={ad.link}>
                                  <Img fluid={ad.image} alt={ad.title}/>
                                </a>
                            </div>
                        )
                      })}
                    </Slider>
                  </div>
                </div>
              </Sticky>
              </div>
            )
          }
          if(finalAdsArray.length > 0){
            return(
            <div style={{display:'flex', minWidth:'250px', position:'relative'}}>
                <div style={{width:'250px', padding:'1em 0', margin: '0 auto'}}>
                  <div >
                    <Slider {...settings}>
                      {finalAdsArray.map((ad, index) => {
                        return(
                            <div key={index}>
                                <a href={ad.link}>
                                  <Img fluid={ad.image} alt={ad.title}/>
                                </a>
                            </div>
                        )
                      })}
                    </Slider>
                  </div>
                </div>
              </div>
            )
          }
        }
      }else{
        return <div></div>
      }
    }


    if (adModule && adModule.displayAds === true && adModule.ads.length > 0){
      var adsArray = [];
      adModule.ads.map(function(advertisement){
        if(advertisement.adPosition.includes("Side")){
          var targetingArray = []
          if (advertisement.targeting){
            targetingArray = advertisement.targeting
          }
          var checkShowArray = []
          advertisement.dontShow ? checkShowArray = advertisement.dontShow.filter(node => node.slug === post.slug) : checkShowArray = [];
          if (checkShowArray.length === 0){
            return(
                 adsArray.push({'image': advertisement.image.fluid, 'title': advertisement.title, 'link': advertisement.link, 'targeting' : targetingArray})
             )
          }else{
            return false
          }
        }else{
          return false
        }
      })
      var finalAdsArray = []
      var matchArray = []
      var matchPostArray = []
      var matchAuthorArray = []
      var matchCategoryArray = []
      var matchTagArray = []
      adsArray.map(function(advertisement){
        return(
          advertisement.targeting.map(function (target) {
            if (target.internal.type === 'ContentfulCategory'){
              matchCategoryArray = adsArray.filter(function (node) {
                  return node.targeting.some(function (elem) {
                        return post.categories.some(item => item.slug === elem.slug);
                      });
              });
            }else if (target.internal.type === 'ContentfulTag' && post.tags){
              matchTagArray = adsArray.filter(function (node) {
                  return node.targeting.some(function (elem) {
                        return post.tags.some(item => item.slug === elem.slug);
                      });
              });
            }else if (target.internal.type === 'ContentfulPost'){
              matchPostArray = adsArray.filter(function (node) {
                  return node.targeting.some(function (elem) {
                    return elem.slug === post.slug
                  });
              });
            }else if (target.internal.type === 'ContentfulAuthor' && post.author){
              matchAuthorArray = adsArray.filter(function (node) {
                  return node.targeting.some(function (elem) {
                        return(
                          elem.slug ===  post.author.slug
                        )
                      });
              });
            }else{
              return false
            }
            return false
          })
        )
      })

      if (matchPostArray.length > 0){
        matchArray.push(matchPostArray)
      }

      if (matchAuthorArray.length > 0 && matchPostArray.length === 0){
        matchArray.push(matchAuthorArray)
      }

      if (matchCategoryArray.length > 0 && matchAuthorArray.length === 0 && matchPostArray.length === 0){
        matchArray.push(matchCategoryArray)
      }
      if (matchTagArray.length > 0 && matchAuthorArray.length === 0 && matchPostArray.length === 0){
        matchArray.push(matchTagArray)
      }

      matchArray = [].concat.apply([], matchArray);

      if (matchArray.length === 0){
        finalAdsArray = adsArray
        finalAdsArray = finalAdsArray.filter(function(val) {
          return val.targeting.length < 1;
        });
      }else{
        finalAdsArray = matchArray
      }
      if (finalAdsArray.length > 0){
        bodyWidth = 'stickyArea-ads'
      }
    }


    return (
      <Layout>
      <Helmet>
        <title>{`${post.title} | ${siteMetadata.title}`}</title>
      </Helmet>
      <SEO pagePath={post.slug} postNode={postNode} postSEO/>
        <div className={'imageContainer darkModeLightBackground'}>
            {displayAdsAbove(this.props.data)}
          <div className={'image'}>
            {post.categories &&
            <div className={'postCategory'}><Link to={`/category/${_.kebabCase(post.categories[0].slug)}`}><p>{post.categories[0].title}</p></Link></div>
            }
            <h1 className={'title'}>{post.title}</h1>
            {post.author &&
            <p className={'postAuthor'}><Link to={`/author/${post.author.slug}`}><span className={'author_text'} style={{fontWeight:'600'}}>Written by:</span> {post.author.title}</Link></p>
            }
            <div style={{position:'relative'}}>
              {post.video ? (
              <div className={'videoWrapper'}>
              <iframe title={post.video.id} width="560" height="315" src={post.video} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
              ) : (
                <div>
                {post.image &&
                  <div>
                  <Img fluid={post.image.fluid} alt={post.image.title}/>
                  <div className={'caption'}>{post.image.description}</div>
                  </div>
                }
                </div>
              )}
              <div className={'showMobile'}>
                <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center', padding:'0px 15px 5px 15px'}}>
                  <CounterNumber
                    databaseId={this.props.data.contentfulPost.id}
                  />
                  <Link to="/download/" >
                  <div className={'downloadContainerMobile'}>
                  </div>
                  </Link>
                  <MobileSocial
                    slug={post.slug}
                    title={post.title}
                    shareUrl={siteMetadata.siteUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${bodyWidth} ${'postContainer hideDesktop'}`}>
            <div style={{minWidth:'60px', display:'flex', position:'relative'}}>
              <Sticky boundaryElement=".postContainer" style={{position:'relative'}} hideOnBoundaryHit={false}>
              <div style={{width:'60px', paddingTop:'3em'}}>
                <CounterNumber
                  databaseId={this.props.data.contentfulPost.id}
                />
                <Link to="/download/">
                <div className={'downloadContainer'}>
                </div>
                </Link>
                <Social
                  slug={post.slug}
                  title={post.title}
                  shareUrl={siteMetadata.siteUrl}
                />
                </div>
              </Sticky>
            </div>
        <PostBody post body={post.copy} />

        {displayAdsSide(this.props.data, true)}


        </div>
        {post.tags && <TagList class={bodyWidth} tags={post.tags} />}
        <div className={'showMobile'}>
        {displayAdsSide(this.props.data)}
        </div>
        <div className={'darkModeMidBackground stayConnectedBackground'} style={{ padding:'2% 5% 5% 5%', zIndex:'2', position:'relative'}}>
          <div className={'connect'}>
            <h4 className="stayConnected">Stay Connected</h4>
            <Tabs>
              <div label="Subscribe">
                <Mailchimp />
              </div>
              <div label="Get in Contact">
                <Contact />
              </div>
            </Tabs>
          </div>
        </div>
        <div style={{zIndex:'1', position:'relative'}}>
        {displayAdsBelow(this.props.data)}
        {finalrelatedPosts.length > 0 &&
        <h4 className={'darkModeText'} style={{margin:'35px auto 5px auto', textAlign:'center'}}>You might also like</h4>
        }
        <CardContainer>
        {finalrelatedPosts.slice(0, 3).map((related) => {
          return(
              <Card key={related.node.id}
                slug={related.node.slug}
                title={related.node.title}
                categories={related.node.categories}
                category={related.node.category}
                date={related.node.publishDate}
                image={related.node.image}
                excerpt={related.node.copy}
                columns={'col-3'}
                />
              )
        })}
        </CardContainer>
        </div>
      </Layout>
    )
  }
}
export default BlogPostTemplate
export const postQuery = graphql`
  query ($slug: String!, $category: String ) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    contentfulPost(slug: { eq: $slug }) {
      title
      id
      slug
      seoTitle
      metaDescription {
        internal {
          content
        }
      }
      publishDate(formatString: "MMM DD, YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        id
        title
        slug
      }
      author {
        title
        slug
      }
      video
      image {
        title
        description
        fluid(maxWidth: 900) {
          ...GatsbyContentfulFluid
        }
        ogimg: resize(width: 1200) {
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
      categories {
        id
        title
        slug
      }
    }
    allContentfulPost(
      limit: 10,
      sort: { fields: [publishDate], order: DESC },
      filter: {categories: {elemMatch: {title: {in: [$category]}}}}
    ) {
      edges {
        node {
          id
          slug
          title
          publishDate (formatString: "MMM DD, YYYY")
          categories {
            id
            title
            slug
          }
          image{
            title
            fluid(maxWidth: 400, maxHeight:300) {
              ...GatsbyContentfulFluid
            }
          }
          copy {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 120)
            }
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
            dontShow{
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
            }
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
    postImage: file(relativePath: {eq: "backupImage.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
