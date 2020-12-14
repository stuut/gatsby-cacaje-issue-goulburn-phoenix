import React from 'react'
import contactStyles from './contactStyles.module.css'
import connectEmail from '../../static/connect-email.svg'
import connectFacebook from '../../static/connect-facebook.svg'
import connectInsta from '../../static/connect-insta.svg'
import connectTwitter from '../../static/connect-twitter.svg'
import connectYoutube from '../../static/connect-youtube.svg'
import config from '../utils/siteConfig'



const Contact = props => {
  return(
  <div className={contactStyles.contactContainer}>
    <div className={contactStyles.contactContainerImg}>
      <a href={`mailto:${config.editorEmail}`}><img src={connectEmail} alt={`${config.siteTitleAlt} Email`}/></a>
    </div>
    {config.instagramUrl &&
    <div className={contactStyles.contactContainerImg}>
      <a href={config.instagramUrl}><img src={connectInsta} alt={`${config.siteTitleAlt} Instagram`}/></a>
    </div>
    }
    {config.facebookUrl &&
    <div className={contactStyles.contactContainerImg}>
      <a href={config.facebookUrl}><img src={connectFacebook} alt={`${config.siteTitleAlt} Facebook`}/></a>
    </div>
    }
    {config.twitterUrl &&
    <div className={contactStyles.contactContainerImg}>
      <a href={config.twitterUrl}><img src={connectTwitter} alt={`${config.siteTitleAlt} Twitter`}/></a>
    </div>
    }
    {config.youtubeUrl &&
    <div className={contactStyles.contactContainerImg}>
      <a href={config.youtubeUrl}><img src={connectYoutube} alt={`${config.siteTitleAlt} YouTube`}/></a>
    </div>
    }
  </div>
  )
}


export default Contact
