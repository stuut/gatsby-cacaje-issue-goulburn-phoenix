import React from "react"
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from "gatsby"
import headerStyles from './headerStyles.module.css'
import MobileMenuLinks from './MobileMenuLinks'

const activeLinkStyle = {
  color: '#8fc744',

}

const MenuLinks= () => {
    const data = useStaticQuery(graphql`
      query MainMenuQuery {
        allContentfulMenu(filter: {title: {eq: "Main Menu"}}) {
          edges {
            node {
              id
              title
              links {
                __typename
                ... on Node {
                  ... on ContentfulPost {
                    id
                    slug
                    title
                    internal {
                      type
                    }
                  }
                }
                ... on Node {
                  ... on ContentfulTag {
                    id
                    slug
                    title
                    internal {
                      type
                    }
                  }
                }
                ... on Node {
                  ... on ContentfulPage {
                    id
                    slug
                    title
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
                  ... on ContentfulExternalLink {
                    id
                    slug
                    title
                    internal {
                      type
                    }
                  }
                }
                ... on Node {
                  ... on ContentfulInternalLink {
                    id
                    slug
                    title
                    internal {
                      type
                    }
                  }
                }
                ... on Node {
                ... on ContentfulSubMenu {
                    id
                    title
                    subMenuReferences {
                      __typename
                      ... on Node {
                        ... on ContentfulCategory {
                          id
                          title
                          slug
                          spaceId
                          internal {
                            type
                          }
                        }
                      }
                      ... on Node {
                        ... on ContentfulExternalLink {
                          id
                          slug
                          title
                          internal {
                            type
                          }
                        }
                      }
                      ... on Node {
                        ... on ContentfulInternalLink {
                          id
                          slug
                          title
                          internal {
                            type
                          }
                        }
                      }
                      ... on Node {
                        ... on ContentfulPage {
                          id
                          slug
                          title
                          internal {
                            type
                          }
                        }
                      }
                      ... on Node {
                        ... on ContentfulPost {
                          id
                          slug
                          title
                          internal {
                            type
                          }
                        }
                      }
                      ... on Node {
                        ... on ContentfulTag {
                          id
                          slug
                          title
                          node_locale
                          contentful_id
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
        }
      }

    `)
    return (
      <div>
      <MobileMenuLinks />
        <div className={headerStyles.menuLinks}>
          {data.allContentfulMenu.edges[0].node.links.map((item, index) => {
            return(
              <div key={index} >
                {item.subMenuReferences ? (
                  <div className={headerStyles.headerMenuDropDown}>
                    <div className={headerStyles.headerMenuDropDownButton}>
                      {item.title}
                      <div className={headerStyles.headerMenuDropDownHilight}></div>
                    </div>
                    <div className={`${headerStyles.headerMenuDropDownContent} ${'darkModeBlack'}`}>
                    <div>
                    {item.subMenuReferences.map((item, index) => {
                        if(item.__typename === 'ContentfulCategory'){
                          return <Link key={index} to={`/category/${item.slug}/`} activeStyle={activeLinkStyle}>{item.title}</Link>
                        }else if(item.__typename === 'ContentfulTag'){
                          return<Link key={index}  to={`/tag/${item.slug}/`} activeStyle={activeLinkStyle}>{item.title}</Link>
                        }else if(item.__typename === 'ContentfulAuthor'){
                            return<Link key={index}  to={`/author/${item.slug}/`} activeStyle={activeLinkStyle}>{item.title}</Link>
                        }else if(item.__typename === "ContentfulPost" || item.__typename === "ContentfulPage" || item.__typename === "ContentfulInternalLink"){
                          return<Link key={index}  to={`/${item.slug}/`} activeStyle={activeLinkStyle}>{item.title}</Link>
                        }else if(item.__typename === "ContentfulExternalLink"){
                          return<a href={`${item.slug}`} key={index} activeStyle={activeLinkStyle}>{item.title}</a>
                        }else{
                          return null
                        }
                    })
                    }
                      </div>
                    </div>
                  </div>
                ):(
                  <>
                  {item.__typename === "ContentfulTag" &&
                    <div className={`${headerStyles.headerMenuSingleButton} ${'darkModeText'}`}>
                    <Link className={'darkModeText'} style={{color:'000000'}} to={`/tag/${item.slug}/`} activeStyle={activeLinkStyle}>{item.title}</Link>
                    </div>
                  }
                  {item.__typename === "ContentfulCategory" &&
                    <div className={`${headerStyles.headerMenuSingleButton} ${'darkModeText'}`}>
                    <Link className={'darkModeText'} style={{color:'000000'}} to={`/category/${item.slug}/`} activeStyle={activeLinkStyle}>{item.title}</Link>
                    </div>
                  }
                  {item.__typename === "ContentfulAuthor" &&
                    <div className={`${headerStyles.headerMenuSingleButton} ${'darkModeText'}`}>
                    <Link className={'darkModeText'} style={{color:'000000'}} to={`/author/${item.slug}/`} activeStyle={activeLinkStyle}>{item.title}</Link>
                    </div>
                  }
                  {(item.__typename === "ContentfulPost" || item.__typename === "ContentfulPage" || item.__typename === "ContentfulInternalLink") &&
                    <div className={`${headerStyles.headerMenuSingleButton} ${'darkModeText'}`}>
                    <Link className={'darkModeText'} style={{color:'000000'}} to={`/${item.slug}/`} activeStyle={activeLinkStyle}>{item.title}</Link>
                    </div>
                  }
                  {item.__typename === "ContentfulExternalLink" &&
                    <div className={`${headerStyles.headerMenuSingleButton} ${'darkModeText'}`}>
                    <a href={`${item.slug}`} className={'darkModeText'} style={{color:'000000'}} activeStyle={activeLinkStyle}>{item.title}</a>
                    </div>
                  }
                  </>
                )
                }
              </div>
                )
          })}
        </div>
      </div>
    )

}
export default MenuLinks
