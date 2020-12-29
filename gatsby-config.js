
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config = require('./src/utils/siteConfig')






module.exports = {
  siteMetadata: {
      title: config.siteTitle,
      description: config.siteDescription,
      keywords: 'Goulburn, Phoenix, news, blog',
      siteUrl: config.siteUrl,
      shareImage: config.shareImage,
      rssMetadata: {
        site_url: config.siteUrl,
        feed_url: `${config.siteUrl}/rss.xml`,
        title: config.siteTitle,
        description: config.siteDescription,
        image_url: `${config.siteUrl}${config.siteLogo}`,
        author: config.author,
        copyright: config.copyright,
    },
    },
  pathPrefix: '/gatsby-starter-blog',
  plugins: [

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 900,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-plugin-react-helmet`,
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-plugin-dark-mode',
        ],
      },
    },
    {
    resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: require.resolve(`src/OneSignalSDKWorker.js`),
      },
    },

    {
    resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
         families: [
           'Chivo:700,900', 'sans-serif',
           'Overpass:300,900', 'sans-serif',
         ]
        }
      }
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://goulburnphoenix.us2.list-manage.com/subscribe/post?u=3cdd5b5ea0fde2adbad102a7b&amp;id=3dc4ad5337', // see instructions section below
      },
    },
    {
    resolve: 'gatsby-source-contentful',
      options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID || '',
       accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
       //host: `preview.contentful.com`,
       downloadLocal: true,

      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
    resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-5GKQNMJ',
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.GATSBY_API_KEY,
           authDomain: process.env.GATSBY_AUTH_DOMAIN,
           databaseURL: process.env.GATSBY_DATABASE_URL,
           projectId: process.env.GATSBY_PROJECT_ID,
           storageBucket: process.env.GATSBY_STORAGE_BUCKET,
           messagingSenderId: process.env.GATSBY_MESSAGING_ID,
           appId: process.env.GATSBY_APP_ID,
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Goulburn Phoenix`,
        short_name: `The Goulburn Phoenix`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#8fc744`,
        display: `minimal-ui`,
        icon: `src/assets/site-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata
          ret.allMarkdownRemark = ref.query.allMarkdownRemark
          ret.generator = 'The Goulburn Phoenix'
          return ret
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                author
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata
              return ctx.query.allContentfulPost.edges.map((edge) => ({
                date: edge.node.publishDate,
                title: edge.node.title,
                description: edge.node.copy.childMarkdownRemark.excerpt,
                author: rssMetadata.author,
                url: rssMetadata.site_url + '/' + edge.node.slug,
                guid: rssMetadata.site_url + '/' + edge.node.slug,
                custom_elements: [
                  {
                    'content:encoded': edge.node.copy.childMarkdownRemark.html,
                  },
                  {
                    'category': edge.node.categories,
                  },
                  {
                    'enclosure': {
                      _attr: {
                        url: edge.node.image ?  'https:' + edge.node.image.resize.src : 'https://images.ctfassets.net/hpkba8nqh4iv/7ygieQ54WiXJvnFeIq3zTJ/ebd26d206a8dfa7e0a4ac9d0048d4947/GOULBURN_PHOENIX-1200x800.jpg',
                        length : edge.node.image ?  edge.node.image.file.details.size : 1200 ,
                        type: edge.node.image ?  edge.node.image.file.contentType : 'image/jpeg',
                      },
                    },
                  },
                ],
              }))
            },
            query: `
              {
            allContentfulPost (limit: 1000, sort: {fields: [publishDate], order: DESC}) {
               edges {
                 node {
                   title
                   slug
                   categories{
                     title
                   }
                   tags {
                     title
                   }
                   publishDate(formatString: "MMMM DD, YYYY")
                   image{
                      file{
                        contentType
                        details {
                          size
                        }
                        fileName
                        url
                      }
                      resize(width: 600) {
                          src
                          width
                          height
                      }
                   }
                   copy {
                     childMarkdownRemark {
                       html
                       excerpt(pruneLength: 200)
                     }
                   }
                 }
               }
             }
           }
           `,
            output: '/rss.xml',
          },
        ],
      },
    },
  ],
}
