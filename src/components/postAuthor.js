import React from 'react'
import connectEmail from '../../static/connect-email.svg'
import connectFacebook from '../../static/connect-facebook.svg'
import connectInsta from '../../static/connect-insta.svg'
import connectWeb from '../../static/connect-website.svg'
import contactStyles from './contactStyles.module.css'
import Img from 'gatsby-image'
import { Link } from 'gatsby'


const PostAuthor = (props) => {
    const author = props.author
  return(
    <div style={{textAlign:'center', padding:'25px', borderTop:'1px solid #e3e3e3', margin:'10px auto', maxWidth:'800px', position:'relative'}}>
        {author.logo &&
          <Link to={`/author/${author.slug}`}>
          <div className={contactStyles.authorLogo}>
          <Img fixed={author.logo.fixed} alt={author.title}/>
          </div>
          </Link>
        }
        <Link to={`/author/${author.slug}`}><h3 style={{margin:'25px 0 10px 0'}}>{author.title}</h3></Link>
        {author.copy &&
        <p dangerouslySetInnerHTML={{
            __html: author.copy.childMarkdownRemark.html,
          }}/>
        }
        <p style={{fontWeight:'600'}}>{author.address}</p>
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
      </div>
    </div>

  )
}
export default PostAuthor
