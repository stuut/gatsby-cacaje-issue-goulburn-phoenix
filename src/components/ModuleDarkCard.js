import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import cardStyles from './cardStyles.module.css'
const _ = require('lodash')


const ModuleDarkCard = props => {

  function excerpt(props){
    if (props.postType === 'Author'){
      return  (
        <div className={cardStyles.cardInfo}>
        <div className={cardStyles.category}><Link to={`/author/${_.kebabCase(props.slug)}/`}>Author</Link></div>
        <span className ={cardStyles.darkCardDateSpan} style={{fontSize:'.7em', color:'#fff'}}>{props.date}</span>
          <Link to={`/${props.slug}/`}>
            <h4 style={{wordBreak:'break-word'}}>{props.title}</h4>
            <p className ={`${cardStyles.darkCardText}  ${'darkModeText'}`}
              dangerouslySetInnerHTML={{
                __html: props.excerpt.childMarkdownRemark.excerpt,
              }}
            />
          </Link>
        </div>
      )
    }else if (props.postType === 'Post'){
      return(
        <div className={cardStyles.cardInfo}>
          {
          props.categories.map((category, index) => {
          return(
            <div key={index} className={cardStyles.category}><Link to={`/category/${_.kebabCase(category.slug)}/`}>{category.title}</Link></div>
            )
          })
          }
          <span className ={`${cardStyles.darkCardDateSpan}`} style={{fontSize:'.7em'}}>{props.date}</span>
          <Link to={`/${props.slug}/`}>
            <p className ={`${cardStyles.darkCardDate} ${'darkModeText'}`} style={{fontSize:'.7em', color:'#ffffff', marginTop:'5px'}}>{props.date}</p>
            <h4 className ={'darkModeText'} style={{wordBreak:'break-word'}}>{props.title}</h4>
            <p className ={`${cardStyles.darkCardText}  ${'darkModeText'}`}
              dangerouslySetInnerHTML={{
                __html: props.excerpt.childMarkdownRemark.excerpt,
              }}
            />
          </Link>

        </div>
      )
    }else if (props.postType === 'Page'){
    return(
      <div className={cardStyles.cardInfo}>
        <span className ={`${cardStyles.darkCardDateSpan}`} style={{fontSize:'.7em'}}>{props.date}</span>
        <Link to={`/${props.slug}/`}>
          <h4 className ={'darkModeText'} style={{wordBreak:'break-word'}}>{props.title}</h4>
          {props.excerpt.childMarkdownRemark &&
          <p className ={`${cardStyles.darkCardText}  ${'darkModeText'}`}
            dangerouslySetInnerHTML={{
              __html: props.excerpt.childMarkdownRemark.excerpt,
            }}
          />
          }
          {props.excerpt.internal &&
          <p className ={`${cardStyles.darkCardText}  ${'darkModeText'}`}>
             {props.excerpt.internal.content}
            </p>
          }
        </Link>

      </div>
    )
  }
}
  function image(props){
    if (props.postType === 'Author'){
      return(
        <React.Fragment>
          <Link to={`/author/${_.kebabCase(props.slug)}/`}>
            <Img fluid={props.image.fluid} alt={props.image.title}/>
          </Link>
          <div className={cardStyles.darkCardCover}></div>
      </React.Fragment>
      )
    }else if (props.postType === 'Post'){
      return(
        <React.Fragment>
        <Link to={`/${props.slug}/`}>
          <Img fluid={props.image.fluid} alt={props.image.title}/>
        </Link>
        <div className={cardStyles.darkCardCover}></div>
      </React.Fragment>
      )
    }else if (props.postType === 'Page'){
      return(
        <React.Fragment>
        {props.image &&
        <Link to={`/${props.slug}/`}>
          <Img fluid={props.image.fluid} alt={props.image.title}/>
        </Link>
        }
        <div className={cardStyles.darkCardCover}></div>
      </React.Fragment>
      )
    }
  }

return (
  <div className={`${cardStyles.darkCard} ${props.columns} ${'darkModeMidBackgroundMobile'}`}>
      {props.image &&
        image(props)
      }
        {excerpt(props)}
  </div>
  )
}

export default ModuleDarkCard
