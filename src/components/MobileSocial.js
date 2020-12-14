import React from 'react'
import mobileSocialStyles from './mobileSocial.module.css'
import shareIcon from '../../static/shareIcon.svg'
import facebookIcon from '../../static/facebookiconMobile.svg'
import twitterIcon from '../../static/twittericonMobile.svg'
import emailIcon from '../../static/emailiconMobile.svg'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share';

class MobileSocial extends React.Component {

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.state = {
      active: false
    };
  }

  handleClick() {
    if (!this.state.active) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
      this.setState(prevState => ({
         active: true,
      }));
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
      this.setState(prevState => ({
         active: false,
      }));
    }


  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    this.setState(prevState => ({
       active: false,
    }));
  }


  render() {
    const slug = this.props.slug;
    const shareUrl = this.props.shareUrl + '/' + slug;
    const title = this.props.title;

    return (
      <div ref={node => { this.node = node; }}>
      <div className={mobileSocialStyles.mobileSharePosition}>
        <div className={mobileSocialStyles.mobileShareClick}
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
          role = "button"
          tabIndex={0}
        >
          <img src={shareIcon} alt="share"/>
        </div>

          <div className={`${mobileSocialStyles.mobileShare} ${this.state.active ? `${mobileSocialStyles.active}` : 'notActive'}`} >
          <div>
            <FacebookShareButton
              url={shareUrl}
              quote={this.props.title}
            >
            <img className={mobileSocialStyles.socialIcon} src={facebookIcon} alt="facebook share"/>
            </FacebookShareButton>
          </div>
          <div>
            <TwitterShareButton
              url={shareUrl}
              title={title}
            >
            <img className={mobileSocialStyles.socialIcon} src={twitterIcon} alt="twitter share"/>
            </TwitterShareButton>
          </div>
          <div>
              <EmailShareButton
                url={shareUrl}
                subject={title}
                body={shareUrl}
              >
              <img className={mobileSocialStyles.socialIcon} src={emailIcon} alt="email share"/>
              </EmailShareButton>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MobileSocial
