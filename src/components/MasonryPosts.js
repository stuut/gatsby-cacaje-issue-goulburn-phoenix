import React from "react";
import Card from '../components/card';
import DarkCard from '../components/DarkCard';
import Masonry from 'react-masonry-component';
import masonryPostsStyles from './masonryPosts.module.css'


if (typeof window !== `undefined`) {
  window.postsToShow = 25
}

class MasonryPosts extends React.Component {

  constructor(props) {
    super(props)
    let postsToShow = 25
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow
    }

    this.state = {
      postsToShow,

    }

  }

  componentWillUnmount() {
  window.cardsToShow = this.state.cardsToShow
  }


  render() {
  let totalPosts = this.props.posts.length

    return (
      <div style={{maxWidth:'1100px', margin:'0 auto', padding:'15px 10px'}}>
        <Masonry>
          {this.props.posts.slice(0, this.state.postsToShow).map((post, index) => {
            if (index % 2 === 0) {
            		return(
                  <Card key={post.id}
                    slug={post.slug}
                    title={post.title}
                    categories={post.categories}
                    date={post.publishDate}
                    image={post.image}
                    excerpt={post.copy}
                    columns={'col-3-masonry'}
                    />
                )
            	}else{
                    return(
                      <DarkCard key={post.id}
                        slug={post.slug}
                        title={post.title}
                        categories={post.categories}
                        date={post.publishDate}
                        image={post.image}
                        excerpt={post.copy}
                        columns={'col-3-masonry'}
                        />
                )
              }
          })}
          </Masonry>

              { totalPosts > 25 && (
              <div className={masonryPostsStyles.loadButton}
                tabIndex={0}
                role = "button"
                onKeyDown={() => {
                  this.setState({
                    postsToShow: this.state.postsToShow + 25,
                  })
                }}
                onClick={() => {
                  this.setState({
                    postsToShow: this.state.postsToShow + 25,
                  })
                }}
              >
                <p style={{
                  top:'50%',
                  left:'50%',
                  position:'absolute',
                  display:'block',
                  width:'100%',
                  transform:'translate(-50%, -50%)',
                  textAlign:'center',
                  fontSize:'1rem',
                  color:'#fff',
                  zIndex:'1'
                }}
                >Load More</p>
              </div>
            )}



      </div>
    );
  }
}

export default MasonryPosts
