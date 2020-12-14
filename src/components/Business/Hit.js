import React from 'react'
import PropTypes from 'prop-types'
import { Highlight } from 'react-instantsearch-dom'

const Hit = ({ hit }) => (
  <div className="hit">
    <h4 className="hit-name">
      <span className="hit-airport-name">
        <Highlight attribute="name" hit={hit} />{' '}
        {!hit.category && <Highlight attribute="category" hit={hit} />}{' '}
      </span>
    </h4>
    <p>{hit.address}</p>
    <p><span style={{fontWeight:'900'}}>PH: </span>{hit.phone}</p>
    <p><a style={{fontSize:'15px'}} href={hit.website}>{hit.website}</a></p>
    <p style={{fontWeight:'900'}}>  <Highlight attribute="area" hit={hit} />
      <span> – &nbsp;
        {hit._rankingInfo &&
          hit._rankingInfo.matchedGeoLocation && (
            <span style={{color:'#8fc744'}}>
              {parseInt(
                hit._rankingInfo.matchedGeoLocation.distance / 1000,
                10
              )}
              km away{' '}
            </span>
          )}
      </span>
    </p>
    <h5><a style={{
      fontWeight:'900',
      fontSize: '16px',
      color: 'rgb(143, 199, 68)',
      border: '2px solid rgb(143, 199, 68)',
      padding: '5px 10px',
      marginTop: '10px',
      display: 'inline-block',
      cursor: 'pointer',
    }} href={`https://www.google.com/maps/dir//${hit.address}`}>GET DIRECTIONS</a></h5>

  </div>
)

Hit.propTypes = {
  hit: PropTypes.object.isRequired
}

export default Hit
