import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ModuleMasonryPosts from '../components/ModuleMasonryPosts'
import ModuleCategory from '../components/ModuleCategory'
import ModuleSlider from '../components/ModuleSlider'
import ModuleAdvertisement from '../components/ModuleAdvertisement'
import IndexMain from '../components/IndexMain'

import SEO from '../components/SEO'


class BlogIndex extends React.Component {

  render() {
  const sections = this.props.data.contentfulModularPage.sections;
  return (
      <Layout>
      <SEO/>
        <div>
        <IndexMain
        posts={this.props.data.mainPosts.edges}
        heading={'UPFRONT NEWS'}
        />
        {sections.map((section, index) => {
          if(section.moduleDesignType === 'Masonry Grid' && section.references.length > 0){
            return <ModuleMasonryPosts key={index} title={section.title} posts={section.references}  postsToShow={section.postsToShow ? section.postsToShow : null} coverStory={section.coverStory? section.coverStory : null}/>
          }else if(section.moduleDesignType === '4 Post Grid' && section.references.length > 0){
            return <ModuleCategory key={index} title={section.title} posts={section.references}  coverStory={section.coverStory}/>
          }else if(section.moduleDesignType === 'Slider' && section.references.length > 0){
            return <ModuleSlider key={index} title={section.title} posts={section.references}  postsToShow={section.postsToShow ? section.postsToShow : null} coverStory={section.coverStory? section.coverStory : null}/>
          }else if(section.__typename === 'ContentfulAdModule'){
            return <ModuleAdvertisement key={index} id={section.id} title={section.title} image={section.image}  link={section.link}/>
          }else{
            return null
          }
        })}
        </div>
      </Layout>
    )
  }
}

export default BlogIndex
export const postsQuery = graphql`
query{
  site {
    siteMetadata {
      title
      siteUrl
      description
      keywords
    }
  }
  mainPosts: allContentfulPost(
    limit: 4,
    sort: {fields: [publishDate], order: DESC},
    filter: {coverStory: {eq: true},}
    ){
    edges {
      node {
        id
        slug
        title
        categories {
          title
          slug
        }
        image {
          title
          fluid(maxWidth: 1800, maxHeight:1000) {
            ...GatsbyContentfulFluid
          }
          ogimg: resize(width: 1800) {
            src
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
  contentfulModularPage(title: {eq: "Home"}) {
    id
    sections {
      ... on Node {
        ... on ContentfulAdModule {
          id
          title
          image {
            id
            fluid(maxWidth: 730, quality: 80) {
              ...GatsbyContentfulFluid
            }
          }
          adPosition
          link
        }
      }
      ... on Node {
        ... on ContentfulModule {
          id
          title
          moduleDesignType
          coverStory
          postsToShow
          references {
            __typename
            ... on Node {
              ... on ContentfulCategory {
                id
                post {
                  id
                  title
                  slug
                  coverStory
                  updatedAt
                  publishDate
                  internal {
                    type
                  }
                  author {
                    title
                    slug
                  }
                  copy {
                    childMarkdownRemark {
                      excerpt(pruneLength: 120)
                    }
                  }
                  categories {
                    title
                    slug
                  }
                  image {
                    title
                    fluid(maxWidth: 768, maxHeight:512 ) {
                     ...GatsbyContentfulFluid
                   }
                  }
                  tags {
                    title
                    slug
                  }
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
                post {
                  id
                  title
                  slug
                  coverStory
                  publishDate
                  updatedAt
                  internal {
                    type
                  }
                  author {
                    title
                    slug
                  }
                  copy {
                    childMarkdownRemark {
                      excerpt(pruneLength: 120)
                    }
                  }
                  tags {
                    title
                    slug
                  }
                  categories {
                    title
                    slug
                  }
                  image {
                    title
                    fluid(maxWidth: 768, maxHeight:512 ) {
                      ...GatsbyContentfulFluid
                    }
                  }
                }
              }
            }
            ... on Node {
              ... on ContentfulPost {
                id
                title
                slug
                publishDate
                updatedAt
                coverStory
                internal {
                  type
                }
                author {
                  title
                  slug
                }
                copy {
                  childMarkdownRemark {
                    excerpt(pruneLength: 120)
                  }
                }
                tags {
                  title
                  slug
                }
                categories {
                  title
                  slug
                }
                image {
                  title
                  fluid(maxWidth: 768, maxHeight:512 ) {
                    ...GatsbyContentfulFluid
                  }
                }
              }
            }
            ... on Node {
              ... on ContentfulAuthor {
                id
                slug
                title
                updatedAt
                internal {
                  type
                }
                copy {
                  childMarkdownRemark {
                    excerpt
                  }
                }
                image {
                  title
                  fluid(maxWidth: 768, maxHeight:512, quality: 70 ) {
                    ...GatsbyContentfulFluid
                  }
                }
              }
            }
            ... on Node {
              ... on ContentfulPage {
                id
                title
                slug
                updatedAt
                pdfUrl
                internal {
                  type
                }
                seoTitle
                metaDescription {
                  internal {
                    content
                  }
                }
                metaImage {
                  fluid(maxWidth: 768, maxHeight:512, quality: 70 ) {
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
        }
      }
    }
  }
}
`
