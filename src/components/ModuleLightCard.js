import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import cardStyles from './cardStyles.module.css'
const _ = require('lodash')


const ModuleLightCard = props => {
  function categoryLink(props){
    if (props.postType === 'Author'){
      return  <div style={{margin:'10px 0px 0px 10px'}}><div style={{marginBottom:'0px'}} className={cardStyles.category}><Link to={`/author/${_.kebabCase(props.slug)}/`}>Author</Link></div></div>
    }else if (props.postType === 'Post'){
      return(
        <div style={{margin:'10px 0px 0px 10px'}}>
        {props.categories.map((category, index) => {
        return(
          <div style={{marginBottom:'0px'}} key={index} className={cardStyles.category}><Link to={`/category/${_.kebabCase(category.slug)}/`}>{category.title}</Link></div>
          )
        })}
        </div>
      )
    }else if (props.postType === 'Page'){
          return(
            <div>
            </div>
          )
        }
  }

  function excerpt(props){
    if (props.postType === 'Author'){
      return  (
        <div style={{padding:'0em .5em 1em .5em'}}>
        <Link to={`/author/${_.kebabCase(props.slug)}/`}>
        <h4 style={{wordBreak:'break-word', marginTop: '10px'}}>{props.title}</h4>
        <div className ={cardStyles.cardText}>
        <p
          dangerouslySetInnerHTML={{
            __html: props.excerpt.childMarkdownRemark.excerpt,
          }}
        />
        </div>
        </Link>
        </div>
      )
    }else if (props.postType === 'Post'){
      return(
        <div style={{padding:'0em .5em 1em .5em'}}>
        <span className={'lightCardDate'} style={{fontSize:'.7em', color:'#666', display:'inline-block'}}>{props.date}</span>
        <Link to={`/${props.slug}/`}>
        <h4 style={{wordBreak:'break-word', marginTop: '10px'}}>{props.title}</h4>
        <div className ={cardStyles.cardText}>
        <p
          dangerouslySetInnerHTML={{
            __html: props.excerpt.childMarkdownRemark.excerpt,
          }}
        />
        </div>
        </Link>
        </div>
      )
    }else if (props.postType === 'Page'){
      return(
        <div style={{padding:'0em .5em 1em .5em'}}>
        <Link to={`/${props.slug}/`}>
        <h4 style={{wordBreak:'break-word', marginTop: '10px'}}>{props.title}</h4>
        <div className ={cardStyles.cardText}>
        {props.excerpt.childMarkdownRemark &&
          <p
            dangerouslySetInnerHTML={{
              __html: props.excerpt.childMarkdownRemark.excerpt,
            }}
          />
        }
        {props.excerpt.internal &&
        <p>
           {props.excerpt.internal.content}
          </p>
        }
        </div>
        </Link>
        </div>
      )
    }
  }
  function image(props){
    if (props.postType === 'Author'){
      return(
        <Link to={`/author/${_.kebabCase(props.slug)}/`}>
          <Img fluid={props.image.fluid} alt={props.image.title}/>
        </Link>
      )
    }else if (props.postType === 'Post'){
      return(
        <Link to={`/${props.slug}/`}>
          <Img fluid={props.image.fluid} alt={props.image.title}/>
        </Link>
      )
    }else if (props.postType === 'Page'){
      return(
        <>
        {props.image &&
        <Link to={`/${props.slug}/`}>
          <Img fluid={props.image.fluid} alt={props.image.title}/>
        </Link>
        }
        </>
      )
    }
  }


return (
  <div className={`${cardStyles.lightCard} ${props.columns}  ${'darkModeMidBackground'}`}>

      {props.image &&
        image(props)
      }
        {categoryLink(props)}
        {excerpt(props)}



  </div>
  )
}

export default ModuleLightCard
