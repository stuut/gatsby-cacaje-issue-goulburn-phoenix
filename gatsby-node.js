const path = require(`path`)
const _ = require('lodash')





exports.createSchemaCustomization = ({ actions }) => {
  actions.printTypeDefinitions({path: './typeDefs.txt'})
  const { createTypes } = actions
  const typeDefs = `
  type ContentfulAdManager implements Node{
    title: String
    displayAds: Boolean
    ads: [ContentfulAdModule] @link(by: "id", from: "ads___NODE")
  }

  type ContentfulAdModule implements Node {
    link: String
    title: String
    adPosition: [String]
    image: ContentfulAsset @link(by: "id", from: "image___NODE")
    dontShow: [ContentfulPost] @link(by: "id", from: "dontShow___NODE")
  }



  type ContentfulModule implements Node{
    postsToShow: String
    title: String
    coverStory: Boolean
    moduleDesignType: String
  }


  type ContentfulPost implements Node{
    video: String
    seoTitle: String
    image: ContentfulAsset @link(by: "id", from: "image___NODE")
    title: String
    slug: String
    updatedAt: Date @dateformat
    publishDate: Date @dateformat
    tags: [ContentfulTag] @link(by: "id", from: "tags___NODE")
    categories: [ContentfulCategory] @link(by: "id", from: "categories___NODE")
    author: ContentfulAuthor @link(by: "id", from: "author___NODE")
    copy: contentfulPostCopyTextNode @link(by: "id", from: "copy___NODE")
    coverStory: Boolean
    metaDescription: contentfulPostMetaDescriptionTextNode @link(by: "id", from: "metaDescription___NODE")
  }

  type ContentfulAuthor implements Node{
    updatedAt: Date @dateformat
    address: String
    phoneNumber: String
    website: String
    email: String
    facebook: String
    instagram: String
    twitter: String
    title: String
    slug: String
    image: ContentfulAsset @link(by: "id", from: "image___NODE")
    post: [ContentfulPost] @link(by: "id", from: "post___NODE")
    copy: contentfulAuthorCopyTextNode @link(by: "id", from: "copy___NODE")
  }



  type ContentfulPage implements Node {
    pdfUrl: String
    seoTitle: String
    metaImage: ContentfulAsset @link(by: "id", from: "metaImage___NODE")
  }

  `

  createTypes(typeDefs)
}




exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const loadPosts = new Promise((resolve, reject) => {
    graphql(`
      {
         allContentfulPost {
          edges {
            node {
              id
              slug
              categories {
                title
               }
            }
          }
        }
      }
    `).then(result => {

      result.data.allContentfulPost.edges.map(({ node }) => {

        const nodes = node.categories
        let categories = []
        // Iterate through each post, putting all found categories into `categories`
        if (nodes){
          nodes.forEach(category => {
              categories.push(category.title)
          })
        }
        // Eliminate duplicate tags

         categories = _.uniq(categories)

        let category = categories[0];

        if (categories[0] == null){
          let category = 'Across The Hilltops';
        }

        createPage({
          path: `${node.slug}/`,
          component: path.resolve('./src/templates/blogPost.js'),
          context: {
            slug: node.slug,
            category: category,
            id: node.id,
          },
        })
      })
      resolve()
    })
  })

  const loadTags = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulTag {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allContentfulTag.edges.map(({ node }) => {
        createPage({
          path: `tag/${node.slug}/`,
          component: path.resolve('./src/templates/tag.js'),
          context: {
            slug: node.slug,
          },
        })
      })
      resolve()
    })
  })

  const loadCategories = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulCategory {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allContentfulCategory.edges.map(({ node }) => {
          createPage({
            path: `category/${node.slug}/`,
            component: path.resolve('./src/templates/category.js'),
            context: {
              slug: node.slug,
            },
          })
      })
      resolve()
    })
  })

  const loadAuthor = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulAuthor {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {

      result.data.allContentfulAuthor.edges.map(({ node }) => {
        createPage({
          path: `author/${node.slug}/`,
          component: path.resolve('./src/templates/author.js'),
          context: {
            slug: node.slug,
          },
        })
      })
      resolve()
    })
  })

  const loadPage = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPage {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `).then(result => {

      result.data.allContentfulPage.edges.map(({ node }) => {
        createPage({
          path: `${node.slug}`,
          component: path.resolve('./src/templates/page.js'),
          context: {
            slug: node.slug,
          },
        })
      })
      resolve()
    })
  })



  return Promise.all([loadPosts, loadTags, loadAuthor, loadPage ])
}
