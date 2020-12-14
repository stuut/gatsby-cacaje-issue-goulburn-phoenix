import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Logo from '../../static/logo.jpg'
import Img from 'gatsby-image'


const Image= (props) => {
  const opacity = (props.opacity) ? Math.min(props.opacity, 1) : 0;

  return (
    <img  id="image" style={{ opacity }} src={Logo} />
  );
};


class MobileHeroImage extends React.Component {
  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = { imageOpacity: 1.5 };
    this.updateImageOpacity = this.updateImageOpacity.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateImageOpacity);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateImageOpacity);
  }

  updateImageOpacity() {
    const finishFade = .02;
    const scrolly = window.scrollY;
    const scrollCheck = (scrolly / 10) * 10;
    const scrollFinal = Math.min(10 / scrollCheck , 1);

    if (scrollFinal < finishFade) {
      if (this.state.opacity === 0) return;
      document.getElementById("image").style.opacity = "0";
      //this.setState({ imageOpacity: 0 });
      return;
    }



    const newScrollHeight = (scrolly / 10) * 10;
    const imageOpacity = Math.min(10 / newScrollHeight, 1);

    this.setState({ imageOpacity });
  }

  render() {
    return (
      <div>
        <Image opacity={ this.state.imageOpacity }/>

      </div>
    );
  }
}

export default MobileHeroImage
