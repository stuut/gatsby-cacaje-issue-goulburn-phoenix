import React from "react";
import Img from 'gatsby-image'

class ModuleAdvertisement extends React.Component {

  render() {
    console.log('ModuleAdvertisement', this.props)
    return (
      <div key={this.props.id} style={{maxWidth:'730px', margin:'0 auto'}}>
        <div className={'displayAdshome'}>
        {this.props.link ? (
          <a href={this.props.link}>
            <Img fluid={this.props.image.fluid} alt={this.props.title}/>
          </a>
          ):(
            <Img fluid={this.props.image.fluid} alt={this.props.title}/>
          )
        }
        </div>
      </div>
    );
  }
}

export default ModuleAdvertisement
