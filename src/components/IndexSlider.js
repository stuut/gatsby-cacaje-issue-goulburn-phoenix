import React from "react";
import Slider from "react-slick";
import Img from 'gatsby-image'
import "./slider.css";
import SectionHeading from './SectionHeading'
import { Link } from 'gatsby'
class IndexSlider extends React.Component {
  render() {
    var settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            arrows: true,

          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            arrows: true,

          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
          }
        }
      ]
    };
    return (
      <div className={'realestateSlider'} style={{backgroundColor:'#333'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', padding:'1px 30px 0px 30px'}}>
        <SectionHeading text={this.props.heading} textColour={'whiteText'}/>
          <Slider {...settings}>
            {this.props.slides.map(({ node }) => {
                  return (
                    <div key={node.id} className={'slickPadding'}>
                      <div style={{background:'#464646', height:'100%'}}key={node.id}>
                        <Link to={`/realestate/${node.slug}/`}>
                        {node.image &&
                        <Img fluid={node.image.fluid}/>
                        }
                        <div style={{padding:'5px 10px 10px 10px'}}>
                          <p style={{color:'#8fc744', fontSize:'.8rem'}}>{node.author.title}</p>
                          <h4 style={{fontSize:'1.3rem', fontweight:'200', margin: '5px 0px', color:'#ffffff'}}>{node.title}</h4>
                          <p style={{color:'#ffffff', fontSize:'.9rem'}}>{node.address}</p>
                          <h5 style={{color:'#8fc744'}}>{node.price}</h5>
                        </div>
                        </Link>
                      </div>
                    </div>
                  )
            })}
          </Slider>
        </div>
      </div>
    );
  }
}

export default IndexSlider
