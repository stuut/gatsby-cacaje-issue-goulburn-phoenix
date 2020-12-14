import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import cardStyles from './cardStyles.module.css'
const _ = require('lodash')


const DarkCard = props => {
return (
  <div className={`${cardStyles.darkCard} ${props.columns} ${'darkModeMidBackgroundMobile'}` }>
      {props.image &&
      <Link to={`/${props.slug}/`}>
      <Img fluid={props.image.fluid} alt={props.image.title}/>
      </Link>
      }
      <div className={cardStyles.darkCardCover}></div>
      <div className={cardStyles.cardInfo}>

      {props.categories &&
        props.categories.map((category, index) => {
        return(
          <div key={index} className={cardStyles.category}><Link to={`/category/${_.kebabCase(category.slug)}/`}>{category.title}</Link></div>
          )
        })
      }
      <span className ={`${cardStyles.darkCardDateSpan} ${'lightCardDate'}`} style={{fontSize:'.7em', color:'#666'}}>{props.date}</span>
        <Link to={`/${props.slug}/`}>
          <h4 style={{marginTop:'10px'}}>{props.title}</h4>
          <p className ={cardStyles.darkCardDate} style={{fontSize:'.7em', color:'#ffffff', marginTop:'5px'}}>{props.date}</p>
          <div className ={cardStyles.darkCardText}>
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

export default DarkCard
