import React from 'react'
import facebookIcon from '../../static/facebookicon.svg'
import twitterIcon from '../../static/twittericon.svg'
import emailIcon from '../../static/emailicon.svg'
import socialStyles from './socialStyles.module.css'



import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share';

const Social = props => {

  const slug = props.slug;
  const shareUrl = props.shareUrl + '/' + slug;
  const title = props.title;
  return(
    <div className={socialStyles.socialCont}>
    <div>
      <div>
        <FacebookShareButton
          url={shareUrl}
          quote={title}
        >
        <img className={`${socialStyles.socialIcon} ${'darkModeSocial'}`} src={facebookIcon} alt="share on facebook"/>
        </FacebookShareButton>
      </div>
      <div>
        <TwitterShareButton
          url={shareUrl}
          title={title}
        >
        <img className={`${socialStyles.socialIcon} ${'darkModeSocial'}`} src={twitterIcon} alt="share on twitter"/>
        </TwitterShareButton>
      </div>
      <div>
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body={shareUrl}
          >
          <img className={`${socialStyles.socialIcon} ${'darkModeSocial'}`} src={emailIcon} alt="email link"/>
          </EmailShareButton>
        </div>
      </div>
    </div>
  )
}


export default Social
