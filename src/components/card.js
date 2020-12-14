import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import cardStyles from './cardStyles.module.css'
const _ = require('lodash')


const Card = props => {
return (
  <div className={`${cardStyles.lightCard} ${props.columns}`}>
      {props.image &&
      <Link to={`/${props.slug}/`}>
        <Img fluid={props.image.fluid} alt={props.image.title}/>
      </Link>
      }
      <div className={'darkModeMidBackground'} style={{padding:'.5em .5em 1em .5em'}}>
      {props.categories &&
        props.categories.map((category, index) => {
        return(
          <div key={index} className={cardStyles.category}><Link to={`/category/${_.kebabCase(category.slug)}/`}>{category.title}</Link></div>
          )
        })
      }
        <span className={`${cardStyles.lightCardDate} ${'lightCardDate'}`}style={{fontSize:'.7em'}}>{props.date}</span>
        <Link to={`/${props.slug}/`}>
        <h4 style={{wordBreak:'break-word', marginTop:'10px'}}>{props.title}</h4>
        <div className ={cardStyles.cardText}>
        <p
          dangerouslySetInnerHTML={{
            __html: props.excerpt.childMarkdownRemark.excerpt,
          }}
        />
        </div>
        </Link>
      </div>
  </div>
  )
}

export default Card
