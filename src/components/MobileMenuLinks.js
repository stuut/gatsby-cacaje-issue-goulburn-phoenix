import React, { useState } from "react"
import { Link } from 'gatsby'
import MobileMenuToggle from './MobileMenuToggle'
import { useStaticQuery, graphql } from "gatsby"
import headerStyles from './headerStyles.module.css'

const activeLinkStyle = {
  color: '#8fc744',

}

const MobileMenuLinks = () => {
   const [ menuActive, setMenuState ] = useState(false);
    const data = useStaticQuery(graphql`
      query MobileMenuQuery {
        allContentfulMenu(filter: {title: {eq: "Mobile Menu"}}) {
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
        <div className={`${headerStyles.newMobileMenuOverlay} ${menuActive ? headerStyles.newMobileMenuOverlayActive : headerStyles.newMobileMenuOverlayNotactive}`}></div>
        <div role="button" aria-label="Open Menu" style={{outline:'0'}} tabIndex={0} className={headerStyles.toggleMenu} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}><span></span><span></span><span></span></div>
        <div className={`${headerStyles.newMobileMenu} ${menuActive ? headerStyles.open : headerStyles.closed}`}>
        <div role="button" aria-label="Close Menu"  style={{outline:'0'}} tabIndex={0} className={headerStyles.closeMenu} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}><span></span><span></span></div>
          {data.allContentfulMenu.edges[0].node.links.map((item, index) => {
            return(
              <div key={index} >
                {item.subMenuReferences ? (
                  <MobileMenuToggle heading={item.title}>
                    {item.subMenuReferences.map((item, index) => {
                        if(item.__typename === 'ContentfulCategory'){
                          return <Link key={index} to={`/category/${item.slug}/`} activeStyle={activeLinkStyle} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}>{item.title}</Link>
                        }else if(item.__typename === 'ContentfulTag'){
                          return<Link key={index} to={`/tag/${item.slug}/`} activeStyle={activeLinkStyle} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}>{item.title}</Link>
                        }else if(item.__typename === 'ContentfulAuthor'){
                          return<Link key={index} to={`/author/${item.slug}/`} activeStyle={activeLinkStyle} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}>{item.title}</Link>
                        }else if(item.__typename === "ContentfulPost" || item.__typename === "ContentfulPage" || item.__typename === "ContentfulInternalLink"){
                          return<Link key={index} to={`/${item.slug}/`} activeStyle={activeLinkStyle} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}>{item.title}</Link>
                        }else if(item.__typename === "ContentfulExternalLink" || item.__typename === "ContentfulPage" || item.__typename === "ContentfulInternalLink"){
                            return<a key={index} href={`${item.slug}`} activeStyle={activeLinkStyle} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}>{item.title}</a>
                        }else{
                          return null
                        }
                    })
                    }
                  </MobileMenuToggle>
                ):(
                  <>
                  {item.__typename === "ContentfulTag" &&
                    <Link style={{marginBottom:'15px', display:'block'}} to={`/tag/${item.slug}/`} activeStyle={activeLinkStyle} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}>{item.title}</Link>
                  }
                  {item.__typename === "ContentfulCategory" &&
                    <Link style={{marginBottom:'15px', display:'block'}} to={`/category/${item.slug}/`} activeStyle={activeLinkStyle} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}>{item.title}</Link>
                  }
                  {item.__typename === "ContentfulAuthor" &&
                  <Link style={{marginBottom:'15px', display:'block'}} to={`/author/${item.slug}/`} activeStyle={activeLinkStyle} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}>{item.title}</Link>
                  }
                  {(item.__typename === "ContentfulPost" || item.__typename === "ContentfulPage" || item.__typename === "ContentfulInternalLink") &&
                    <Link style={{marginBottom:'15px', display:'block'}} to={`/${item.slug}/`} activeStyle={activeLinkStyle} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}>{item.title}</Link>
                  }
                  {item.__typename === "ContentfulExternalLink" &&
                    <a href={`${item.slug}`} style={{marginBottom:'15px', display:'block'}} activeStyle={activeLinkStyle} onClick={() => setMenuState(!menuActive)} onKeyDown={() => setMenuState(!menuActive)}>{item.title}</a>
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
export default MobileMenuLinks
