import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Configure, Highlight, connectHits } from 'react-instantsearch-dom';
import {
  GoogleMapsLoader,
  GeoSearch,
  Marker,
  CustomMarker,
  Redo,
  Control,
} from 'react-instantsearch-dom-maps';
import { WrapWithHits } from './util';





const CustomHits = connectHits(({ hits, selectedHit, onHitOver }) => (
  <div className="hits">
    {hits.map(hit => {
      const classNames = [
        'hit',
        'hit--airbnb',
        selectedHit && selectedHit.objectID === hit.objectID
          ? 'hit--airbnb-active'
          : '',
      ];

      return (
        <div
          key={hit.objectID}
          className={classNames.join(' ').trim()}
          onMouseEnter={() => onHitOver(hit)}
          onMouseLeave={() => onHitOver(null)}
        >
          <div className="hit-content">
            <div>
              <Highlight attribute="name" hit={hit} />
              <span> - ${hit.name}</span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
));

class CustomHitsComponent extends Component {
  state = {
    selectedHit: null,
  };

  onHitOver = hit =>
    this.setState(() => ({
      selectedHit: hit,
    }));

  renderGeoHit = hit => {
    const { selectedHit } = this.state;

    const price = '30'

    const classNames = [
      'my-custom-marker',
      selectedHit && selectedHit.objectID === hit.objectID
        ? 'my-custom-marker--active'
        : '',
    ];

    return (
      <CustomMarker
        key={hit.objectID}
        hit={hit}
        anchor={{ x: 0, y: 5 }}
        onMouseEnter={() => this.onHitOver(hit)}
        onMouseLeave={() => this.onHitOver(null)}
      >
        <div className={classNames.join(' ').trim()}>
          <span>{hit.name}</span>
        </div>
      </CustomMarker>
    );
  };

  render() {
    const { selectedHit } = this.state;

    return (
      <WrapWithHits
        indexName="airbnb"
        linkedStoryGroup="GeoSearch"
        hitsElement={
          <CustomHits selectedHit={selectedHit} onHitOver={this.onHitOver} />
        }
      >
        <Configure aroundLatLngViaIP hitsPerPage={20} />

        <div>
          <GoogleMapsLoader apiKey="AIzaSyB_P6kPwsX4vaAVC4dgNus6yTIwWLtsXH4" >
            {google => (
              <GeoSearch google={google}>
                {({ hits }) => (
                  <Fragment>{hits.map(this.renderGeoHit)}</Fragment>
                )}
              </GeoSearch>
            )}
          </GoogleMapsLoader>
        </div>
      </WrapWithHits>
    );
  }
}

export default CustomHitsComponent
