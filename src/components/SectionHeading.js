import React from 'react'
import sectionHeadingStyles from './sectionHeading.module.css'
import { Link } from 'gatsby'


const SectionHeading = props => {


return (
  <div className={`${sectionHeadingStyles.sectionHeadingText} ${props.textColour} ${'darkModeSectionHeading'}` }>
    {props.link ? (
      <Link to={`/${props.link}/`}>
        <p className={`${sectionHeadingStyles.sectionHeadingText} ${props.textColour}` } >{props.text}</p>
      </Link>
    ) : (
      <p>{props.text}</p>
    )}
</div>

  )
}
export default SectionHeading
