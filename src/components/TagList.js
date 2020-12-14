import React from 'react'
import { Link } from 'gatsby'
import tagListStyles from './tagListStyles.module.css'



const TagList = props => {
  return (
    <ul className={`${tagListStyles.taglist} ${props.class} ${'tags'}`}>
         <li style={{fontWeight:"600", display:'inline-block', marginRight:'.5em'}}>Topics:</li>
      {props.tags.map(tag => (
        <li key={tag.id}>
          <Link to={`/tag/${tag.slug}/`}>{tag.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default TagList
