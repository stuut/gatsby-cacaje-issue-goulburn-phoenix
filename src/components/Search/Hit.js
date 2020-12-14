import React from "react";
import Link from "gatsby-link";
import { Highlight } from 'react-instantsearch-dom';




const Hit = props => {
  const {hit} = props;

var mydate = new Date(hit.publishDate);
    var month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
    var str = month + ' ' + mydate.getFullYear();

  return (
    <div className={'darkModeLightBackground'}>
        <Link to={`/${hit.slug}/`}>
        {hit.image &&
        <img src={hit.image.resize.src} alt={hit.image.title}/>
        }

        <div style={{padding: '0.2em 0.5em 1em', }}>

        {hit.categories.map((category, index) => {
          return(
            <div className={'category-hit'}>
              {category.title}
            </div>
          )
        })

        }

        <p style={{fontSize:'.7rem'}}>{str}</p>
        <h4><span className="hit-name">
          <Highlight attribute="title" hit={hit} />
          </span></h4>
          <p className={'search-excerpt'}>
            <Highlight attribute="copy.childMarkdownRemark.excerpt" hit={hit} />
          </p>



        </div>
      </Link>
</div>
  );
};

export default Hit
