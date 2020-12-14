import React from "react";
import ModuleLightCard from '../components/ModuleLightCard';
import ModuleDarkCard from '../components/ModuleDarkCard';
import Masonry from 'react-masonry-component';
import { orderBy } from 'lodash'
import moment from 'moment'
import SectionHeading from '../components/SectionHeading'


class ModuleMasonryPosts extends React.Component {




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
    finalArray.push(pageArray);
    finalArray.push(realEstateArray);
    finalArray.push(authorArray)
    finalArray = [].concat.apply([], finalArray);
    finalArray = finalArray.filter( (ele, index) => index === finalArray.findIndex( elem => elem.slug === ele.slug))


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

    this.props.postsToShow? finalArray = finalArray.slice(0, this.props.postsToShow) : finalArray = finalArray.slice(0, 25)




    return (
      <div style={{maxWidth:'1100px', margin:'0 auto', padding:'15px 10px 10px 10px'}}>
      <SectionHeading text={this.props.title}/>
      <Masonry>
          {finalArray.map((post, index) => {
            //console.log('post.coverStory', post.coverStory)
            //console.log('post.title', post.title)
                var date
                if (post.publishDate){
                  date = moment(post.publishDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
                }else{
                  date = null;
                }
                var image
                var postType
                if (post.internal.type === 'ContentfulPost'){
                 image = post.image
                 postType = "Post"
                }else if (post.internal.type === 'ContentfulPage'){
                 if (post.image){
                    image = post.post.image
                 }
                 if (post.metaImage){
                    image = post.metaImage
                }
                  postType = "Page"
                }else {
                   image = post.image
                   postType = "Author"
                }
                if (index % 2 === 0) {
                    return(
                      <ModuleLightCard key={post.id ? post.id : index}
                        postType={postType}
                        slug={post.slug}
                        title={post.title}
                        categories={post.categories}
                        date={date}
                        image={image}
                        excerpt={post.copy? post.copy: post.metaDescription}
                        price={post.price? post.price: null}
                        address={post.address}
                        columns={'col-3-masonry'}
                        />
                    )
                  }else{
                        return(
                          <ModuleDarkCard key={post.id ? post.id : index}
                            postType={postType}
                            slug={post.slug}
                            title={post.title}
                            categories={post.categories}
                            date={date}
                            image={image}
                            excerpt={post.copy? post.copy: post.metaDescription}
                            price={post.price? post.price: null}
                            address={post.address}
                            columns={'col-3-masonry'}
                            />
                    )
                  }
            })}
            </Masonry>

      </div>
    );
  }
}

export default ModuleMasonryPosts
