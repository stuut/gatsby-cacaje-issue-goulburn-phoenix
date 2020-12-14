import React from 'react'
import { Link } from 'gatsby'
import connectFacebook from '../../static/connect-facebook.svg'
import connectInsta from '../../static/connect-insta.svg'
import connectYoutube from '../../static/connect-youtube.svg'
import connectEmail from '../../static/connect-email.svg'
import connectTwitter from '../../static/connect-twitter.svg'
import footerStyles from './footerStyles.module.css'
import config from '../utils/siteConfig'


const Footer = props => {
return (
  <div style={{background:'#333', padding:'10px'}}>
    <div style={{maxWidth:'1200px', margin:'0 auto'}}>
      <div className={footerStyles.footerWrap}>
        <div style={{textAlign:'center', padding:'10px'}}>
          <h4 style={{marginBottom:'15px'}}>CONTACT US</h4>
          <p style={{fontWeight:'900'}}>Editorial</p>
          <p><a style={{color:'#ffffff'}} href={config.editorIntPhone}>{`${'Phone '} ${config.editorPhone}`}</a></p>
          <p><a href={`mailto:${config.editorEmail}`}>{`${config.editorEmail}`}</a></p>
          <p style={{fontWeight:'900'}}>Sales</p>
          <p><a style={{color:'#ffffff'}} href={config.salesIntPhone}>{`${'Phone '} ${config.salesPhone}`}</a></p>
          <p><a href={`mailto:${config.salesEmail}`}>{`${config.salesEmail}`}</a></p>



        </div>
        <div className={footerStyles.contact} style={{textAlign:'center', padding:'10px'}} >
          <h4 style={{marginBottom:'15px'}}>SUBMIT AN ARTICLE</h4>
          <div style={{maxWidth:'250px', margin: '0 auto'}}>
          <p>We are always looking for new articles of interest to the local community.</p>
          <p>Please feel free to submit an article for possible inclusion in a future issue.</p>
          <p>To submit an article, <Link to={`/contact`}>click here to use our online article submission form.</Link></p>

          </div>
        </div>
        <div style={{textAlign:'center', padding:'10px'}} >
        <h4 style={{marginBottom:'15px'}} >FOLLOW US</h4>
          <div style={{display:'flex',  justifyContent: 'space-around', maxWidth: '210px', margin: '0 auto',}}>
          {config.facebookUrl &&
            <a href={config.facebookUrl}><img style={{maxWidth:'35px'}} src={connectFacebook} alt={`${config.siteTitleAlt}${' Facebook'}`}/></a>
          }
          {config.instagramUrl &&
            <a href={config.instagramUrl}><img style={{maxWidth:'35px'}} src={connectInsta} alt={`${config.siteTitleAlt}${' Instagram'}`}/></a>
          }
          {config.twitterUrl &&
            <a href={config.twitterUrl}><img style={{maxWidth:'35px'}} src={connectTwitter} alt={`${config.siteTitleAlt}${' Twitter'}`}/></a>
          }
          {config.youtubeUrl &&
          <a href={config.youtubeUrl}><img style={{maxWidth:'35px'}} src={connectYoutube} alt={`${config.siteTitleAlt}${' YouTube'}`}/></a>
          }
          <Link to="/subscribe/"><img style={{maxWidth:'35px'}} src={connectEmail} alt="Hilltops Phoenix Subscribe"/></Link>
          </div>
        </div>
      </div>
    </div>
    <div style={{borderTop: '1px solid #666', fontSize:'12px', textAlign:'center', paddingTop:'10px'}}>
      <Link to={`/about-us`} style={{color:'#ffffff'}}>About Us</Link>
      <Link to={`/journalistic-ethics-and-complaints-policy`} style={{marginLeft:'15px', color:'#ffffff'}}>Journalistic Ethics and Complaints Policy</Link>
      <Link to={`/conflict-resolution`} style={{marginLeft:'15px', color:'#ffffff'}}>Conflict Resolution</Link>
      <Link to={`/privacy-policy`}style={{marginLeft:'15px', color:'#ffffff'}}>Privacy Policy</Link>
      <a style={{marginLeft:'15px', color:'#ffffff'}} href={`${config.siteUrl}${'/sitemap.xml'}`}>Site Map</a>
      <a style={{marginLeft:'15px', color:'#ffffff'}} href={`${config.siteUrl}${'/rss.xml'}`}>RSS Feed</a>
    </div>
  </div>
  )
}

export default Footer
