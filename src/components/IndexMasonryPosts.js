import React from "react";
import Card from '../components/card';
import DarkCard from '../components/DarkCard';
import Masonry from 'react-masonry-component';
class IndexMasonryPosts extends React.Component {
  render() {

    return (
      <div style={{maxWidth:'1100px', margin:'0 auto', padding:'15px 10px 10px 10px'}}>
        <Masonry>
          {this.props.posts.map((post, index) => {
            if (index % 2 === 0) {
            		return(
                  <Card key={post.node.id}
                    slug={post.node.slug}
                    title={post.node.title}
                    category={post.node.category}
                    categories={post.node.categories}
                    date={post.node.publishDate}
                    image={post.node.heroImage}
                    excerpt={post.node.body}
                    columns={'col-3-masonry'}
                    />
                )
            	}else{
                    return(
                      <DarkCard key={post.node.id}
                        slug={post.node.slug}
                        title={post.node.title}
                        category={post.node.category}
                        categories={post.node.categories}
                        date={post.node.publishDate}
                        image={post.node.heroImage}
                        excerpt={post.node.body}
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

export default IndexMasonryPosts
