import React from "react";
import Slider from "react-slick";
import Img from 'gatsby-image'
import "./slider.css";
import SectionHeading from './SectionHeading'
import { Link } from 'gatsby'
import { orderBy } from 'lodash'
import moment from 'moment'

class IndexSlider extends React.Component {


  render() {

    var postArray = [];
    var pageArray = [];
    var authorArray = [];
    var realEstateArray = [];

    this.props.posts.map((node) => {
      if (node.__typename === 'ContentfulCategory' || node.__typename === 'ContentfulTag'){
        if (node.post){
          node.post.map((node) => {
            return(postArray.push(node));
          })
        }else if (node.realestate){
          node.realestate.map((node) => {
            return(realEstateArray.push(node));
          })
        }
      }else if (node.__typename === 'ContentfulPost'){
        return postArray.push(node);
      }else if (node.__typename === 'ContentfulRealEstate'){
        return realEstateArray.push(node);
      }else if (node.__typename === 'ContentfulAuthor'){
        return authorArray.push(node);
      }else if (node.__typename === 'ContentfulPage'){
              return pageArray.push(node);
      }else{
        return null
      }
      return null
    })

    var finalArray = [];
    finalArray.push(postArray);
    finalArray.push(realEstateArray);
    finalArray.push(authorArray)
    finalArray.push(pageArray)
    finalArray = [].concat.apply([], finalArray);
    finalArray = finalArray.filter( (ele, index) => index === finalArray.findIndex( elem => elem.slug === ele.slug))
    this.props.postsToShow? finalArray = finalArray.slice(0, this.props.postsToShow) : finalArray = finalArray.slice(0, 25)

    finalArray = orderBy(
      finalArray,
      // eslint-disable-next-line
      [object => new moment(object.updatedAt, "YYYY-MM-DD")],
      ['desc']
    )

    if (this.props.coverStory || this.props.coverStory === true){
      var coverStory = true
      finalArray = finalArray.filter(function (node) {
          return node.coverStory !== coverStory
      });
    }



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
    }



    return (
      <div className={'realestateSlider'} style={{backgroundColor:'#333'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', padding:'1px 30px 0px 30px'}}>
        <SectionHeading text={this.props.title} textColour={'whiteText'}/>
        <Slider {...settings}>
        {finalArray.map((post, index) => {
            if (post.internal.type === 'ContentfulPost'){
              return(
                <div key={post.id} className={'slickPadding'}>
                  <div style={{background:'#464646', height:'100%'}}>
                    <Link to={`/${post.slug}/`}>
                      <Img fluid={post.image.fluid} alt={post.image.title}/>
                    </Link>
                      <div style={{padding:'5px 10px 10px 10px'}}>
                        {post.author &&
                        <Link to={`/author/${post.author.slug}/`}>
                        <p style={{color:'#8fc744', fontSize:'.8rem'}}>{post.author.title}</p>
                        </Link>
                        }
                      <Link to={`/${post.slug}/`}>
                        <h4 style={{fontSize:'1.3rem', fontweight:'200', margin: '5px 0px', color:'#ffffff'}}>{post.title}</h4>
                        <p style={{color:'#ffffff', fontSize:'.9rem'}}
                          dangerouslySetInnerHTML={{
                            __html: post.copy.childMarkdownRemark.excerpt,
                          }}
                        />
                      </Link>
                      </div>
                  </div>
                </div>
              )
            }else if (post.internal.type === 'ContentfulAuthor'){
              return(
                <div key={post.id} className={'slickPadding'}>
                  <div style={{background:'#464646', height:'100%'}}>
                    <Link to={`/author/${post.slug}/`}>
                      <Img fluid={post.image.fluid} alt={post.image.title}/>
                      <div style={{padding:'5px 10px 10px 10px'}}>
                        <h4 style={{fontSize:'1.3rem', fontweight:'200', margin: '5px 0px', color:'#ffffff'}}>{post.title}</h4>
                        <p style={{color:'#ffffff', fontSize:'.9rem'}}
                          dangerouslySetInnerHTML={{
                            __html: post.copy.childMarkdownRemark.excerpt,
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              )
            }else if (post.internal.type === 'ContentfulPage'){
              console.log('ContentfulPage', post)
              return(
                <div key={post.id} className={'slickPadding'}>
                  <div style={{background:'#464646', height:'100%'}}>
                    <Link to={`/${post.slug}/`}>
                      <Img fluid={post.metaImage.fluid} alt={post.metaImage.title}/>
                      <div style={{padding:'5px 10px 10px 10px'}}>
                        <h4 style={{fontSize:'1.3rem', fontweight:'200', margin: '5px 0px', color:'#ffffff'}}>{post.title}</h4>
                        {post.copy ? (
                        <>
                        <p style={{color:'#ffffff', fontSize:'.9rem'}}
                          dangerouslySetInnerHTML={{
                            __html: post.copy.childMarkdownRemark.excerpt,
                          }}
                        />
                        </>
                        ):(
                          <>
                          {post.metaDescription &&
                            <p style={{color:'#ffffff', fontSize:'.9rem'}}>
                            {post.metaDescription.internal.content}
                            </p>
                          }
                          </>
                        )
                        }
                      </div>
                    </Link>
                  </div>
                </div>
              )
            }else{
              return null
            }
        })}
        </Slider>
        </div>
      </div>
    );
  }
}

export default IndexSlider
